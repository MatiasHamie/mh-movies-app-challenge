"use client";

import "./CarouselSlides.scss";

import { useCarousel } from "../context/CarouselContext";
import type { CarouselSlidesProps } from "../types";

export function CarouselSlides({
  children,
  className = "",
}: CarouselSlidesProps) {
  const { trackRef } = useCarousel();

  return (
    <div className="carousel-slides-container">
      <div
        ref={trackRef}
        className={`carousel-slides ${className}`}
        role="list"
        aria-live="polite"
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
}
