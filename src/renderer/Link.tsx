import { navigate } from "vite-plugin-ssr/client/router";
import { FC, ReactNode } from "react";

const Link: FC<{
  href: string;
  className?: string;
  children: ReactNode;
}> = ({ href, className, children }) => {
  return (
      <li style={{listStyle: "none"}}>
        <a
          href={href}
          className={className}
          onClick={(e) => {
            e.preventDefault();
            navigate(href);
          }}
        >
          {children}
        </a>
      </li>
  );
};

export default Link;
