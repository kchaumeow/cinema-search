import { AspectRatio, Box, Grid, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SimilarMovie } from "../types";
import EmptyState from "./EmptyState";

export default function CinemaSlider({ cinemas }: { cinemas: SimilarMovie[] }) {
  if (!cinemas.length) return <EmptyState>No similar titles</EmptyState>;
  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(160px, 1fr))"
      gap={4}
      w="100%"
    >
      {cinemas.map((cinema) => (
        <Link key={cinema.id} to={`/cinemas/${cinema.id}`}>
          <Box
            bg="ink.surface"
            borderWidth="1px"
            borderColor="ink.border"
            borderRadius="xl"
            overflow="hidden"
            transition="border-color .2s ease, transform .2s ease"
            _hover={{
              borderColor: "ink.borderHover",
              transform: "translateY(-4px)",
            }}
          >
            <AspectRatio ratio={2 / 3}>
              <Image
                src={cinema.poster?.url ?? undefined}
                alt={cinema.name}
                objectFit="cover"
                bg="ink.raised"
              />
            </AspectRatio>
            <Text fontSize="sm" fontWeight={500} noOfLines={1} px={3} py={2.5}>
              {cinema.name}
            </Text>
          </Box>
        </Link>
      ))}
    </Grid>
  );
}
