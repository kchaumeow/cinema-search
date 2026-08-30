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
import CinemaList from "../components/CinemaList";
import ReviewList from "../components/ReviewsList";
import Seasons from "../components/Seasons";
import { useLazyGetCinemaByIdQuery } from "../features/api/cinemasSlice";
import { useEffect } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import NotFound from "./NotFound";
import { MediaType } from "../types";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column" gap={5} align="flex-start" w="100%">
      <Heading size="md">{title}</Heading>
      {children}
    </Flex>
  );
}

export default function Cinema() {
  const { id, mediaType } = useParams();
  const [trigger, { data: cinema, isLoading, isError, isFetching, error }] =
    useLazyGetCinemaByIdQuery();

  const isMediaType = mediaType === "movie" || mediaType === "tv";

  useEffect(() => {
    if (!isMediaType) return;
    const request = trigger({ mediaType: mediaType as MediaType, id: id! });
    return () => request.abort();
  }, [mediaType, id]);

  if (!isMediaType) return <NotFound />;

  if (isError) return <Error error={error} />;

  if (isLoading || isFetching || !cinema) return <Loader />;

  return (
    <Flex direction="column" gap={16}>
      <Flex direction={{ base: "column", md: "row" }} gap={10}>
        <Box w={{ base: "100%", md: "260px" }} flexShrink={0}>
          <AspectRatio ratio={2 / 3}>
            <Image
              src={cinema.posterUrl ?? undefined}
              alt={cinema.name}
              objectFit="cover"
              bg="ink.raised"
              borderRadius="xl"
            />
          </AspectRatio>
        </Box>
        <Stack spacing={4} pt={2}>
          <Heading size="xl">{cinema.name}</Heading>
          <Flex gap={3} align="baseline" fontSize="sm" flexWrap="wrap">
            <Text color="brand.300" fontWeight={600} fontSize="md">
              {cinema.rating ? cinema.rating.toFixed(1) : "—"}
            </Text>
            {cinema.year && <Text color="ink.muted">{cinema.year}</Text>}
            {cinema.genres.length > 0 && (
              <Text color="ink.muted">{cinema.genres.join(", ")}</Text>
            )}
          </Flex>
          <Text color="ink.text" fontSize="sm" lineHeight="tall" maxW="65ch">
            {cinema.overview}
          </Text>
        </Stack>
      </Flex>

      <Section title="Posters">
        <Posters posters={cinema.posters} />
      </Section>

      <Section title="Cast">
        <ActorsList actors={cinema.cast} />
      </Section>

      <Section title="Similar titles">
        <CinemaList cinemas={cinema.similar} empty="No similar titles" />
      </Section>

      <Section title="Reviews">
        <ReviewList id={id!} mediaType={cinema.mediaType} />
      </Section>

      {cinema.mediaType === "tv" && (
        <Section title="Seasons and episodes">
          {/* Keyed so the selected season resets when moving to another series. */}
          <Seasons key={id} id={id!} seasons={cinema.seasons} />
        </Section>
      )}
    </Flex>
  );
}
