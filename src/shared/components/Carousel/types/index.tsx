import type { ReactNode, RefObject } from "react";

export interface CarouselContextValue {
  trackRef: RefObject<HTMLDivElement>;
  scrollStep: number;
}

export interface CarouselRootProps {
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
}

export interface CarouselSlidesProps {
  children: ReactNode;
  className?: string;
}

export interface CarouselItemProps {
  children: ReactNode;
  className?: string;
}

export interface CarouselButtonProps {
  direction: "prev" | "next";
  className?: string;
  ariaLabel?: string;
}

export interface CarouselTitleProps {
  children: ReactNode;
  className?: string;
}
