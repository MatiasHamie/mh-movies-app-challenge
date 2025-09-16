import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(
  "/assets",
  express.static(path.join(__dirname, "../dist/client/assets"))
);
app.use(express.static(path.join(__dirname, "../dist/client")));

app.use(async (req, res) => {
  try {
    const { default: handler } = await import("../dist/rsc/index.js");

    const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const response = await handler(
      new Request(url, {
        method: req.method,
        headers: req.headers,
      })
    );

    res.status(response.status);
    response.headers.forEach((v, k) => res.setHeader(k, v));
    const text = await response.text();
    res.end(text);
  } catch (error) {
    console.error("Production server error:", error);
    res.status(500).send(`Error: ${error.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Production server running on port ${PORT}`);
});
