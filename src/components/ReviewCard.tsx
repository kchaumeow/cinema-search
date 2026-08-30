import { Review } from "../types";
import { Box, Flex, Text } from "@chakra-ui/react";

// TMDB reviews carry the author's own score instead of a sentiment label, so
// the accent stripe is derived from that.
function accentFor(rating: number | null) {
  if (rating === null) return "ink.border";
  if (rating >= 7) return "green.300";
  if (rating <= 4) return "red.300";
  return "yellow.300";
}

export default function ReviewCard({ review }: { review: Review }) {
  const accent = accentFor(review.rating);
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
        <Flex gap={2} align="baseline">
          <Text fontSize="sm" fontWeight={500}>
            {review.author}
          </Text>
          {review.rating !== null && (
            <Text fontSize="sm" fontWeight={600} color={accent}>
              {review.rating.toFixed(1)}
            </Text>
          )}
        </Flex>
        <Text fontSize="xs" color="ink.muted" flexShrink={0}>
          {new Date(review.updatedAt).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
      </Flex>
      <Text fontSize="sm" color="ink.text" lineHeight="tall" noOfLines={12}>
        {review.content}
      </Text>
    </Box>
  );
}
