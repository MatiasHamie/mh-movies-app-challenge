import "./CarouselTitle.scss";

import type { CarouselTitleProps } from "./types/types";

export function CarouselTitle({
  children,
  className = "",
}: CarouselTitleProps) {
  return <h2 className={`carousel-title ${className}`}>{children}</h2>;
}
