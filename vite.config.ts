import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rsc from "@vitejs/plugin-rsc";

export default defineConfig({
  plugins: [react(), rsc()],
  environments: {
    rsc: {
      build: { rollupOptions: { input: { index: "./src/entry.rsc.tsx" } } },
    },
    ssr: {
      build: { rollupOptions: { input: { index: "./src/entry.ssr.tsx" } } },
    },
    client: {
      build: { rollupOptions: { input: { index: "./src/entry.browser.tsx" } } },
    },
  },
});
