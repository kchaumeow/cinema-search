import { Box, Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import Filters from "../components/Filters";
import { useFilters, useMediaType } from "../hooks/useFilters";
import { useEffect, useRef } from "react";
import { useGenresAndCountries } from "../hooks/useGenresAndCountries";
import Error from "../components/Error";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { useLazyGetRandomCinemaQuery } from "../features/api/cinemasSlice";
import CinemaCard from "../components/CinemaCard";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/query";

export default function Random() {
  const { filters } = useFilters();
  const [mediaType, setMediaType] = useMediaType();
  const currReq = useRef<QueryActionCreatorResult<any> | null>(null);
  const { resultGenres, resultCountries } = useGenresAndCountries(mediaType);
  const [
    trigger,
    { data: cinema, isLoading, isError, isFetching, error: cinemaError },
  ] = useLazyGetRandomCinemaQuery();

  const searchRandomCinema = () => {
    currReq.current = trigger({ mediaType, filters });
  };

  useEffect(() => {
    searchRandomCinema();
    return () => currReq.current?.abort();
  }, [mediaType]);

  return (
    <Flex direction="column" gap={8}>
      <Flex align="center" gap={4}>
        <Heading size="lg">Random title</Heading>
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

      {resultGenres.isSuccess && resultCountries.isSuccess && (
        <Filters
          genres={resultGenres.data}
          countries={resultCountries.data}
          mediaType={mediaType}
          onClickSearch={searchRandomCinema}
        />
      )}

      {isError ? (
        <Error error={cinemaError} />
      ) : isLoading || isFetching ? (
        <Loader />
      ) : !cinema ? (
        <EmptyState>Nothing matched those filters</EmptyState>
      ) : (
        <Box w="220px">
          <CinemaCard cinema={cinema} />
        </Box>
      )}
    </Flex>
  );
}
