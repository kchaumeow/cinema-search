import { Grid } from "@chakra-ui/react";
import CinemaCard from "./CinemaCard";
import EmptyState from "./EmptyState";
import { Cinema } from "../types";

export default function CinemaList({ cinemas }: { cinemas: Cinema[] }) {
  if (!cinemas.length) return <EmptyState>Nothing matched your search</EmptyState>;
  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(180px, 1fr))"
      gap={{ base: 4, md: 6 }}
      w="100%"
    >
      {cinemas.map((cinema) => (
        <CinemaCard key={cinema.id} cinema={cinema} />
      ))}
    </Grid>
  );
}
