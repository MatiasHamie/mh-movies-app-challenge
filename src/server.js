import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use(async (req, res, next) => {
    try {
      const mod = await vite.ssrLoadModule("/src/entry.rsc.tsx");

      const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
      const init = {
        method: req.method,
        headers: req.headers,
        body: req.method === "GET" || req.method === "HEAD" ? undefined : req,
        duplex:
          req.method === "GET" || req.method === "HEAD" ? undefined : "half",
      };
      const response = await mod.default(new Request(url, init));

      res.status(response.status);
      response.headers.forEach((v, k) => res.setHeader(k, v));
      const text = await response.text();
      res.end(text);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5173);

  console.log("http://localhost:5173");
}

createServer();
