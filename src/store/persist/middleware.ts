import { Middleware } from "redux";
import { saveStateAction } from "#/store/persist/reducer.ts";

// save state to local storage

const persistMiddleware: Middleware = (store) => (next) => (action) => {
  if (!action.type.startsWith("persist/")) {
    next(action);
    return next(store.dispatch(saveStateAction()));
  }
  return next(action);
};

export default persistMiddleware;
