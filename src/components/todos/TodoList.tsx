import { FC, useState } from "react";
import { Todo, todoActions } from "#/store/todos";
import { useAppDispatch } from "#/store/hooks.ts";

const TodoList: FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <section className={"main my-3"}>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

const Todo: FC<{ todo: Todo }> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const toggleTodo = () => {
    dispatch(todoActions.toggleTodo(todo.id));
  };

  const removeTodo = () => {
    dispatch(todoActions.removeTodo(todo.id));
  };

  return (
    <div
      className={
        "text-xl flex items-center gap-5 p-3 my-2 bg-base-300 rounded group" +
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
        <EditTodo todo={todo} onClose={() => setIsEditing(false)} />
      ) : (
        <label
          className={`max-w-[600px] ${
            todo.isCompleted ? "line-through decoration-1" : ""
          } break-all`}
          onDoubleClick={(e) => {
            e.preventDefault();
            setIsEditing(true);
          }}
        >
          {todo.text}
        </label>
      )}
      <button
        style={{ marginLeft: "auto" }}
        className={`destroy tab tab-lg invisible group-hover:visible`}
        onClick={removeTodo}
        title={"Remove todo"}
      >
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

const EditTodo: FC<{ todo: Todo; onClose?: () => void }> = ({
  todo,
  onClose,
}) => {
  const [editedText, setEditedText] = useState(todo.text);

  const dispatch = useAppDispatch();

  const saveEditing = () => {
    if (!editedText) {
      dispatch(todoActions.removeTodo(todo.id));
    }
    dispatch(
      todoActions.editTodo({
        id: todo.id,
        text: editedText,
      })
    );
    onClose?.();
  };

  return (
    <input
      type="text"
      className={
        "input input-ghost w-[80%] bg-base-300 text-xl border-none p-0"
      }
      value={editedText}
      onChange={(e) => setEditedText(e.target.value)}
      onBlur={saveEditing}
      onKeyDown={(e) => {
        if (e.key === "Tab" || e.key === "Enter" || e.key === "Escape") {
          e.preventDefault();
          saveEditing();
        }
      }}
      autoFocus
    />
  );
};

export default TodoList;
