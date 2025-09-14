import { createFromReadableStream } from "@vitejs/plugin-rsc/ssr";
import { renderToReadableStream } from "react-dom/server.edge";
import type { ReactNode } from "react";

export async function handleSsr(rscStream: ReadableStream) {
  const root = await createFromReadableStream<ReactNode>(rscStream);

  const bootstrapScriptContent =
    await import.meta.viteRsc.loadBootstrapScriptContent("index");

  const htmlStream = renderToReadableStream(root, {
    bootstrapScriptContent,
  });

  return htmlStream;
}
