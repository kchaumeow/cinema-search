import { Season } from "../types";
import { useState } from "react";
import { Flex, Select, Text } from "@chakra-ui/react";
import EpisodesTable from "./EpisodesTable";

export default function Seasons({ list }: { list: Season[] }) {
  const [season, setSeason] = useState<number>(list[0].number);
  return (
    <Flex direction="column" align="center" gap={5} w="100%">
      <Flex gap={3} align="center">
        <Text color="ink.muted" fontSize="sm">
          Season
        </Text>
        <Select
          size="sm"
          w="20"
          borderRadius="lg"
          value={season}
          onChange={(e) => setSeason(+e.target.value)}
        >
          {list.map((season) => (
            <option key={season.number} value={season.number}>
              {season.number}
            </option>
          ))}
        </Select>
      </Flex>

      <EpisodesTable
        episodes={list.find((obj) => obj.number === season)!.episodes}
      />
    </Flex>
  );
}
