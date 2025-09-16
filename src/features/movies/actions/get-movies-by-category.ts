import type { TMDBMovie, TMDBMovies } from "../types/tmbdMovies";

function getAuthToken(): string {
  const token = process.env.TMDB_API_TOKEN;

  if (!token) {
    throw new Error("Auth is not configured");
  }

  return `Bearer ${token}`;
}

function getBaseUrl(): string {
  return process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
}

export async function getMoviesByCategory({
  genres,
  page = 1,
}: {
  genres: number[];
  page?: number;
  language?: string;
}): Promise<TMDBMovie[]> {
  const AUTH = getAuthToken();
  const BASE_URL = getBaseUrl();

  const genresToSearch = genres.join("|");

  const url = `${BASE_URL}/discover/movie?with_genres=${genresToSearch}&sort_by=popularity.desc&page=${page}&language=en`;

  const res = await fetch(url, {
    headers: {
      Authorization: AUTH,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`FETCH TMDB Error ${res.status} in discover/movie`);
  }

  const data = (await res.json()) as TMDBMovies;
  return data.results ?? [];
}

export async function getMovieDetails(id: number): Promise<TMDBMovie> {
  const AUTH = getAuthToken();
  const BASE_URL = getBaseUrl();

  const url = `${BASE_URL}/movie/${id}?language=en`;

  const res = await fetch(url, {
    headers: {
      Authorization: AUTH,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`FETCH TMDB Error ${res.status} in movie/${id}`);
  }

  return res.json();
}
