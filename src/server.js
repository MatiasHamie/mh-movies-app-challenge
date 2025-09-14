import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 5173;

async function start() {
  const app = express();

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    app.use(
      "/assets",
      express.static(path.join(__dirname, "dist/client/assets"), {
        immutable: true,
        maxAge: "1y",
      })
    );

    app.all("*", async (req, res) => {
      try {
        const origin = `${req.protocol}://${req.headers.host}`;
        const url = new URL(req.originalUrl, origin);
        const body =
          req.method === "GET" || req.method === "HEAD"
            ? undefined
            : (await import("node:stream")).Readable.toWeb(req);

        const request = new Request(url, {
          method: req.method,
          headers: req.headers,
          body,
        });

        const { default: handleRequest } = await import(
          path.join(__dirname, "dist/rsc/index.js")
        );

        const response = await handleRequest(request);

        res.status(response.status);
        response.headers.forEach((v, k) => res.setHeader(k, v));
        if (response.body) {
          const nodeStream = (await import("node:stream")).Readable.fromWeb(
            response.body
          );
          nodeStream.pipe(res);
        } else {
          res.end();
        }
      } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
      }
    });
  }

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
}

start();
