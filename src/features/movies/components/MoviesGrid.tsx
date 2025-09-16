"use client";

import "./MoviesGrid.scss";

import { useQueries } from "@tanstack/react-query";

import Carousel from "@/shared/components/Carousel/components";
import { MovieCard } from "@/shared/components/MovieCard";
import { getCategoryNames } from "@/shared/utils";

import { moviesByCategoryQuery } from "../queries";
import type { TMDBMovie } from "../types/tmbdMovies";

export default function MoviesGrid() {
  const categoryNames = getCategoryNames();

  const results = useQueries({
    queries: categoryNames.map((name) => moviesByCategoryQuery(name)),
  });

  return (
    <div className="movies-grid">
      {results.map((res, i) => {
        const categoryName = categoryNames[i];
        const movies = res.data ?? [];

        if (res.isLoading) {
          return (
            <section key={categoryName} className="category-section">
              <h2 className="category-title">{categoryName}</h2>
              <p className="loading-message">Loading {categoryName} movies</p>
            </section>
          );
        }

        if (res.error) {
          return (
            <section key={categoryName} className="category-section">
              <h2 className="category-title">{categoryName}</h2>
              <p className="error-message">Error loading {categoryName}</p>
            </section>
          );
        }

        if (!movies.length) {
          return (
            <section key={categoryName} className="category-section">
              <h2 className="category-title">{categoryName}</h2>
              <p className="empty-message">No movies available</p>
            </section>
          );
        }

        return (
          <section key={categoryName} className="category-section">
            <h2 className="category-title">{categoryName}</h2>
            <Carousel.Root ariaLabel={`${categoryName} movies`}>
              <Carousel.Button direction="prev" />
              <Carousel.Slides>
                {movies.map((movie: TMDBMovie) => (
                  <Carousel.Item key={movie.id}>
                    <MovieCard
                      movie={movie}
                      variant="carousel"
                      category={categoryName}
                    />
                  </Carousel.Item>
                ))}
              </Carousel.Slides>
              <Carousel.Button direction="next" />
            </Carousel.Root>
          </section>
        );
      })}
    </div>
  );
}
