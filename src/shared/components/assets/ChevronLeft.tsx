import type { SVGProps } from "react";

const ChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    fill="currentColor"
    {...props}
  >
    <path d="M576 320c0-141.4-114.6-256-256-256S64 178.6 64 320s114.6 256 256 256 256-114.6 256-256zM335 199c9.4-9.4 24.6-9.4 33.9 0 9.3 9.4 9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9-9.4 9.3-24.6 9.4-33.9 0L231 337c-9.4-9.4-9.4-24.6 0-33.9L335 199z" />
  </svg>
);
export default ChevronLeft;
