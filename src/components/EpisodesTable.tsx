import { Episode } from "../types";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export default function EpisodesTable({ episodes }: { episodes: Episode[] }) {
  return (
    <Box
      w="100%"
      maxW="800px"
      bg="ink.surface"
      borderWidth="1px"
      borderColor="ink.border"
      borderRadius="xl"
      overflow="hidden"
    >
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th w="16">No.</Th>
              <Th>Title</Th>
              <Th w="32">Air date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {episodes.map((episode) => (
              <Tr key={episode.number}>
                <Td color="ink.muted">{episode.number}</Td>
                <Td whiteSpace="normal">
                  <Text fontWeight={500}>{episode.name}</Text>
                  {episode.overview && (
                    <Text color="ink.muted" fontSize="xs" noOfLines={2}>
                      {episode.overview}
                    </Text>
                  )}
                </Td>
                <Td color="ink.muted">
                  {episode.airDate
                    ? new Date(episode.airDate).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
