import AppRoot from "../../AppRoot";

export default function Root() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>MH Challenge</title>
      </head>
      <body>
        <div id="root">
          <main>
            <AppRoot />
          </main>
        </div>
      </body>
    </html>
  );
}
