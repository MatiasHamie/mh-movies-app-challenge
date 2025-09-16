import {
  CATEGORIES_GENRE_ID,
  type CategoryName,
} from "@/features/movies/types/categories";

export const getCategoryNames = () => {
  return Object.keys(CATEGORIES_GENRE_ID) as CategoryName[];
};

export function getCategoryNameById(id: number): CategoryName | undefined {
  const entries = Object.entries(CATEGORIES_GENRE_ID) as [
    CategoryName,
    number
  ][];

  for (const [categoryName, genreId] of entries) {
    if (genreId === id) {
      return categoryName;
    }
  }

  return undefined;
}
