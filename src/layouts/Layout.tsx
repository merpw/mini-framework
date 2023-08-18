import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "#/store";
import PersistGate from "#/store/persist/PersistGate.tsx";
import Create from "#/components/todos/Create.tsx";
import { Tabs, useActiveTab } from "#/hooks/tabs.ts";
import Link from "#/renderer/Link.tsx";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate>
                <div className={"container mx-auto max-w-screen-md"}>
                    <Create />
                        <footer className={"bg-base-200 p-3"}>
                            {children}
                            <SelectTab />
                        </footer>
                </div>
            </PersistGate>
        </Provider>
    );
};

const SelectTab: FC = () => {
  const activeTab = useActiveTab();

  return (
    <>
      <div className="tabs flex justify-center w-full">
          <p className={`tab tab-lg`}>items left</p>
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
          <button className={`clear-completed tab tab-lg`}>Clear completed</button>
      </div>
    </>
  );
};

export default Layout;
