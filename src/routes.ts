import type { unstable_RSCRouteConfig as RSCRouteConfig } from "react-router";

export function routes() {
  return [
    {
      id: "root",
      path: "",
      lazy: () => import("./pages/root"),
      children: [
        { id: "home", index: true, lazy: () => import("./pages/home") },
        {
          id: "about",
          path: "about",
          lazy: () => import("./pages/about"),
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
