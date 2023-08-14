import { combineReducers, configureStore, Dispatch } from "@reduxjs/toolkit";
import todosReducer from "./todos";
import persistReducer from "#/store/persist/reducer.ts";
import persistMiddleware from "#/store/persist/middleware.ts";

const persistConfig = {
  key: "root",
};

const rootReducer = combineReducers({
  todos: todosReducer,
});

const persistedReducer = persistReducer(rootReducer, persistConfig);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware) as never, // TODO: remove never when RTK 2.0 is released
});

export type RootState = ReturnType<typeof persistedReducer>;

export type AppDispatch = Dispatch;
