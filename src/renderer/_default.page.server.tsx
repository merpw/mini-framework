import ReactDOMServer from "react-dom/server";
import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr/server";
import type { PageContextServer } from "./types";

import "#/globals.css";
import { PageContext } from "#/renderer/usePageContext.ts";
import { Fragment, StrictMode } from "react";

const defaultDocumentProps = {
  title: "",
  description: "",
};

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps"];

export async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext;

  const Layout = pageContext.exports.Layout || Fragment;

  const page = (
    <StrictMode>
      <PageContext.Provider value={pageContext}>
        <Layout>
          <Page {...pageProps} />
        </Layout>
      </PageContext.Provider>
    </StrictMode>
  );

  const pageHtml = ReactDOMServer.renderToString(page);

  // See https://vite-plugin-ssr.com/head
  const documentProps = {
    ...defaultDocumentProps,
    ...pageContext.exports.documentProps,
  };

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${documentProps.description}" />
        <title>${documentProps.title}</title>
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
}
