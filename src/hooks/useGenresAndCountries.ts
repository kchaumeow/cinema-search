import {
  useLazyGetCountriesQuery,
  useLazyGetGenresQuery,
} from "../features/api/cinemasSlice";
import { useEffect } from "react";
import { MediaType } from "../types";

// Genre ids differ between films and series, so the list is refetched when the
// media type changes. Both lists are cached for a day.
export function useGenresAndCountries(mediaType: MediaType) {
  const [triggerGenres, resultGenres] = useLazyGetGenresQuery();
  const [triggerCountries, resultCountries] = useLazyGetCountriesQuery();
  useEffect(() => {
    const request = triggerGenres(mediaType);
    return () => request.abort();
  }, [mediaType]);
  useEffect(() => {
    const request = triggerCountries();
    return () => request.abort();
  }, []);
  return { resultGenres, resultCountries };
}
