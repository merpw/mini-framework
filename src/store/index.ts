import { combineReducers, configureStore, Dispatch } from "@reduxjs/toolkit";
import todosReducer from "./todos";

const rootReducer = combineReducers({
  todos: todosReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = Dispatch;
