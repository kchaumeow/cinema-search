import { useLazyGetCinemaPostersByIdQuery } from "../features/api/cinemasSlice";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Box, Image } from "@chakra-ui/react";
import "@splidejs/react-splide/css";
import { useEffect } from "react";
import EmptyState from "./EmptyState";
import Loader from "./Loader";

type CinemaPoster = {
  movieId: number;
  type: string;
  language: string;
  url: string;
  previewUrl: string;
  height: number;
  width: number;
  updatedAt: string;
  createdAt: string;
};
export default function Posters({ id }: { id: string }) {
  const [
    trigger,
    {
      data: posters,
      isLoading,
      isError,
      isFetching,
      isSuccess,
      error: cinemaError,
    },
    lastPromiseInfo,
  ] = useLazyGetCinemaPostersByIdQuery();
  useEffect(() => {
    const request = trigger(id);
    return () => request.abort();
  }, []);

  if (isLoading || isFetching || !posters) return <Loader />;

  if (!posters.docs.length) return <EmptyState>No posters available</EmptyState>;

  return (
    <Box w="100%" maxW="560px">
      <Splide
        aria-label="Posters"
        options={{ perPage: 1, rewind: true, gap: "1rem" }}
      >
        {posters.docs.map((poster: CinemaPoster) => (
          <SplideSlide key={poster.url}>
            <Image
              src={poster.url}
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
