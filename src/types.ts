export interface Cinema {
  name: string;
  id: number;
  rating?: {
    kp: number | null;
    imdb: number | null;
    filmCritics: number | null;
    russianFilmCritics: number | null;
  };
  poster?: {
    url: string | null;
    previewUrl: string | null;
  };
  logo?: {
    url: string | null;
  };
}

export interface CinemaDetails extends Cinema {
  type?: string;
  description: string | null;
  year?: number;
  genres?: {
    name: string;
  }[];
  persons?: Person[];
  networks: null | [];
  similarMovies?: SimilarMovie[];
}

export type Person = {
  id: number;
  photo: string;
  name: string;
  description: string;
  profession: string;
};

export type Field = {
  name: string;
  slug: string;
};

export type SimilarMovie = {
  id: number;
  name: string;
  enName: string | null;
  alternativeName: string | null;
  type: string;
  poster: {
    url: string;
    previewUrl: string;
  };
};

export type Review = {
  id: number;
  movieId: number;
  title: string;
  type: string;
  review: string;
  date: string;
  author: string;
  authorId: string;
  userRating: number;
  updatedAt: string;
  createdAt: string;
};

export type Season = {
  movieId: number;
  number: number;
  airDate: string;
  createdAt: string;
  enName: string;
  episodes: Episode[];
};

export type Episode = {
  number: number;
  name: string;
  enName: string;
  airDate: string;
  description: string | null;
};

export const colors: Map<string, string> = new Map();
colors.set("Негативный", "red");
colors.set("Нейтральный", "yellow");
colors.set("Позитивный", "green");
