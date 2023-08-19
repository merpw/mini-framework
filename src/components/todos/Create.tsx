import { FC, useEffect, useState } from "react";
import { todoActions } from "#/store/todos.ts";
import { useAppDispatch } from "#/store/hooks.ts";

const FunnyPlaceholders = [
  "Buy milk",
  "Call mom",
  "Walk the dog",
  "Do the laundry",
  "Take out the trash",
  "Do the dishes",
  "Buy groceries",
  "Pay bills",
  "Clean the house",
  "Wash the car",
  "Get a haircut",
  "Get a job",
  "Go to the gym",
  "Learn to code",
  "Write a best-selling novel",
  "Become a millionaire",
  "Travel the world",
  "Invent something useful",
  "Run for president",
  "Marry a celebrity",
  "Adopt a unicorn",
  "Climb Mount Everest",
  "Win the lottery",
  "Save the planet",
  "Learn to fly",
  "Build a house",
  "Plant a tree",
  "Start a band",
  "Learn to dance",
  "Learn to sing",
  "Learn to play the guitar",
  "Start a business",
  "Learn to play the piano",
  "Learn to play chess",
  "Sleep",
  "Learn to code in Rust",
  "Pet a cat",
  "Pet a dog",
  "Pet a fish",
];

const randomPlaceholder = (): string =>
  FunnyPlaceholders[Math.floor(Math.random() * FunnyPlaceholders.length)];

const Create: FC = () => {
  const dispatch = useAppDispatch();

  const [placeholder, setPlaceholder] = useState("");

  const setRandomPlaceholder = () => {
    setPlaceholder(`e.g. ${randomPlaceholder()}`);
  };

  useEffect(() => {
    setRandomPlaceholder();
  }, []);

  return (
    <header className={"header mt-5 mx-auto py-10 bg-base-300 rounded"}>
      <h1 className={"text-8xl mb-10 text-center"}>todos</h1>
      <div className={"flex mr-10 ml-3"}>
        <label
          className={"toggle-all flex items-center mr-3"}
          onClick={() => dispatch(todoActions.toggleAll())}
          title={"Toggle all"}
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
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </label>
        <form
          className={"grow"}
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget[0] as HTMLInputElement;
            dispatch(todoActions.addTodo(input.value));
            input.value = "";
            setRandomPlaceholder();
          }}
        >
          <input
            className={"new-todo input input-lg w-full"}
            autoFocus={true}
            autoComplete={"off"}
            placeholder={placeholder}
          />
        </form>
      </div>
    </header>
  );
};

export default Create;
