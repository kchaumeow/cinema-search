import { Grid } from "@chakra-ui/react";
import CinemaCard from "./CinemaCard";
import EmptyState from "./EmptyState";
import { Cinema } from "../types";

type CinemaListProps = {
  cinemas: Cinema[];
  empty?: string;
};

// TMDB pages are always 20 items, so the column count is kept to a divisor of
// 20 — anything else leaves the last row ragged.
const columns = {
  base: "repeat(2, 1fr)",
  md: "repeat(4, 1fr)",
  xl: "repeat(5, 1fr)",
};

export default function CinemaList({
  cinemas,
  empty = "Nothing matched your search",
}: CinemaListProps) {
  if (!cinemas.length) return <EmptyState>{empty}</EmptyState>;
  return (
    <Grid templateColumns={columns} gap={{ base: 4, md: 6 }} w="100%">
      {cinemas.map((cinema) => (
        <CinemaCard key={`${cinema.mediaType}-${cinema.id}`} cinema={cinema} />
      ))}
    </Grid>
  );
}
