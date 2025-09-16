import "./MovieCard.scss";

import type { TMDBMovie } from "@features/movies/types/tmbdMovies";
import { WishlistButton } from "@features/wishlist/WishlistButton";
import { Link } from "react-router";

import type { CategoryName } from "@/features/movies/types/categories";

interface MovieCardProps {
  movie: TMDBMovie;
  variant?: "grid" | "carousel";
  category: CategoryName;
}

export function MovieCard({
  movie,
  variant = "carousel",
  category,
}: MovieCardProps) {
  return (
    <article className={`movie-card ${variant}`}>
      <Link to={`/movie/${movie.id}/${category}`} className="image-link">
        <div className="header">
          <h3 className="title">{movie.title}</h3>
          <WishlistButton movie={movie} category={category} />
        </div>

        <div className="image-container">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className="poster"
              loading="lazy"
            />
          ) : (
            <div className="placeholder">No Image</div>
          )}
        </div>

        {movie.overview && <p className="overview">{movie.overview}</p>}
      </Link>
    </article>
  );
}
