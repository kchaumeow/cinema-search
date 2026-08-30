import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import { SimilarMovie } from "../types";

export default function CinemaSlider({ cinemas }: { cinemas: SimilarMovie[] }) {
  if (!cinemas.length)
    return (
      <Heading color="orange.500" mt={200}>
        Нет похожих фильмов/сериалов
      </Heading>
    );
  return (
    <>
      <Heading color="orange.500" mt={20} pb={10}>
        Похожие фильмы
      </Heading>
      <Splide
        aria-label="My Favorite Images"
        options={{
          perPage: 1,
          rewind: true,
          width: 400,
          gap: "3rem",
        }}
      >
        {cinemas.map((cinema) => (
          <SplideSlide key={cinema.id}>
            <Link to={`/cinemas/${cinema.id}`}>
              <Card bg="#141414" maxW="sm" h={700}>
                <CardBody>
                  <Image
                    src={cinema.poster?.url ?? undefined}
                    alt={cinema.name}
                    borderRadius="lg"
                    objectFit="contain"
                  />
                </CardBody>
                <Divider borderColor={"orange"} />
                <CardFooter>
                  <Text color="white" as="b" fontSize="2xl" noOfLines={1} p={2}>
                    {cinema.name}
                  </Text>
                </CardFooter>
              </Card>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
}
