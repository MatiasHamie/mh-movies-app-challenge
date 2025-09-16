"use client";

import "./WishlistButton.scss";

import EmptyHeart from "@/pages/wishlist/assets/EmptyHearth";
import FilledHeart from "@/pages/wishlist/assets/Heart";

import type { CategoryName } from "../movies/types/categories";
import type { TMDBMovie } from "../movies/types/tmbdMovies";
import { useWishlist } from "./wishlistStore";

interface WishlistButtonProps {
  movie: TMDBMovie;
  variant?: "small" | "large";
  category: CategoryName;
}

export function WishlistButton({
  movie,
  variant = "small",
  category,
}: WishlistButtonProps) {
  const { isInWishlist, add, remove } = useWishlist();
  const inWishlist = isInWishlist(movie.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      remove(movie.id);
    } else {
      add({ ...movie, category });
    }
  };

  return (
    <button
      className={`wishlist-button ${variant} ${inWishlist ? "active" : ""}`}
      onClick={handleToggle}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      type="button"
    >
      <span className="icon">
        {inWishlist ? (
          <FilledHeart width={20} height={20} />
        ) : (
          <EmptyHeart width={20} height={20} />
        )}
      </span>
      {variant === "large" && (
        <span className="text">
          {inWishlist ? "In Wishlist" : "Add to my Wishlist"}
        </span>
      )}
    </button>
  );
}
