import { Person } from "../types";
import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import ActorCard from "./ActorCard";
import EmptyState from "./EmptyState";

const PER_PAGE = 5;

export default function ActorsList({ actors }: { actors: Person[] }) {
  const [currButton, setButton] = useState(1);

  if (!actors.length) return <EmptyState>No cast information</EmptyState>;

  const buttons = Array.from(
    { length: Math.ceil(actors.length / PER_PAGE) },
    (_, i) => i + 1,
  );

  return (
    <Flex direction="column" gap={5} align="center">
      <Flex gap={4} flexWrap="wrap" justify="center">
        {actors
          .slice((currButton - 1) * PER_PAGE, currButton * PER_PAGE)
          .map((actor) => (
            <ActorCard key={actor.id} actor={actor} />
          ))}
      </Flex>
      <Flex gap={2} flexWrap="wrap" justify="center">
        {buttons.map((button) => (
          <Button
            key={button}
            size="sm"
            minW={9}
            variant={currButton === button ? "solid" : "outline"}
            isDisabled={currButton === button}
            onClick={() => setButton(button)}
          >
            {button}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}
