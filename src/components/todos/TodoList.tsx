import React, { FC, useState } from "react";
import { Todo, todoActions } from "#/store/todos";
import { useAppDispatch } from "#/store/hooks.ts";

const TodoList: FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <div className={"mt-5"}>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}

    </div>
  );
};

const Todo: FC<{ todo: Todo }> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const toggleTodo = () => {
    dispatch(todoActions.toggleTodo(todo.id));
  };

  const deleteTodo = () => {
    dispatch(todoActions.deleteTodo(todo.id));
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const saveEditing = () => {
    dispatch(todoActions.editTodo({
      id: todo.id,
      text: editedText,
    }));
    setIsEditing(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(event.target.value);
  };

  return (
      <div
          className={
              "text-xl flex items-center gap-5 p-3 my-2 bg-base-300 rounded" +
              " " +
              (todo.isCompleted ? "opacity-40" : "")
          }
      >
        <button
            className={"rounded bg-base-100 w-6 h-6"}
            onClick={() => toggleTodo()}
        >
          {todo.isCompleted ? (
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
          ) : null}
        </button>
        {isEditing ? (
            <input
                type="text"
                value={editedText}
                onChange={handleTextChange}
                onBlur={saveEditing}
                autoFocus
            />
        ) : (
            <p
                className={todo.isCompleted ? "line-through decoration-1" : ""}
                onDoubleClick={handleDoubleClick}
            >
              {todo.text}
            </p>
        )}
        <button style={{ marginLeft: "auto" }} onClick={deleteTodo}>X</button>
      </div>
  );
};

export default TodoList;
