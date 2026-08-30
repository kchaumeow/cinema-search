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
  // Updates are functional so that several of them in one handler compose
  // instead of overwriting each other with a stale copy of the params.
  const setPage = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set(prefix + "page", page.toString());
        return next;
      });
    },
    [prefix, setSearchParams],
  );

  return { page, setPage };
}
