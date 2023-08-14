import { FC } from "react";
import Link from "#/renderer/Link.tsx";
import usePageContext from "#/renderer/usePageContext.ts";

type Tab = {
  name: string;
  href: string;
};

const Tabs: Tab[] = [
  {
    name: "All",
    href: "/",
  },
  {
    name: "Active",
    href: "/active",
  },
  {
    name: "Completed",
    href: "/completed",
  },
];

const Filters: FC = () => {
  const { urlPathname } = usePageContext();

  const activeTab = Tabs.find((tab) => tab.href === urlPathname) as Tab;

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

export default Filters;
