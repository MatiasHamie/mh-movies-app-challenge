"use client";

import "./MovieDetails.scss";

import { movieDetailsQuery } from "@features/movies/queries";
import { WishlistButton } from "@features/wishlist/WishlistButton";
import { useQuery } from "@tanstack/react-query";

import { BackButton } from "@/shared/components/BackButton";
import { useScrollToTop } from "@/shared/hooks/useScrollToTop";

import type { CategoryName } from "../movies/types/categories";
interface MovieDetailPageProps {
  movieId: number;
  category: CategoryName;
}

export default function MovieDetails({
  movieId,
  category,
}: MovieDetailPageProps) {
  useScrollToTop();

  const {
    data: movie = null,
    isLoading,
    error,
  } = useQuery(movieDetailsQuery(movieId));

  if (isLoading) {
    return (
      <div className="movie-detail loading">
        <div className="loading-content">
          <p>Loading movie...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-detail error">
        <div className="error-content">
          <h1>Error</h1>
          <p>Couldn't load the movie</p>
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <div className={`theme theme--${category} movie-detail`}>
      <header className="header">
        <BackButton />
        <h1 className="title">{movie.title}</h1>
      </header>

      <div className="content">
        <div className="image-section">
          <div className="image-container">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Poster ${movie.title}`}
                className="poster"
              />
            ) : (
              <div className="placeholder">No image</div>
            )}
          </div>
        </div>

        <div className="info-section">
          <div className="actions">
            <WishlistButton movie={movie} variant="large" category={category} />
          </div>

          <div className="description">
            <h2>Description</h2>
            <p>{movie.overview || "No description available"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
