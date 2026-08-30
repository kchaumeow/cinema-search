import CinemaList from "../components/CinemaList";
import { Flex, Heading } from "@chakra-ui/react";
import { usePagination } from "../hooks/usePagination";
import { useFilters } from "../hooks/useFilters";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import SearchModal from "../components/SearchModal";
import { useGenresAndCountries } from "../hooks/useGenresAndCountries";
import { useLazyGetAllCinemasQuery } from "../features/api/cinemasSlice";
import { useEffect, useRef } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/query";

export default function Home() {
  const { page, limit, setPage, setLimit } = usePagination("home");
  const { filters } = useFilters();
  const currReq = useRef<QueryActionCreatorResult<any> | null>(null);
  const [
    trigger,
    { data: cinemas, isLoading, isError, isFetching, error: cinemaError },
  ] = useLazyGetAllCinemasQuery();

  const searchRandomCinema = () => {
    const request = trigger({
      page,
      selectFields: ["id", "name", "rating", "poster"],
      limit,
      filters,
    });
    currReq.current = request;
  };
  useEffect(() => {
    searchRandomCinema();
    return () => currReq.current?.abort();
    // Filters are applied by the search button, so they stay out of the deps.
  }, [page, limit]);
  const { resultGenres, resultCountries } = useGenresAndCountries();
  if (isError) return <Error error={cinemaError} />;
  if (
    resultGenres.isLoading ||
    resultCountries.isLoading ||
    !cinemas ||
    isFetching ||
    isLoading
  )
    return <Loader />;
  return (
    <Flex direction="column" gap={8}>
      <Flex
        align={{ base: "stretch", md: "center" }}
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        <Heading size="lg">Catalogue</Heading>
        <SearchModal />
      </Flex>
      {resultGenres.isSuccess && resultCountries.isSuccess && (
        <Filters
          genres={resultGenres.data}
          countries={resultCountries.data}
          onClickSearch={searchRandomCinema}
        />
      )}
      <CinemaList cinemas={cinemas.docs} />
      {cinemas.docs.length > 0 && (
        <Pagination
          page={+page}
          maxPage={cinemas.pages}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      )}
    </Flex>
  );
}
