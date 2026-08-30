export type MediaType = "movie" | "tv";

export interface Cinema {
  id: number;
  mediaType: MediaType;
  name: string;
  posterUrl: string | null;
  rating: number | null;
  year: string | null;
}

export interface CinemaDetails extends Cinema {
  overview: string;
  genres: string[];
  cast: Person[];
  similar: Cinema[];
  posters: string[];
  seasons: SeasonSummary[];
}

export type Person = {
  id: number;
  name: string;
  character: string;
  photoUrl: string | null;
};

export type SeasonSummary = {
  seasonNumber: number;
  name: string;
  episodeCount: number;
};

export type Episode = {
  number: number;
  name: string;
  overview: string;
  airDate: string | null;
};

export type Review = {
  id: string;
  author: string;
  content: string;
  updatedAt: string;
  rating: number | null;
};

// Genre and country selects both render {id, name}; the id is what discover
// filters expect (a numeric genre id, an ISO 3166-1 country code).
export type Field = {
  id: string;
  name: string;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  totalPages: number;
};
