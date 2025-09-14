import { createFromReadableStream } from "@vitejs/plugin-rsc/browser";
import { hydrateRoot } from "react-dom/client";
import "./index.css";
import type { ReactNode } from "react";

async function main() {
  const rscResponse = await fetch(window.location.href + ".rsc");
  const body = rscResponse.body;

  if (!body) {
    throw new Error("Response in rsc with no body");
  }

  const root = await createFromReadableStream<ReactNode>(body);

  hydrateRoot(document, root);
}

main();
