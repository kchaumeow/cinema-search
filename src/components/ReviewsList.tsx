import { Flex, Stack } from "@chakra-ui/react";
import ReviewCard from "./ReviewCard";
import { usePagination } from "../hooks/usePagination";
import Pagination from "./Pagination";
import { useLazyGetReviewsQuery } from "../features/api/cinemasSlice";
import { useEffect } from "react";
import Error from "./Error";
import EmptyState from "./EmptyState";
import Loader from "./Loader";
import { MediaType } from "../types";

type ReviewListProps = {
  id: string;
  mediaType: MediaType;
};

export default function ReviewList({ id, mediaType }: ReviewListProps) {
  const { page, setPage } = usePagination("reviews");
  const [trigger, { data: reviews, isLoading, isFetching, isError, error }] =
    useLazyGetReviewsQuery();

  useEffect(() => {
    const request = trigger({ mediaType, id, page });
    return () => request.abort();
  }, [mediaType, id, page]);

  if (isError) return <Error error={error} />;

  if (isLoading || isFetching) return <Loader />;

  if (!reviews || !reviews.items.length)
    return <EmptyState>No reviews yet</EmptyState>;

  return (
    <Flex direction="column" gap={6} w="100%" maxW="800px" mx="auto">
      <Stack spacing={3}>
        {reviews.items.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </Stack>
      <Pagination page={page} maxPage={reviews.totalPages} setPage={setPage} />
    </Flex>
  );
}
