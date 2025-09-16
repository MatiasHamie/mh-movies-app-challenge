"use client";

import "./CarouselButton.scss";

import { useCallback } from "react";

import ChevronLeft from "../../assets/ChevronLeft";
import ChevronRight from "../../assets/ChevronRight";
import { useCarousel } from "../context/CarouselContext";
import type { CarouselButtonProps } from "../types";
import { scrollCarousel } from "../utils/utils";

const ARIA_LABELS = {
  prev: "Ver elementos anteriores",
  next: "Ver elementos siguientes",
} as const;

const ICONS = {
  prev: ChevronLeft,
  next: ChevronRight,
} as const;

export function CarouselButton({
  direction,
  className = "",
  ariaLabel,
}: CarouselButtonProps) {
  const { trackRef, scrollStep } = useCarousel();

  const handleClick = useCallback(() => {
    scrollCarousel(trackRef.current, direction, scrollStep);
  }, [trackRef, direction, scrollStep]);

  const Icon = ICONS[direction];
  const label = ariaLabel || ARIA_LABELS[direction];

  return (
    <button
      type="button"
      className={`carousel-button carousel-button--${direction} ${className}`}
      aria-label={label}
      onClick={handleClick}
    >
      <Icon width={24} height={24} className="carousel-button__icon" />
    </button>
  );
}
