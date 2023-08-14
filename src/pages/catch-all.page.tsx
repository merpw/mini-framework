import { FC, useEffect } from "react";
import { Tab, useActiveTab } from "#/hooks/tabs.ts";
import { useAppSelector } from "#/store/hooks.ts";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "#/store";
import TodoList from "#/components/todos/TodoList.tsx";
import { navigate } from "vite-plugin-ssr/client/router";

import Layout from "#/layouts/Layout.tsx";
import { DocumentProps } from "#/renderer/types.ts";

export { Layout };

export const documentProps: DocumentProps = {
  title: "Todos",
  description: "Todos",
};

const selectActiveTabTodos = createSelector(
  (state: RootState) => state.todos,
  (_: RootState, activeTab: Tab) => activeTab,
  (state: RootState) => state.persist.hydrated,
  (todos, activeTab, isHydrated) => {
    return isHydrated ? todos.filter(activeTab.filter) : null;
  }
);

export const Page: FC = () => {
  const activeTab = useActiveTab();

  useEffect(() => {
    if (!activeTab) {
      navigate("/");
    }
  }, [activeTab]);

  const todos = useAppSelector(
    (state) => activeTab && selectActiveTabTodos(state, activeTab)
  );

  if (!todos) return null;

  return <TodoList todos={todos} />;
};
