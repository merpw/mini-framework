import { ReactNode } from "react";
import { PageContext } from "./usePageContext.ts";
import { PageContext as PageContextType } from "./types";

function PageShell({
  children,
  pageContext,
}: {
  children: ReactNode;
  pageContext: PageContextType;
}) {
  return (
    <PageContext.Provider value={pageContext}>{children}</PageContext.Provider>
  );
}

export default PageShell;
