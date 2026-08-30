import { SeasonSummary } from "../types";
import { useEffect, useState } from "react";
import { Flex, Select, Text } from "@chakra-ui/react";
import EpisodesTable from "./EpisodesTable";
import Error from "./Error";
import EmptyState from "./EmptyState";
import Loader from "./Loader";
import { useLazyGetSeasonQuery } from "../features/api/cinemasSlice";

type SeasonsProps = {
  id: string;
  seasons: SeasonSummary[];
};

export default function Seasons({ id, seasons }: SeasonsProps) {
  const [season, setSeason] = useState(seasons[0]?.seasonNumber ?? 1);
  const [trigger, { data: episodes, isLoading, isFetching, isError, error }] =
    useLazyGetSeasonQuery();

  useEffect(() => {
    const request = trigger({ id, seasonNumber: season });
    return () => request.abort();
  }, [id, season]);

  if (!seasons.length) return <EmptyState>No seasons found</EmptyState>;

  return (
    <Flex direction="column" align="center" gap={5} w="100%">
      <Flex gap={3} align="center">
        <Text color="ink.muted" fontSize="sm">
          Season
        </Text>
        <Select
          size="sm"
          w="44"
          borderRadius="lg"
          value={season}
          onChange={(e) => setSeason(+e.target.value)}
        >
          {seasons.map((item) => (
            <option key={item.seasonNumber} value={item.seasonNumber}>
              {item.name}
            </option>
          ))}
        </Select>
      </Flex>

      {isError ? (
        <Error error={error} />
      ) : isLoading || isFetching || !episodes ? (
        <Loader />
      ) : (
        <EpisodesTable episodes={episodes} />
      )}
    </Flex>
  );
}
