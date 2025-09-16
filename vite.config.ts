import react from "@vitejs/plugin-react";
import rsc from "@vitejs/plugin-rsc";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), rsc()],
    optimizeDeps: {
      exclude: ["@tanstack/react-query", "@tanstack/react-query-devtools"],
    },
    environments: {
      rsc: {
        build: {
          rollupOptions: { input: { index: "./src/entry.rsc.tsx" } },
        },
        define: {
          "process.env.TMDB_API_TOKEN": JSON.stringify(env.TMDB_API_TOKEN),
          "process.env.TMDB_BASE_URL": JSON.stringify(env.TMDB_BASE_URL),
        },
      },
      ssr: {
        build: {
          rollupOptions: { input: { index: "./src/entry.ssr.tsx" } },
        },
        define: {
          "process.env.TMDB_API_TOKEN": JSON.stringify(env.TMDB_API_TOKEN),
          "process.env.TMDB_BASE_URL": JSON.stringify(env.TMDB_BASE_URL),
        },
      },
      client: {
        build: {
          rollupOptions: { input: { index: "./src/entry.browser.tsx" } },
        },
      },
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@features": path.resolve(__dirname, "./src/features"),
        "@shared": path.resolve(__dirname, "./src/shared"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/shared/styles/utils.scss" as *;`,
        },
      },
    },
  };
});
