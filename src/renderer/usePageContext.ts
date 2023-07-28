// `usePageContext` allows us to access `pageContext` in any React component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import { createContext, useContext } from "react";
import type { PageContext as PageContextType } from "./types";

export const PageContext = createContext<PageContextType>(undefined as never);

const usePageContext = () => useContext(PageContext);

export default usePageContext;
