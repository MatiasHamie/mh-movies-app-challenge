import "./index.scss";

import {
  createFromReadableStream,
  createTemporaryReferenceSet,
  encodeReply,
  setServerCallback,
} from "@vitejs/plugin-rsc/browser";
import { startTransition,StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import {
  unstable_createCallServer as createCallServer,
  unstable_getRSCStream as getRSCStream,
  unstable_RSCHydratedRouter as RSCHydratedRouter,
  type unstable_RSCPayload as RSCServerPayload,
} from "react-router";

setServerCallback(
  createCallServer({
    createFromReadableStream,
    createTemporaryReferenceSet,
    encodeReply,
  })
);

startTransition(async () => {
  const payload = await createFromReadableStream<RSCServerPayload>(
    getRSCStream()
  );

  const formState =
    payload.type === "render" ? await payload.formState : undefined;

  hydrateRoot(
    document,
    <StrictMode>
      <RSCHydratedRouter
        createFromReadableStream={createFromReadableStream}
        payload={payload}
      />
    </StrictMode>,
    { formState }
  );
});
