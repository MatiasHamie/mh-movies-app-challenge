import { renderToReadableStream } from "@vitejs/plugin-rsc/rsc";
import App from "./App.tsx";

export default async function handler(request: Request): Promise<Response> {
  const root = <App />;
  const rscStream = renderToReadableStream(root);

  if (request.url.endsWith(".rsc")) {
    return new Response(rscStream, {
      headers: {
        "Content-type": "text/x-component;charset=utf-8",
      },
    });
  }

  const ssrEntry = await import.meta.viteRsc.loadModule<
    typeof import("./entry.ssr.tsx")
  >("ssr", "index");

  const htmlStream = await ssrEntry.handleSsr(rscStream);

  return new Response(htmlStream, {
    headers: {
      "Content-type": "text/html",
    },
  });
}

if (import.meta.hot) {
  import.meta.hot.accept();
}
