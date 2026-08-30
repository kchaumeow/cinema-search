import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Cinema,
  CinemaDetails,
  Episode,
  Field,
  MediaType,
  Paginated,
  Person,
  Review,
} from "../../types";

const IMAGE_BASE = "https://image.tmdb.org/t/p";

const image = (path: string | null | undefined, size = "w500") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

// TMDB keeps films and series apart: a film has title/release_date, a series
// has name/first_air_date. Everything is folded into one shape here so the
// components never have to branch on media type.
type TmdbListItem = {
  id: number;
  media_type?: MediaType;
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_average: number | null;
  release_date?: string;
  first_air_date?: string;
};

type TmdbPage = {
  page: number;
  total_pages: number;
  results: TmdbListItem[];
};

function toCinema(item: TmdbListItem, mediaType: MediaType): Cinema {
  const date = item.release_date || item.first_air_date;
  return {
    id: item.id,
    mediaType: item.media_type ?? mediaType,
    name: item.title ?? item.name ?? "Untitled",
    posterUrl: image(item.poster_path),
    rating: item.vote_average || null,
    year: date ? date.slice(0, 4) : null,
  };
}

function toPage(response: TmdbPage, mediaType: MediaType): Paginated<Cinema> {
  return {
    items: response.results.map((item) => toCinema(item, mediaType)),
    page: response.page,
    // Discover refuses to page past 500 whatever the result count says.
    totalPages: Math.min(response.total_pages, 500),
  };
}

type Filters = {
  genre?: string;
  country?: string;
  year?: string;
  ageRating?: string;
};

// US certifications are the only ones discover can filter on, and only for
// films — series carry content ratings that discover does not expose.
const certifications: Record<string, string> = {
  "18": "NC-17",
  "16": "R",
  "12": "PG-13",
  "6": "PG",
  "0": "G",
};

function discoverParams(mediaType: MediaType, page: number, filters: Filters) {
  const params = new URLSearchParams({
    include_adult: "false",
    language: "en-US",
    page: String(page),
    sort_by: "popularity.desc",
  });
  if (filters.genre) params.set("with_genres", filters.genre);
  if (filters.country) params.set("with_origin_country", filters.country);
  if (filters.year) {
    params.set(
      mediaType === "movie" ? "primary_release_year" : "first_air_date_year",
      filters.year,
    );
  }
  if (filters.ageRating && mediaType === "movie") {
    const certification = certifications[filters.ageRating];
    if (certification) {
      params.set("certification_country", "US");
      params.set("certification", certification);
    }
  }
  return params;
}

type TmdbDetails = TmdbListItem & {
  overview: string;
  genres: { id: number; name: string }[];
  seasons?: { season_number: number; name: string; episode_count: number }[];
  credits: {
    cast: {
      id: number;
      name: string;
      character?: string;
      profile_path: string | null;
    }[];
  };
  images: { posters: { file_path: string }[] };
  similar: TmdbPage;
};

