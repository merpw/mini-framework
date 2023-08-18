import React, { FC, useState } from "react";
import { Todo, todoActions } from "#/store/todos";
import { useAppDispatch } from "#/store/hooks.ts";

const TodoList: FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <section className={"main mt-5"}>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}

    </section>
  );
};

const Todo: FC<{ todo: Todo }> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [isHovered, setIsHovered] = useState(false);

  const toggleTodo = () => {
    dispatch(todoActions.toggleTodo(todo.id));
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const removeTodo = () => {
    dispatch(todoActions.removeTodo(todo.id));
  };

  return (
      <div
          onMouseOver={handleMouseEnter}
          onMouseOut={handleMouseLeave}
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
                onKeyDown={(e) => {
                  if (e.key === "Tab" || e.key === "Enter" || e.key === "Escape") {
                    e.preventDefault();
                    saveEditing();
                  }
                }}
                autoFocus
            />
        ) : (
            <label
                className={`max-w-[600px] ${
                    todo.isCompleted ? "line-through decoration-1" : ""
                } break-all`}
                onDoubleClick={handleDoubleClick}
            >
              {todo.text}
            </label>
        )}
            <button
                style={{marginLeft: "auto"}}
                className={`destroy tab tab-lg ${isHovered ? "visible" : "invisible"}`}
                onClick={removeTodo}
            >
              X
            </button>
      </div>
  );
};

export default TodoList;
