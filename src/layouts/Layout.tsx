import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "#/store";
import PersistGate from "#/store/persist/PersistGate.tsx";
import Create from "#/components/todos/Create.tsx";
import { Tabs, useActiveTab } from "#/hooks/tabs.ts";
import Link from "#/renderer/Link.tsx";
import { todoActions } from "#/store/todos.ts";
import { useAppDispatch, useAppSelector } from "#/store/hooks.ts";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate>
        <Create />
        {children}
        <TodoFooter />
      </PersistGate>
    </Provider>
  );
};

const TodoFooter: FC = () => {
  const todoCount = useAppSelector((state) => state.todos.length);

  if (todoCount === 0) {
    return null;
  }

  return (
    <footer
      className={
        "bg-base-200 rounded flex flex-wrap items-center justify-between p-1"
      }
    >
      <TodoCount />
      <SelectTab />
      <ClearCompleted />
    </footer>
  );
};

const TodoCount: FC = () => {
  const incompleteCount = useAppSelector((state) =>
    state.todos.filter((todo) => !todo.isCompleted)
  ).length;

  return (
    <span
      className={`todo-count mx-3 justify-self-start order-1 sm:order-none`}
    >
      <strong>{incompleteCount}</strong>&nbsp;
      {incompleteCount === 1 ? "item" : "items"} left
      {!incompleteCount && " 🎉"}
    </span>
  );
};

const SelectTab: FC = () => {
  const activeTab = useActiveTab();
  return (
    <ul className="filters tabs mx-auto">
      {Tabs.map((tab, key) => (
        <li key={key}>
          <Link
            key={tab.href}
            href={tab.href}
            className={`tab tab-lg  ${
              tab === activeTab ? "tab-active selected" : ""
            }`}
          >
            {tab.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const ClearCompleted: FC = () => {
  const dispatch = useAppDispatch();
  const hasCompleted = useAppSelector(
    (state) => state.todos.findIndex((todo) => todo.isCompleted) !== -1
  );
  return (
    <button
      className={
        `clear-completed btn capitalize order-2 sm:order-none` +
        " " +
        (hasCompleted ? "visible" : "invisible")
      }
      onClick={() => dispatch(todoActions.clearCompleted())}
    >
      Clear completed
    </button>
  );
};

export default Layout;
