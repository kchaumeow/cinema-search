import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cinema, CinemaDetails, Field, Review, Season } from "../../types";

type Pagination = {
  pages: number;
  total: number;
  limit: number;
  page: number;
};
type ReviewResponse = {
  docs: Review[];
} & Pagination;

type AllCinemasResponse = {
  docs: Cinema[];
} & Pagination;

type SeasonsResponse = {
  docs: Season[];
} & Pagination;

type AllCinemasArgs = {
  page: number;
  selectFields: string[];
  limit: string;
  filters: RandomArgs;
};

type CinemaByNameArgs = {
  page: number;
  limit: string;
  query: string;
};

type ReviewsArgs = {
  page: number;
  movieId: string;
  limit: string;
};

type SeasonsArgs = {
  movieId: string;
};

type RandomArgs = {
  genre?: string;
  country?: string;
  year?: string;
  ageRating?: string;
};

export const cinemasApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.poiskkino.dev",
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      headers.set("X-API-KEY", process.env.TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCinemas: builder.query<AllCinemasResponse, AllCinemasArgs>({
      query: (args) => {
        let params = new URLSearchParams();
        for (let arg of args.selectFields) params.append("selectFields", arg);
        params.append("page", args.page.toString());
        params.append("limit", args.limit);
        if (args.filters.genre)
          params.append("genres.name", args.filters.genre);
        if (args.filters.country)
          params.append("countries.name", args.filters.country);
        if (args.filters.year) params.append("year", args.filters.year);
        if (args.filters.ageRating)
          params.append("ageRating", args.filters.ageRating);
        return {
          url: "/v1.4/movie",
          params,
        };
      },
    }),
    getCinemaById: builder.query<CinemaDetails, string>({
      query: (arg) => {
        return {
          url: `/v1.4/movie/${arg}`,
        };
      },
    }),
    getCinemaPostersById: builder.query({
      query: (arg) => {
        return {
          url: `/v1.4/image`,
          params: {
            movieId: arg,
          },
        };
      },
    }),
    getGenres: builder.query<Field[], string>({
      query: () => {
        return {
          url: `/v1/movie/possible-values-by-field`,
          params: {
            field: "genres.name",
          },
        };
      },
      keepUnusedDataFor: 86400,
    }),
    getCountries: builder.query<Field[], string>({
      query: () => {
        return {
          url: `/v1/movie/possible-values-by-field`,
          params: {
            field: "countries.name",
          },
        };
      },
      keepUnusedDataFor: 86400,
    }),
    getReviews: builder.query<ReviewResponse, ReviewsArgs>({
      query: (args) => {
        let params = new URLSearchParams();
        params.append("page", args.page.toString());
        params.append("limit", args.limit);
        params.append("movieId", args.movieId);
        return {
          url: `/v1.4/review`,
          params,
        };
      },
    }),
    getSeasons: builder.query<SeasonsResponse, SeasonsArgs>({
      query: (args) => {
        return {
          url: `/v1.4/season`,
          params: {
            movieId: args.movieId,
          },
        };
      },
    }),
    getCinemaByName: builder.query<AllCinemasResponse, CinemaByNameArgs>({
      query: (args) => {
        let params = new URLSearchParams();
        params.append("page", args.page.toString());
        params.append("limit", args.limit);
        params.append("query", args.query);
        return {
          url: `/v1.4/movie/search`,
          params,
        };
      },
    }),
    getRandomCinema: builder.query<Cinema, RandomArgs>({
      query: (args) => {
        let params = new URLSearchParams();
        if (args.genre) params.append("genres.name", args.genre);
        if (args.country) params.append("countries.name", args.country);
        if (args.year) params.append("year", args.year);
        if (args.ageRating) params.append("ageRating", args.ageRating);
        return {
          url: `/v1.4/movie/random`,
          params,
        };
      },
    }),
  }),

  reducerPath: "api",
});

export const {
  useLazyGetAllCinemasQuery,
  useLazyGetCinemaByIdQuery,
  useLazyGetCinemaPostersByIdQuery,
  useLazyGetGenresQuery,
  useLazyGetCountriesQuery,
  useLazyGetReviewsQuery,
  useLazyGetSeasonsQuery,
  useLazyGetCinemaByNameQuery,
  useLazyGetRandomCinemaQuery,
} = cinemasApi;