export const cinemasApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${process.env.TOKEN}`);
      return headers;
    },
  }),
  // A film page is revisited constantly while browsing; a ten minute cache
  // keeps that from costing a request every time.
  keepUnusedDataFor: 600,
  endpoints: (builder) => ({
    getAllCinemas: builder.query<
      Paginated<Cinema>,
      { mediaType: MediaType; page: number; filters: Filters }
    >({
      query: ({ mediaType, page, filters }) => ({
        url: `/discover/${mediaType}`,
        params: discoverParams(mediaType, page, filters),
      }),
      transformResponse: (response: TmdbPage, _meta, { mediaType }) =>
        toPage(response, mediaType),
    }),

    getCinemaById: builder.query<
      CinemaDetails,
      { mediaType: MediaType; id: string }
    >({
      query: ({ mediaType, id }) => ({
        url: `/${mediaType}/${id}`,
        params: {
          language: "en-US",
          append_to_response: "credits,images,similar",
        },
      }),
      transformResponse: (response: TmdbDetails, _meta, { mediaType }) => ({
        ...toCinema(response, mediaType),
        overview: response.overview,
        genres: response.genres.map((genre) => genre.name),
        cast: response.credits.cast.slice(0, 20).map(
          (person): Person => ({
            id: person.id,
            name: person.name,
            character: person.character ?? "",
            photoUrl: image(person.profile_path, "w185"),
          }),
        ),
        similar: response.similar.results.map((item) =>
          toCinema(item, mediaType),
        ),
        posters: response.images.posters
          .slice(0, 10)
          .map((poster) => `${IMAGE_BASE}/w500${poster.file_path}`),
        seasons: (response.seasons ?? [])
          .filter((season) => season.episode_count > 0)
          .map((season) => ({
            seasonNumber: season.season_number,
            name: season.name,
            episodeCount: season.episode_count,
          })),
      }),
    }),

    getReviews: builder.query<
      Paginated<Review>,
      { mediaType: MediaType; id: string; page: number }
    >({
      query: ({ mediaType, id, page }) => ({
        url: `/${mediaType}/${id}/reviews`,
        params: { page },
      }),
      transformResponse: (response: {
        page: number;
        total_pages: number;
        results: {
          id: string;
          author: string;
          content: string;
          updated_at: string;
          author_details: { rating: number | null };
        }[];
      }) => ({
        items: response.results.map((review) => ({
          id: review.id,
          author: review.author,
          content: review.content,
          updatedAt: review.updated_at,
          rating: review.author_details.rating,
        })),
        page: response.page,
        totalPages: response.total_pages,
      }),
    }),

    getSeason: builder.query<Episode[], { id: string; seasonNumber: number }>({
      query: ({ id, seasonNumber }) => ({
        url: `/tv/${id}/season/${seasonNumber}`,
        params: { language: "en-US" },
      }),
      transformResponse: (response: {
        episodes: {
          episode_number: number;
          name: string;
          overview: string;
          air_date: string | null;
        }[];
      }) =>
        response.episodes.map((episode) => ({
          number: episode.episode_number,
          name: episode.name,
          overview: episode.overview,
          airDate: episode.air_date || null,
        })),
    }),

    getGenres: builder.query<Field[], MediaType>({
      query: (mediaType) => ({
        url: `/genre/${mediaType}/list`,
        params: { language: "en" },
      }),
      transformResponse: (response: { genres: { id: number; name: string }[] }) =>
        response.genres.map((genre) => ({
          id: String(genre.id),
          name: genre.name,
        })),
      keepUnusedDataFor: 86400,
    }),

    getCountries: builder.query<Field[], void>({
      query: () => "/configuration/countries",
      transformResponse: (
        response: { iso_3166_1: string; english_name: string }[],
      ) =>
        response
          .map((country) => ({
            id: country.iso_3166_1,
            name: country.english_name,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)),
      keepUnusedDataFor: 86400,
    }),

    getCinemaByName: builder.query<
      Paginated<Cinema>,
      { query: string; page: number }
    >({
      query: ({ query, page }) => ({
        url: "/search/multi",
        params: { query, page, include_adult: "false", language: "en-US" },
      }),
      transformResponse: (response: TmdbPage): Paginated<Cinema> => ({
        // Multi search also returns people, which this app has no page for.
        items: response.results
          .filter((item) => item.media_type !== undefined)
          .filter((item) => item.media_type !== ("person" as MediaType))
          .map((item) => toCinema(item, "movie")),
        page: response.page,
        totalPages: Math.min(response.total_pages, 500),
      }),
    }),

    // TMDB has no random endpoint, so a page is picked at random from the
    // filtered set and then one title from that page.
    getRandomCinema: builder.query<
      Cinema | null,
      { mediaType: MediaType; filters: Filters }
    >({
      async queryFn({ mediaType, filters }, _api, _extra, baseQuery) {
        const first = await baseQuery({
          url: `/discover/${mediaType}`,
          params: discoverParams(mediaType, 1, filters),
        });
        if (first.error) return { error: first.error };

        const firstPage = first.data as TmdbPage;
        const pages = Math.min(firstPage.total_pages, 500);
        if (!pages) return { data: null };

        const page = Math.floor(Math.random() * pages) + 1;
        const chosen =
          page === 1
            ? first
            : await baseQuery({
                url: `/discover/${mediaType}`,
                params: discoverParams(mediaType, page, filters),
              });
        if (chosen.error) return { error: chosen.error };

        const results = (chosen.data as TmdbPage).results;
        if (!results.length) return { data: null };
        const item = results[Math.floor(Math.random() * results.length)];
        return { data: toCinema(item, mediaType) };
      },
    }),
  }),

  reducerPath: "api",
});

export const {
  useLazyGetAllCinemasQuery,
  useLazyGetCinemaByIdQuery,
  useLazyGetReviewsQuery,
  useLazyGetSeasonQuery,
  useLazyGetGenresQuery,
  useLazyGetCountriesQuery,
  useLazyGetCinemaByNameQuery,
  useLazyGetRandomCinemaQuery,
} = cinemasApi;
