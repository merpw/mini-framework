import Link from "../renderer/Link.tsx";

export const Page = () => {
  return (
    <div>
      <h1 className={"text-2xl"}>Home page</h1>
      <Link href={"/about"}>About</Link>
    </div>
  );
};
