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

// Clearing the filters also sends the reader back to the first page, and both
// have to happen in a single write: react-router hands a functional updater
// the params as of the current render, so two calls in one handler each issue
// their own navigation and the second overwrites the first.

export function useFilters(pagePrefix?: string): UseFiltersResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const genre = searchParams.get("genre") || "";
  const country = searchParams.get("country") || "";
  const year = searchParams.get("year") || "";
  const ageRating = searchParams.get("ageRating") || "";

  const setAllFilters = useCallback(
    (newFilters: Filters) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        for (const key of filterOptions) {
          const value = newFilters[key];
          if (value) next.set(key, value);
          else next.delete(key);
        }
        return next;
      });
    },
    [setSearchParams],
  );

  const resetFilters = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      for (const key of filterOptions) next.delete(key);
      if (pagePrefix) next.delete(pagePrefix + "page");
      return next;
    });
    return emptyFilters;
  }, [pagePrefix, setSearchParams]);

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
    (media: MediaType) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("media", media);
        next.delete("genre");
        next.delete("ageRating");
        next.delete("homepage");
        return next;
      });
    },
    [setSearchParams],
  );

  return [mediaType, setMediaType];
}
