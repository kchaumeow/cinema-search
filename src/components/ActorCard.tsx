import { AspectRatio, Box, Image, Text } from "@chakra-ui/react";
import { Person } from "../types";

export default function ActorCard({ actor }: { actor: Person }) {
  return (
    <Box
      w="160px"
      bg="ink.surface"
      borderWidth="1px"
      borderColor="ink.border"
      borderRadius="xl"
      overflow="hidden"
    >
      <AspectRatio ratio={3 / 4}>
        <Image
          src={actor.photoUrl ?? undefined}
          alt={actor.name}
          objectFit="cover"
          bg="ink.raised"
        />
      </AspectRatio>
      <Box px={3} py={2.5}>
        <Text fontSize="sm" fontWeight={500} noOfLines={1}>
          {actor.name}
        </Text>
        <Text fontSize="xs" color="ink.muted" noOfLines={1}>
          {actor.character || "—"}
        </Text>
      </Box>
    </Box>
  );
}
