import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import type { PageContextClient } from "./types";

import "#/globals.css";
import { PageContext } from "./usePageContext.ts";

export const clientRouting = true;
export const hydrationCanBeAborted = true;

let root: ReactDOM.Root;

export async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;
  const page = (
    <StrictMode>
      <PageContext.Provider value={pageContext}>
        <Page {...pageProps} />
      </PageContext.Provider>
    </StrictMode>
  );
  const container = document.getElementById("root")!;
  if (pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page);
  } else {
    if (!root) {
      root = ReactDOM.createRoot(container);
    }
    root.render(page);
  }

  document.title = pageContext.exports.documentProps?.title ?? "Create Bra App";
}