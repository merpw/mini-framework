import usePageContext from "#/renderer/usePageContext.ts";
import { Todo } from "#/store/todos.ts";

export type Tab = {
  name: string;
  href: string;
  filter: (todo: Todo) => boolean;
};

export const Tabs: Tab[] = [
  {
    name: "All",
    href: "/",
    filter: () => true,
  },
  {
    name: "Active",
    href: "/active",
    filter: (todo) => !todo.isCompleted,
  },
  {
    name: "Completed",
    href: "/completed",
    filter: (todo) => todo.isCompleted,
  },
];

export const useActiveTab = (): Tab | null => {
  const { urlPathname } = usePageContext();

  return Tabs.find((tab) => tab.href === urlPathname) ?? null;
};
