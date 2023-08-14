import { FC, ReactNode, useEffect } from "react";
import { useAppDispatch } from "#/store/hooks.ts";
import { loadStateAction } from "#/store/persist/reducer.ts";

const PersistGate: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadStateAction());
  }, [dispatch]);

  return <>{children}</>;
};

export default PersistGate;
