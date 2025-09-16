"use client";

import "./CarouselRoot.scss";

import { useMemo,useRef } from "react";

import { CarouselContext } from "../context/CarouselContext";
import type { CarouselContextValue, CarouselRootProps } from "../types";

export function CarouselRoot({
  children,
  ariaLabel = "Carousel de contenido",
  className = "",
}: CarouselRootProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(
    (): CarouselContextValue => ({
      trackRef: trackRef as React.RefObject<HTMLDivElement>,
      scrollStep: 1000,
    }),
    []
  );

  return (
    <CarouselContext.Provider value={contextValue}>
      <section
        className={`carousel ${className}`}
        aria-label={ariaLabel}
        role="region"
      >
        {children}
      </section>
    </CarouselContext.Provider>
  );
}
