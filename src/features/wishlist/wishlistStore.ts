"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CategoryName } from "../movies/types/categories";
import type { TMDBMovie } from "../movies/types/tmbdMovies";

interface MovieWithCategory extends TMDBMovie {
  category: CategoryName;
}

type WishlistState = {
  items: Record<number, MovieWithCategory>;
  add: (movie: MovieWithCategory) => void;
  remove: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  getWishlistMovies: () => MovieWithCategory[];
  getWishlistCount: () => number;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: {},
      add: (movie) =>
        set((prevState) => ({
          items: { ...prevState.items, [movie.id]: movie },
        })),
      remove: (id) =>
        set((prevState) => {
          const items = { ...prevState.items };
          delete items[id];
          return { items };
        }),
      isInWishlist: (id) => {
        const state = get();
        return id in state.items;
      },
      getWishlistMovies: () => {
        const state = get();
        return Object.values(state.items);
      },
      getWishlistCount: () => {
        const state = get();
        return Object.keys(state.items).length;
      },
    }),
    { name: "wishlist" }
  )
);
