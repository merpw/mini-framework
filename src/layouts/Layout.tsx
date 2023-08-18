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
                    <Create />
                    {children}
                    <TodoFooter />
            </PersistGate>
        </Provider>
    );
};

const TodoFooter: FC = () => {
    const todoCount = useAppSelector(state =>
        state.todos.length
    );
    return(
        <>
        {todoCount === 0 ? null :
            <footer className={"bg-base-200 p-3 grid grid-cols-3 place-items-center"}>
                <TodoCount />
                <SelectTab />
                <ClearCompleted />
            </footer>}
        </>
    )
}

const TodoCount: FC = () => {
    const incompleteCount = useAppSelector(state =>
        state.todos.filter((todo) => !todo.isCompleted)
    ).length;

    return (
        <>
            <span className={`todo-count tab tab-lg justify-self-start`}>
                <strong>{incompleteCount}</strong>&nbsp;{incompleteCount === 1 ? "item" : "items"} left
            </span>
        </>
    )
}



const SelectTab: FC = () => {
  const activeTab = useActiveTab();
  return (
      <ul className="filters flex justify-center items-center">
        {Tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`tab tab-lg tab-bordered ${
              tab === activeTab ? "tab-active selected" : ""
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </ul>
  );
};

const ClearCompleted: FC = () => {
    const dispatch = useAppDispatch();
    const hasCompleted = useAppSelector(state =>
        state.todos.find((todo) => todo.isCompleted) !== undefined
    );
    return (
        <>
            {hasCompleted ? (
                <button
                    className={`clear-completed tab tab-lg tab-bordered justify-self-end`}
                    onClick={() => dispatch(todoActions.removeTodoCompleted())}
                >
                    Clear completed
                </button>
            ) : null}
        </>
    )

}

export default Layout;
