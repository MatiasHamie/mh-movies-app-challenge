import type { unstable_RSCRouteConfig as RSCRouteConfig } from "react-router";

export function routes() {
  return [
    {
      id: "root",
      path: "",
      lazy: () => import("./pages/root"),
      children: [
        {
          id: "movies",
          index: true,
          lazy: () => import("./pages/movies"),
        },
        {
          id: "movie-detail",
          path: "movie/:id/:category",
          lazy: () => import("./pages/movie-detail"),
        },
        {
          id: "wishlist",
          path: "wishlist",
          lazy: () => import("./pages/wishlist"),
        },
        {
          id: "404",
          path: "*",
          lazy: () => import("./pages/not-found"),
        },
      ],
    },
  ] satisfies RSCRouteConfig;
}
