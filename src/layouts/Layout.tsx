import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "#/store";
import PersistGate from "#/store/persist/PersistGate.tsx";
import Create from "#/components/todos/Create.tsx";
import { Tabs, useActiveTab } from "#/hooks/tabs.ts";
import Link from "#/renderer/Link.tsx";
import { todoActions } from "#/store/todos.ts";
import {useAppDispatch, useAppSelector} from "#/store/hooks.ts";

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
  const dispatch = useAppDispatch();

  const incompleteCount = useAppSelector(state =>
        state.todos.filter((todo) => !todo.isCompleted)
  ).length;

  const todoCount = useAppSelector(state =>
      state.todos.length
  );

  const hasCompleted = useAppSelector(state =>
      state.todos.find((todo) => todo.isCompleted) !== undefined
  );

  return (
    <>
    {todoCount === 0 ? null :
      <ul className="tabs flex justify-center w-full">
          {incompleteCount > 1 ?
              <span className={`tab tab-lg`}>
                <strong>{incompleteCount}</strong>&nbsp; items left</span> :
              <span className={`tab tab-lg`}>
                <strong>{incompleteCount}</strong>&nbsp; item left</span>}
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
          {hasCompleted ? (
              <button
                  className={`self-end clear-completed tab tab-lg tab-bordered`}
                  onClick={() => dispatch(todoActions.removeTodoCompleted())}
              >
                  Clear completed
              </button>
          ) : null}
      </ul>}
    </>
  );
};

export default Layout;
