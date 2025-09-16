import { CarouselButton } from "./CarouselButton";
import { CarouselItem } from "./CarouselItem";
import { CarouselRoot } from "./CarouselRoot";
import { CarouselSlides } from "./CarouselSlides";
import { CarouselTitle } from "./CarouselTitle";

export { CarouselButton as Button } from "./CarouselButton";
export { CarouselItem as Item } from "./CarouselItem";
export { CarouselRoot as Root } from "./CarouselRoot";
export { CarouselSlides as Slides } from "./CarouselSlides";
export { CarouselTitle as Title } from "./CarouselTitle";

const Carousel = {
  Root: CarouselRoot,
  Slides: CarouselSlides,
  Item: CarouselItem,
  Button: CarouselButton,
  Title: CarouselTitle,
};

export default Carousel;
