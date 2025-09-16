import type { TMDBMovie } from "../types/tmbdMovies";

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

export async function getMovieDetails(id: number): Promise<TMDBMovie> {
  const AUTH = getAuthToken();
  const BASE_URL = getBaseUrl();
  const url = `${BASE_URL}/movie/${id}`;

  const res = await fetch(url, {
    headers: {
      Authorization: AUTH,
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB ${res.status} movie/${id}`);
  }

  return (await res.json()) as TMDBMovie;
}
