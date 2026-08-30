import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Box, Image } from "@chakra-ui/react";
import "@splidejs/react-splide/css";
import EmptyState from "./EmptyState";

// Posters arrive with the title details, so this is presentational only.
export default function Posters({ posters }: { posters: string[] }) {
  if (!posters.length) return <EmptyState>No posters available</EmptyState>;

  return (
    <Box w="100%" maxW="560px">
      <Splide
        aria-label="Posters"
        options={{ perPage: 1, rewind: true, gap: "1rem" }}
      >
        {posters.map((poster) => (
          <SplideSlide key={poster}>
            <Image
              src={poster}
              alt="Poster"
              w="100%"
              h="360px"
              objectFit="contain"
              borderRadius="lg"
            />
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
}
