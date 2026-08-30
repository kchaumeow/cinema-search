import { useLazyGetSeasonsQuery } from "../features/api/cinemasSlice";
import Seasons from "./Seasons";
import { useEffect } from "react";
import Error from "./Error";
import EmptyState from "./EmptyState";
import Loader from "./Loader";

export default function SeasonsList({ movieId }: { movieId: string }) {
  const [
    trigger,
    {
      data: seasons,
      isLoading,
      isError,
      isFetching,
      isSuccess,
      error: seasonsError,
    },
    lastPromiseInfo,
  ] = useLazyGetSeasonsQuery();
  useEffect(() => {
    const request = trigger({ movieId: movieId });
    return () => request.abort();
  }, [movieId]);

  if (isError) return <Error error={seasonsError} />;

  if (isLoading || !seasons || isFetching) return <Loader />;

  if (!seasons.docs.length) return <EmptyState>No seasons found</EmptyState>;

  return <Seasons list={seasons.docs} />;
}
