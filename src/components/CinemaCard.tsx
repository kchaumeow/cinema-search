import { AspectRatio, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Cinema } from "../types";

export default function CinemaCard({ cinema }: { cinema: Cinema }) {
  return (
    <Link to={`/cinemas/${cinema.mediaType}/${cinema.id}`}>
      <Box
        bg="ink.surface"
        borderWidth="1px"
        borderColor="ink.border"
        borderRadius="xl"
        overflow="hidden"
        transition="border-color .2s ease, transform .2s ease"
        _hover={{ borderColor: "ink.borderHover", transform: "translateY(-4px)" }}
      >
        <AspectRatio ratio={2 / 3}>
          {cinema.posterUrl ? (
            <Image
              src={cinema.posterUrl}
              alt={cinema.name}
              objectFit="cover"
              bg="ink.raised"
            />
          ) : (
            <Box bg="ink.raised" />
          )}
        </AspectRatio>
        <Flex align="baseline" justify="space-between" gap={3} px={4} py={3}>
          <Text fontSize="sm" fontWeight={500} noOfLines={1}>
            {cinema.name}
          </Text>
          <Text
            fontSize="sm"
            fontWeight={600}
            color={cinema.rating ? "brand.300" : "ink.muted"}
            flexShrink={0}
          >
            {cinema.rating ? cinema.rating.toFixed(1) : "—"}
          </Text>
        </Flex>
      </Box>
    </Link>
  );
}
