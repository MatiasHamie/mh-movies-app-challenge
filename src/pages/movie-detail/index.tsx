import MovieDetails from "@features/movieDetails/MovieDetails";
import {
  createServerQueryClient,
  prefetchMovieDetails,
} from "@features/movies/queries";
import { dehydrate } from "@tanstack/react-query";

import type { CategoryName } from "@/features/movies/types/categories";

import QueryProvider from "../../providers/QueryProvider.client";

interface MovieDetailServerPageProps {
  params: { id: string; category: CategoryName };
}

export default async function MovieDetailServerPage({
  params,
}: MovieDetailServerPageProps) {
  const movieId = parseInt(params.id);
  const category = params.category;

  const queryClient = createServerQueryClient();

  await prefetchMovieDetails(queryClient, movieId);

  const initialState = dehydrate(queryClient);

  return (
    <QueryProvider state={initialState}>
      <MovieDetails movieId={movieId} category={category} />
    </QueryProvider>
  );
}
