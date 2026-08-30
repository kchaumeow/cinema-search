import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Cinema } from "../types";

export default function CinemaCard({ cinema }: { cinema: Cinema }) {
  return (
    <Link to={`/cinemas/${cinema.id}`}>
      <Card
        bg="#141414"
        maxW="sm"
        transition="transform .3s linear"
        _hover={{
          transform: "scale(1.1)",
        }}
        h="650px"
      >
        <CardBody h={573} w={384}>
          <Image
            src={cinema.poster?.url ?? undefined}
            alt={cinema.name}
            borderRadius="lg"
            objectFit="contain"
            color="orange.500"
          />
        </CardBody>
        <Divider borderColor={"orange"} />
        <CardFooter display="flex" justifyContent="space-between">
          <Text color="white" as="b" fontSize="2xl" noOfLines={1} p={2}>
            {cinema.name}
          </Text>
          <Text color="orange.400" as="b" fontSize="2xl" p={2}>
            {cinema.rating?.kp ? cinema.rating.kp.toFixed(1) : "—"}
          </Text>
        </CardFooter>
      </Card>
    </Link>
  );
}
