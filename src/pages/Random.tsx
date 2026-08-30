import { Box, Flex, Heading } from "@chakra-ui/react";
import Filters from "../components/Filters";
import { useFilters } from "../hooks/useFilters";
import { useEffect, useRef } from "react";
import { useGenresAndCountries } from "../hooks/useGenresAndCountries";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { useLazyGetRandomCinemaQuery } from "../features/api/cinemasSlice";
import CinemaCard from "../components/CinemaCard";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/query";

export default function Random() {
  const { filters } = useFilters();
  const currReq = useRef<QueryActionCreatorResult<any> | null>(null);
  const { resultGenres, resultCountries } = useGenresAndCountries();
  const [
    trigger,
    { data: cinema, isLoading, isError, isFetching, error: cinemaError },
  ] = useLazyGetRandomCinemaQuery();

  const searchRandomCinema = () => {
    const request = trigger(filters);
    currReq.current = request;
  };

  useEffect(() => {
    searchRandomCinema();
    return () => currReq.current?.abort();
  }, []);

  if (isError) return <Error error={cinemaError} />;
  if (
    resultGenres.isLoading ||
    resultCountries.isLoading ||
    !cinema ||
    isFetching ||
    isLoading
  )
    return <Loader />;
  return (
    <Flex direction="column" gap={8}>
      <Heading size="lg">Random title</Heading>
      {resultGenres.isSuccess && resultCountries.isSuccess && (
        <Filters
          genres={resultGenres.data}
          countries={resultCountries.data}
          onClickSearch={searchRandomCinema}
        />
      )}
      <Box w="220px">
        <CinemaCard cinema={cinema} />
      </Box>
    </Flex>
  );
}
