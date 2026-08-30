import { Flex, Stack } from "@chakra-ui/react";
import ReviewCard from "./ReviewCard";
import { usePagination } from "../hooks/usePagination";
import Pagination from "./Pagination";
import { useLazyGetReviewsQuery } from "../features/api/cinemasSlice";
import { useEffect } from "react";
import Error from "./Error";
import EmptyState from "./EmptyState";
import Loader from "./Loader";

export default function ReviewList({ id }: { id: string }) {
  const { page, limit, setPage, setLimit } = usePagination("reviews");
  const [
    trigger,
    {
      data: reviews,
      isLoading: reviewsLoading,
      isError: reviewsError,
      isFetching: reviewsFetching,
      isSuccess: reviewsSuccess,
      error,
    },
    lastPromiseInfo,
  ] = useLazyGetReviewsQuery();
  useEffect(() => {
    const request = trigger({ movieId: id, page, limit });
    return () => request.abort();
  }, [id, page, limit]);

  if (reviewsError) return <Error error={error} />;

  if (reviewsLoading || reviewsFetching) return <Loader />;

  if (!reviews || !reviews.docs.length)
    return <EmptyState>No reviews yet</EmptyState>;

  return (
    <Flex direction="column" gap={6} w="100%" maxW="800px" mx="auto">
      <Stack spacing={3}>
        {reviews.docs.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </Stack>
      <Pagination
        page={+page}
        maxPage={reviews.pages}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
      />
    </Flex>
  );
}
