# mini-framework

---

## [Task description and audit questions](https://github.com/01-edu/public/tree/master/subjects/mini-framework)

---

Authors: [@maximihajlov](https://github.com/maximihajlov),
[@nattikim](https://github.com/nattikim),
[@bomanviktor](https://github.com/bomanviktor),
[@teetorandre](https://github.com/FinnTune)

Mini Next.js-like React framework with server-side rendering.

Powered by:

- [React](https://reactjs.org/) as a UI component library
- [Vite](https://vitejs.dev/) as a build tool and bundler
- [Vite plugin SSR](https://vite-plugin-ssr.com/) for server-side rendering and filesystem-based routing

## Documentation:

- [Introduction](#introduction)
- [Example project: todoMVC](#example-project-todomvc)
- [How does the framework work?](#how-does-the-framework-work)
- [Components](#components)
- [Routing](#routing)
- [Deployment](#deployment)

### Introduction:

The Mini-Framework is a lightweight framework powered by React and Vite.

It is inspired by Next.js and provides all the
necessary tools to build a modern web application with server-side rendering.

It simplifies the process of creating web applications by abstracting common tasks such as DOM manipulation, state
management, routing, and event handling.

### Example project: todoMVC

### [Live demo](https://todo.mer.pw/)

A simple todoMVC application built with the framework which demonstrates the main features of the framework.

#### To run:

```bash
npm install
npm run build
vite preview
```

`npm install` - installs project dependencies

`npm run build`- builds the project into the `dist` directory

`npm run preview`- starts a local server

`npm run dev`- starts a fast-refresh [SWC](https://swc.rs)-powered development server

### How does the framework work?

The framework consists of two main parts:

```
src/
├── pages/
|   └── index.page.tsx
├── renderer/
│   └──_default.page.client.tsx
│   └──_default.page.server.tsx
│   └──_error.page.tsx
│   └──Link.tsx
│   └──types.ts
│   └──usePageContext.ts
```

- `/pages` - filesystem-based [router](#routing), place to define your pages

- `/renderer` - framework's core functionality, including all the necessary components and hooks for server-side
  rendering

  - `_default.page.client.tsx` - default client-side page component, your page will be wrapped with this component
    automatically on the client-side
  - `_default.page.server.tsx` - default server-side page component, This wraps the whole application in `<html>` and
    `<body>` tags and provides the necessary context for server-side rendering
  - `_error.page.tsx` - error page component will be rendered when an error occurs (on both client and server)
  - `Link.tsx` - [`<Link />` component](#link-component) for client-side navigation
  - `types.ts` - framework's TypeScript types
  - `usePageContext.ts` - hook to access the page context (e.g. `usePageContext().url`)

When building the project, the framework will automatically generate a client-side bundle for each page and a
server-side bundle for the whole application.
The pre-rendering is enabled by default, so for each page, the framework will generate a static HTML file.

### Components

The framework is powered by React virtual DOM and provides the industry-standard way of building UI components:

```tsx
const Component = () => {
  const [state, setState] = useState(0);

  return (
    <button
      onClick={() => setState((prev) => prev + 1)}
      style={{ color: state % 2 === 0 ? "red" : "blue" }}
    >
      Hello <strong>World!</strong>
    </button>
  );
};
```

To create an element, we use the JSX syntax, which will be compiled to the virtual DOM.
We can define the element's attributes and styles using the standard HTML syntax.
We can nest elements inside each other, and we can use any valid JavaScript expression inside the curly braces.

State management is done using React built-in hooks like `useState` and `useEffect`.
We can call event handlers using the `onEvent` like `onClick` or `onChange`.
Check out the [React documentation](https://react.dev/learn) for more details.

The example above will be compiled to something like this (simplified):

```html
<button style="color: red">Hello <strong>World!</strong></button>

<script>
  const count = 0;
  button.addEventListener("click", () => {
    button.style.color = count % 2 === 0 ? "red" : "blue";
    render(); // simplified, this will re-render the component
  });
</script>
```

As the framework is powered by React, we can use any component libraries and tools from the React ecosystem,
like [Redux](https://redux.js.org/), [React hook form](https://react-hook-form.com/) or [Material UI](https://mui.com/).

### Routing

Like in Next.js, the framework uses filesystem-based routing.
This means that each route is a file or a set of files in the `pages` directory.
The routing engine is based on the [Vite plugin SSR](https://vite-plugin-ssr.com/).

For example, to define an index page, we should create a file called `index.page.tsx` in the `pages` directory and
export a component named `Page` from it:

```tsx
// pages/index.page.tsx
export const Page = () => {
  return <h1>Hello World!</h1>;
};
```

The framework will automatically generate a route for this page, and the page will be accessible at `/`.

#### Link component

By default, when using `<a href="/some-page">`, the browser will make a full page reload.
It's named multiple-page approach, and sometimes it can be annoying, as it creates many unnecessary requests to the
server and makes the page load less smooth.

For this reason, the framework supports a single-page approach, which updates only the necessary parts of the page.
To do so we should use `<Link />` component instead of `<a />`:

```tsx
import Link from "#/renderer/Link";

export const Page = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/some-page">Some page</Link>
    </nav>
  );
};
```

This will smoothly navigate to the corresponding page without reloading the page.

### Deployment:

After creating all the necessary components, we can build the project using `npm run build` command.
This will generate a production-ready bundle in the `dist`, which contains two folders:

```
dist/
├── client/
├── server/
```

By default, a pre-rendering is enabled, so the `client` folder contain all the defined pages and can be deployed to any
static hosting like GitHub Pages or Cloudflare Pages.

For more complex logic that requires runtime server-side rendering, we need a Node.js server.

To run the server, we can use the `npm run preview` command.
