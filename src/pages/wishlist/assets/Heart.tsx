import type { SVGProps } from "react";

const FilledHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    fill="currentColor"
    {...props}
  >
    <path d="m305 151.1 15 20.7 15-20.7C360 116.5 400.2 96 442.9 96 516.4 96 576 155.6 576 229.1v2.6c0 112.2-139.9 242.5-212.9 298.2-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C203.9 474.2 64 343.9 64 231.7v-2.6C64 155.6 123.6 96 197.1 96c42.7 0 82.9 20.5 107.9 55.1z" />
  </svg>
);

export default FilledHeart;
