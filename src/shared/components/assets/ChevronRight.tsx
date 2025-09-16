import type { SVGProps } from "react";

const ChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    fill="currentColor"
    {...props}
  >
    <path d="M64 320c0 141.4 114.6 256 256 256s256-114.6 256-256S461.4 64 320 64 64 178.6 64 320zm241 121c-9.4 9.4-24.6 9.4-33.9 0-9.3-9.4-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9 9.4-9.3 24.6-9.4 33.9 0L409 303c9.4 9.4 9.4 24.6 0 33.9L305 441z" />
  </svg>
);
export default ChevronRight;
