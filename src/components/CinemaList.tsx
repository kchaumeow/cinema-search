import { Grid } from "@chakra-ui/react";
import CinemaCard from "./CinemaCard";
import EmptyState from "./EmptyState";
import { Cinema } from "../types";

type CinemaListProps = {
  cinemas: Cinema[];
  empty?: string;
};

export default function CinemaList({
  cinemas,
  empty = "Nothing matched your search",
}: CinemaListProps) {
  if (!cinemas.length) return <EmptyState>{empty}</EmptyState>;
  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(180px, 1fr))"
      gap={{ base: 4, md: 6 }}
      w="100%"
    >
      {cinemas.map((cinema) => (
        <CinemaCard key={`${cinema.mediaType}-${cinema.id}`} cinema={cinema} />
      ))}
    </Grid>
  );
}
