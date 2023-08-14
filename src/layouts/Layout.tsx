import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "#/store";
import Create from "#/components/todos/Create.tsx";
import { Tabs, useActiveTab } from "#/hooks/tabs.ts";
import Link from "#/renderer/Link.tsx";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <div className={"container mx-auto max-w-screen-md"}>
        <Create />
        <div className={"bg-base-200 p-3"}>
          <SelectTab />
          {children}
        </div>
      </div>
    </Provider>
  );
};

const SelectTab: FC = () => {
  const activeTab = useActiveTab();

  return (
    <>
      <div className="tabs flex justify-center w-full">
        {Tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`tab tab-lg tab-bordered ${
              tab === activeTab ? "tab-active" : ""
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Layout;
