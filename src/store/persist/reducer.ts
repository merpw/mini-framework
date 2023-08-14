import { Action, Reducer } from "redux";
import { createAction } from "@reduxjs/toolkit";

type PersistConfig = {
  key: string;
};

type PersistState = {
  persist: {
    hydrated: boolean;
  };
};

const persistReducer = <S, A extends Action = Action>(
  baseReducer: Reducer<S, A>,
  config: PersistConfig
): Reducer<S & PersistState, A> => {
  return (state, action) => {
    if (loadStateAction.match(action)) {
      return {
        ...(loadState(config) || state),
        persist: {
          hydrated: true,
        },
      };
    }
    if (saveStateAction.match(action)) {
      saveState(state as never, config);
      return state;
    }

    const persist = state?.persist || { hydrated: false };

    const cleanState = { ...state };
    delete cleanState.persist;

    return {
      persist,
      ...baseReducer(cleanState as S, action),
    };
  };
};

const loadState = ({ key }: PersistConfig) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const saveState = (state: never, { key }: PersistConfig) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.log(error);
  }
};

export const loadStateAction = createAction("persist/loadState");

export const saveStateAction = createAction("persist/saveState");

export default persistReducer;
