/**
 * Maneja el scroll del carousel
 */
export function scrollCarousel(
  element: HTMLDivElement | null,
  direction: "prev" | "next",
  step: number
): void {
  if (!element) return;

  const scrollAmount = direction === "prev" ? -step : step;
  element.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
}
