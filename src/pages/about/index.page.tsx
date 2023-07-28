import { DocumentProps } from "#/renderer/types.ts";

export const Page = () => {
  return (
    <div>
      <h1 className={"text-xl"}>About</h1>
    </div>
  );
};

export const documentProps: DocumentProps = {
  // This title and description will override the defaults
  title: "About",
};
