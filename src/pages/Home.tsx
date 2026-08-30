import CinemaList from "../components/CinemaList";
import { Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import { usePagination } from "../hooks/usePagination";
import { useFilters, useMediaType } from "../hooks/useFilters";
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
  const { page, setPage } = usePagination("home");
  const { filters } = useFilters();
  const [mediaType, setMediaType] = useMediaType();
  const currReq = useRef<QueryActionCreatorResult<any> | null>(null);
  const [
    trigger,
    { data: cinemas, isLoading, isError, isFetching, error: cinemaError },
  ] = useLazyGetAllCinemasQuery();

  const search = (override?: typeof filters) => {
    currReq.current = trigger({ mediaType, page, filters: override ?? filters });
  };

  useEffect(() => {
    search();
    return () => currReq.current?.abort();
    // Filters are applied by the search button, so they stay out of the deps.
  }, [mediaType, page]);

  const { resultGenres, resultCountries } = useGenresAndCountries(mediaType);

  return (
    <Flex direction="column" gap={8}>
      <Flex
        align={{ base: "stretch", md: "center" }}
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        <Flex align="center" gap={4}>
          <Heading size="lg">Catalogue</Heading>
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button
              onClick={() => setMediaType("movie")}
              variant={mediaType === "movie" ? "solid" : "outline"}
            >
              Movies
            </Button>
            <Button
              onClick={() => setMediaType("tv")}
              variant={mediaType === "tv" ? "solid" : "outline"}
            >
              TV
            </Button>
          </ButtonGroup>
        </Flex>
        <SearchModal />
      </Flex>

      {resultGenres.isSuccess && resultCountries.isSuccess && (
        <Filters
          genres={resultGenres.data}
          countries={resultCountries.data}
          mediaType={mediaType}
          onClickSearch={search}
        />
      )}

      {isError ? (
        <Error error={cinemaError} />
      ) : isLoading || isFetching || !cinemas ? (
        <Loader />
      ) : (
        <>
          <CinemaList cinemas={cinemas.items} />
          {cinemas.items.length > 0 && (
            <Pagination
              page={page}
              maxPage={cinemas.totalPages}
              setPage={setPage}
            />
          )}
        </>
      )}
    </Flex>
  );
}
