import MoviesGrid from "@features/movies/components/MoviesGrid";
import { dehydrate } from "@tanstack/react-query";

import {
  createServerQueryClient,
  prefetchAllCategories,
} from "@/features/movies/queries";

import QueryProvider from "../../providers/QueryProvider.client";

export default async function HomePage() {
  const queryClient = createServerQueryClient();
  await prefetchAllCategories(queryClient);
  const initialState = dehydrate(queryClient);

  return (
    <QueryProvider state={initialState}>
      <MoviesGrid />
    </QueryProvider>
  );
}
