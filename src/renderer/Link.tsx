import { navigate } from "vite-plugin-ssr/client/router";
import { FC, ReactNode } from "react";

const Link: FC<{
  href: string;
  className?: string;
  children: ReactNode;
}> = ({ href, className, children }) => {
  return (
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
  );
};

export default Link;
