import { QueryClient } from "@tanstack/react-query";

import { getMovieDetails, getMoviesByCategory } from "./actions";
import { CATEGORIES_GENRE_ID, type CategoryName } from "./types/categories";

export const moviesByCategoryQuery = (categoryName: CategoryName) => {
  const genreIDToSearch = CATEGORIES_GENRE_ID[categoryName];

  return {
    queryKey: ["movies", "category", categoryName] as const,
    queryFn: () =>
      getMoviesByCategory({
        genres: [genreIDToSearch],
      }),
    staleTime: 1000 * 60 * 60 * 24,
  };
};

export const movieDetailsQuery = (id: number) => ({
  queryKey: ["movie", "details", id] as const,
  queryFn: () => getMovieDetails(id),
  staleTime: 1000 * 60 * 60 * 24,
});

export async function prefetchMoviesByCategory(
  queryClient: QueryClient,
  categoryName: CategoryName
) {
  const query = moviesByCategoryQuery(categoryName);

  return queryClient.prefetchQuery(query);
}

export async function prefetchAllCategories(queryClient: QueryClient) {
  const categoryNames = Object.keys(CATEGORIES_GENRE_ID) as CategoryName[];

  await Promise.all(
    categoryNames.map((name) =>
      queryClient.prefetchQuery(moviesByCategoryQuery(name))
    )
  );
}

export async function prefetchMovieDetails(
  queryClient: QueryClient,
  id: number
) {
  const query = movieDetailsQuery(id);

  return queryClient.prefetchQuery(query);
}

export function createServerQueryClient() {
  return new QueryClient();
}
