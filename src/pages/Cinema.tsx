import { useParams } from "react-router-dom";
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Posters from "../components/Posters";
import ActorsList from "../components/ActorsList";
import CinemaSlider from "../components/CinemaSlider";
import ReviewList from "../components/ReviewsList";
import SeasonsList from "../components/SeasonsList";
import { useLazyGetCinemaByIdQuery } from "../features/api/cinemasSlice";
import { useEffect } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";

const series = ["cartoon", "tv-series", "anime", "animated-series"];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column" gap={5} align="center" w="100%">
      <Heading size="md" alignSelf="flex-start">
        {title}
      </Heading>
      {children}
    </Flex>
  );
}

export default function Cinema() {
  const { id } = useParams();
  const [
    trigger,
    {
      data: cinema,
      isLoading,
      isError,
      isFetching,
      isSuccess,
      error: cinemaError,
    },
    lastPromiseInfo,
  ] = useLazyGetCinemaByIdQuery();
  useEffect(() => {
    const request = trigger(id!);
    return () => request.abort();
  }, []);

  if (isError) return <Error error={cinemaError} />;

  if (isLoading || isFetching || cinemaError || !cinema) return <Loader />;

  return (
    <Flex direction="column" gap={16}>
      <Flex direction={{ base: "column", md: "row" }} gap={10}>
        <Box w={{ base: "100%", md: "260px" }} flexShrink={0}>
          <AspectRatio ratio={2 / 3}>
            <Image
              src={cinema.poster?.url ?? undefined}
              alt={cinema.name}
              objectFit="cover"
              bg="ink.raised"
              borderRadius="xl"
            />
          </AspectRatio>
        </Box>
        <Stack spacing={4} pt={2}>
          {cinema.logo?.url ? (
            <Image
              src={cinema.logo.url}
              alt={cinema.name}
              maxW="280px"
              h="80px"
              objectFit="contain"
              objectPosition="left"
            />
          ) : (
            <Heading size="xl">{cinema.name}</Heading>
          )}
          <Flex gap={2} align="baseline" fontSize="sm">
            <Text color="ink.muted">KP</Text>
            <Text color="brand.300" fontWeight={600} fontSize="md">
              {cinema.rating?.kp ? cinema.rating.kp.toFixed(1) : "—"}
            </Text>
          </Flex>
          <Text color="ink.text" fontSize="sm" lineHeight="tall" maxW="65ch">
            {cinema.description}
          </Text>
        </Stack>
      </Flex>

      <Section title="Posters">
        <Posters id={cinema.id.toString()} />
      </Section>

      <Section title="Cast">
        <ActorsList actors={cinema.persons} />
      </Section>

      <Section title="Similar titles">
        <CinemaSlider cinemas={cinema.similarMovies} />
      </Section>

      <Section title="Reviews">
        <ReviewList id={id!} />
      </Section>

      {series.includes(cinema.type) && (
        <Section title="Seasons and episodes">
          <SeasonsList movieId={id!} />
        </Section>
      )}
    </Flex>
  );
}
