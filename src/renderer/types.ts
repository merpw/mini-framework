import { FC, ReactElement } from "react";
import type {
  PageContextBuiltIn,
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
} from "vite-plugin-ssr/types";

type Page = (pageProps: PageProps) => ReactElement;
export type PageProps = Record<string, unknown>;

export type DocumentProps = {
  title?: string;
  description?: string;
};

export type PageContextCustom = {
  Page: Page;
  pageProps?: PageProps;
  urlPathname: string;
  exports: {
    documentProps?: DocumentProps;
    Layout?: FC<{ children: ReactElement }>;
  };
};

export type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom;
export type PageContextClient = PageContextBuiltInClient<Page> &
  PageContextCustom;

export type PageContext = PageContextClient | PageContextServer;
