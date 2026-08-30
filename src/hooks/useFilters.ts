import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { MediaType } from "../types";

const filterOptions = ["genre", "country", "year", "ageRating"] as const;
type FilterOption = (typeof filterOptions)[number];
export type Filters = Record<FilterOption, string>;

const emptyFilters: Filters = {
  genre: "",
  country: "",
  year: "",
  ageRating: "",
};

export type UseFiltersResult = {
  filters: Filters;
  setAllFilters: (newFilters: Filters) => void;
  // Returns the cleared filters: the caller needs them to re-run the search
  // straight away, since its own `filters` still holds the pre-reset values
  // until the search params land and the component re-renders.
  resetFilters: () => Filters;
};

export function useFilters(): UseFiltersResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const genre = searchParams.get("genre") || "";
  const country = searchParams.get("country") || "";
  const year = searchParams.get("year") || "";
  const ageRating = searchParams.get("ageRating") || "";

  const setAllFilters = useCallback(
    (newFilters: Filters) => {
      const newSearchParams = new URLSearchParams(searchParams);

      for (const key of filterOptions) {
        const value = newFilters[key];
        if (value) newSearchParams.set(key, value);
        else newSearchParams.delete(key);
      }

      setSearchParams(newSearchParams);
    },
    [setSearchParams],
  );

  const resetFilters = useCallback(() => {
    setAllFilters(emptyFilters);
    return emptyFilters;
  }, [setAllFilters]);

  return {
    filters: { genre, country, year, ageRating },
    setAllFilters,
    resetFilters,
  };
}

// Genre ids and certifications are not shared between films and series, so
// switching media type clears the filters that would no longer resolve.
export function useMediaType(): [MediaType, (next: MediaType) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const mediaType: MediaType =
    searchParams.get("media") === "tv" ? "tv" : "movie";

  const setMediaType = useCallback(
    (next: MediaType) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("media", next);
      newSearchParams.delete("genre");
      newSearchParams.delete("ageRating");
      newSearchParams.delete("homepage");
      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams],
  );

  return [mediaType, setMediaType];
}
