import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  id: number;
  text: string;
  isCompleted: boolean;
};

const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleAll: (state) => {
      const allCompleted = state.find((todo) => !todo.isCompleted)
      state.forEach((todo) => {
        todo.isCompleted = allCompleted !== undefined
      })

    },
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        isCompleted: false,
      };
      state.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    editTodo: (state, action: PayloadAction<{ id: number, text: string }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },

  },

});

export const todoActions = todosSlice.actions;

export default todosSlice.reducer;
