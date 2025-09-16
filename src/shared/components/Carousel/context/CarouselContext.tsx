"use client";

import { createContext, useContext } from "react";

import type { CarouselContextValue } from "../types";

const CarouselContext = createContext<CarouselContextValue | undefined>(
  undefined
);

export function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("Carousel components must be used within Carousel.Root");
  }

  return context;
}

export { CarouselContext };
