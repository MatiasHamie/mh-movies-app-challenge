"use client";

import "./index.scss";

import { useWishlist } from "@features/wishlist/wishlistStore";
import { Link } from "react-router";

import Carousel from "@/shared/components/Carousel/components";
import { MovieCard } from "@/shared/components/MovieCard";

import EmptyHeart from "./assets/EmptyHearth";

export default function WishlistPage() {
  const { getWishlistMovies, getWishlistCount } = useWishlist();
  const movies = getWishlistMovies();
  const count = getWishlistCount();

  if (count === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-header">
          <h1 className="page-title">My Wishlist</h1>
          <p className="movie-count">There are no movies here</p>
        </div>

        <div className="empty-state">
          <div className="empty-content">
            <div className="empty-icon">
              <EmptyHeart />
            </div>
            <h2 className="empty-title">Your wishlist is empty</h2>
            <p className="empty-description">Add to movies to your wishlist</p>
            <Link to="/" className="back-home-btn">
              Discover Movies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1 className="page-title">My Wishlist</h1>
        <p className="movie-count">
          {count} {count === 1 ? "Saved movie" : "Saved movies"}
        </p>
      </div>

      <div className="wishlist-carousel">
        <Carousel.Root ariaLabel="Movies in your wishlist">
          <Carousel.Button direction="prev" />
          <Carousel.Slides>
            {movies.map((movie) => (
              <Carousel.Item key={movie.id}>
                <MovieCard
                  movie={movie}
                  variant="carousel"
                  category={movie.category}
                />
              </Carousel.Item>
            ))}
          </Carousel.Slides>
          <Carousel.Button direction="next" />
        </Carousel.Root>
      </div>

      <div className="wishlist-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="grid-item">
            <MovieCard movie={movie} variant="grid" category={movie.category} />
          </div>
        ))}
      </div>
    </div>
  );
}
