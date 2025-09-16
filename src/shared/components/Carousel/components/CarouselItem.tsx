import "./CarouselItem.scss";

import type { CarouselItemProps } from "./types/types";

export function CarouselItem({ children, className = "" }: CarouselItemProps) {
  return (
    <article
      className={`carousel-item ${className}`}
      role="listitem"
      aria-label="Elemento del carousel"
    >
      {children}
    </article>
  );
}
