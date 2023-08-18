# mini-framework

---

## [Task description and audit questions](https://github.com/01-edu/public/tree/master/subjects/mini-framework)

---

Authors:  [@maximihajlov](https://github.com/maximihajlov),
[@nattikim](https://github.com/nattikim),
[@bomanviktor](https://github.com/bomanviktor),
[@teetorandre](https://github.com/FinnTune)

Mini Next.js-like React framework with server-side rendering.

Powered by:

- [React](https://reactjs.org/) as a UI component library
- [Vite](https://vitejs.dev/) as a build tool and bundler
- [Vite plugin SSR](https://vite-plugin-ssr.com/) for server-side rendering and filesystem-based routing

[//]: # "TODO: add docs"

## Documentation:

- [Introduction](#introduction)
- [To Run](#to-run)
- [Project structure](#project-structure)
- [Routing](#routing)
- [State Management](#state-management)
- [Abstracting the DOM and Events](#abstracting-the-dom-and-events)
- [Deployment](#deployment)


### Introduction:
The Mini-Framework is a lightweight framework built using React, Redux, and Vite. It simplifies the process of creating web applications by abstracting common tasks such as DOM manipulation, state management, routing, and event handling.


### To Run:
```bash
npm install
npm run build
vite preview
```

`npm install`: command used in Node.js environments with the Node Package Manager (npm) to install dependencies specified in a package.json file\

`npm run build`: run the build script that is defined in the scripts section of the package.json file of a Node.js project. This script typically contains commands to compile, bundle, or transform source code into a production-ready format.

`vite preview`: starts a local server that serves the built project from the dist directory. The server will watch source files and reload the browser on changes.


### Project Structure:

```
src/
├── components/
│   └── todos/
│       └──Create.tsx
│       └──Filters.tsx
│       └──ToDoList.tsx
├── hooks/
│   └──tabs.ts
├── layouts/
│   └──Layout.tsx
├── pages/
│   └──catch-all.page.route.ts
│   └──catch-all.page.server.tsx
    └──catch-all.page.tsx
├── renderer/
│   └──_default.page.client.tsx
│   └──_default.page.server.tsx
│   └──_error.page.tsx
│   └──Links.tsx
│   └──types.ts
│   └──usePageContext.ts
└── store/
    └──globals.css
    └──vite-env.d.ts
```

### Routing:

The Link component and Tabs usage suggest a custom routing mechanism. This mechanism likely synchronizes the application's state with the URL, allowing users to navigate between different views.

#### Usage:

```tsx
 <Link
    key={tab.href}
    href={tab.href}
    className={`tab tab-lg tab-bordered ${
        tab === activeTab ? "tab-active" : ""
    }`}
>
    {tab.name}
</Link>
```

For this demo we use tabs in order to allow users to switch between different views or sub-pages. The Tabs component provides an array of tab objects, each having a name (the visible label) and a href (the link to the corresponding view).

```tsx
const Tabs: Tab[] = [
    { name: "All", href: "/" },
    { name: "Active", href: "/active" },
    { name: "Completed", href: "/completed" },
];
```

### State Management:

Redux, in combination with React's context API, manages the application's state. The Provider component wraps the entire app, ensuring that the Redux store is accessible throughout the application.

Example:

Here's the store's initial state and the reducers that handle the state changes can be used anywhere in the application to update the state, in this case, the todo list.

```tsx
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
        removeTodoCompleted: (state) => {
            return state.filter((todo) => !todo.isCompleted);
        },
    },
});
```

### Abstracting the DOM and Events:

The framework utilizes React's virtual DOM to handle UI updates efficiently. The virtual DOM allows the framework to make minimal updates to the actual DOM by comparing the current and previous states.
The framework uses React's built-in event handling mechanism. This provides a consistent and efficient way to manage user interactions, such as clicks, input changes, and form submissions.

Example of layout abstraction and nested components:
```tsx
const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate>
                    <Create />
                    {children}
                    <TodoFooter />
            </PersistGate>
        </Provider>
    );
};
```

`TodoFooter` component inside the `Layout` component:

```tsx
const TodoFooter: FC = () => {
    const todoCount = useAppSelector(state =>
        state.todos.length
    );
    return(
        <>
        {todoCount === 0 ? null :
            <footer className={"bg-base-200 p-3 grid grid-cols-3 place-items-center"}>
                <TodoCount />
                <SelectTab />
                <ClearCompleted />
            </footer>}
        </>
    )
}
```

Here's one single `ClearCompleted` component with added attributes, and event handling.

```tsx
const ClearCompleted: FC = () => {
    const dispatch = useAppDispatch();
    const hasCompleted = useAppSelector(state =>
        state.todos.find((todo) => todo.isCompleted) !== undefined
    );
    return (
        <>
            {hasCompleted ? (
                <button
                    className={`clear-completed tab tab-lg tab-bordered justify-self-end`}
                    onClick={() => dispatch(todoActions.removeTodoCompleted())}
                >
                    Clear completed
                </button>
            ) : null}
        </>
    )
}
```


### Deployment:
You have to create your own `index.html` & `globals.css` files for this framework, and declare a div element with `id = root`:
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My DOM</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```




