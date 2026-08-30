import { colors, Review } from "../types";
import { Box, Flex, Text } from "@chakra-ui/react";

export default function ReviewCard({ review }: { review: Review }) {
  const accent = colors.get(review.type) + ".300";
  return (
    <Box
      bg="ink.surface"
      borderWidth="1px"
      borderColor="ink.border"
      borderLeftWidth="3px"
      borderLeftColor={accent}
      borderRadius="lg"
      p={5}
    >
      <Flex justify="space-between" align="baseline" gap={4} mb={2}>
        <Text fontSize="sm" fontWeight={500}>
          {review.author}
        </Text>
        <Text fontSize="xs" color="ink.muted" flexShrink={0}>
          {new Date(review.updatedAt).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
      </Flex>
      <Text fontSize="md" fontWeight={600} color={accent} mb={2}>
        {review.title}
      </Text>
      <Text fontSize="sm" color="ink.text" lineHeight="tall">
        {review.review}
      </Text>
    </Box>
  );
}
