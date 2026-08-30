import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export type UsePaginationResult = {
  page: number;
  setPage: (page: number) => void;
};

// TMDB serves a fixed 20 results per page, so there is no page size to pick.
export function usePagination(prefix: string): UsePaginationResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const page: number = parseInt(searchParams.get(prefix + "page") || "1");
  const setPage = useCallback(
    (page: number) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(prefix + "page", page.toString());
      setSearchParams(newSearchParams);
    },
    [setSearchParams],
  );

  return { page, setPage };
}
