# jsx-htmx

## Why?

Simply put, I needed an htmx JSX library that did not (1) globally override the JSX namespace and (2) did not use `///` require anywhere.  
Both those meant that your whole project would be subject to those imports.  
Where all I wanted was to be able to import a library and reference with jsx to get type same html/htmx AND be able to still use React/React.email elsewhere - while still being fully typesafe.

[![npm](https://img.shields.io/npm/v/jsx-htmx?style=flat-square)](https://www.npmjs.com/package/jsx-htmx)  
[![asciicast](https://asciinema.org/a/598553.svg)](https://asciinema.org/a/598553) (example from original design by Desdaemon - typed-htmx)

Definitions for htmx+html attributes in JSX.

## Usage

You can configure `jsx-htmx` either as pure type declarations, or as a JSX
templating engine.

### As type declarations

Configure your `tsconfig.json` as follows:

```jsonc
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "node"
  }
}
```

This library was designed for use with commonjs.

#### Importing/using this:

Either by defining it globally in your tsconfig file:

```jsonc
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "node16",
    "jsxImportSource": "jsx-htmx"
  }
}
```

OR Directly in the tsx/jsx files:

```jsx
/** @jsxImportSource jsx-htmx */

function MyComponent({ children }) {
  return <div hx-get="/asd">{children}</div>;
  //          ^?: string | undefined
}
```

## Component Creation

There are 2 types to make things easier:  
`CustomComponent` and `SimpleCustomComponent`.

The difference is the CustomComponent contains a type property which you can extend for default props you want to always passthrough instead of re-declaring them.

EG: `SimpleCustomComponent`

```ts  
const Badge: SimpleCustomComponent = (props) => {
  return <div class="component">{props.children}</div>;
};
```

EG: `CustomComponent`

```ts  
type MyParams = {
  userName: string;
};
type MyComponentType<Props = null> = CustomComponent<MyParams, Props>;
type MyComponentTypeUser<Props = null> = CustomComponent<
  MyParams & { id: string },
  Props
>;

const Badge: MyComponentType = (props) => {
  return <div class="component">{props.userName}</div>;
};

const Badge2: MyComponentType<{ id: string }> = (props) => {
  return (
    <div class="component2">
      {props.userName} - {props.id}
    </div>
  );
};

const Badge3: MyComponentTypeUser = (props) => {
  return (
    <div class="component2">
      {props.userName} - {props.id}
    </div>
  );
};

const Content: SimpleCustomComponent = (props) => {
  return (
    <div class="component">
      <MyComponentType userName="USER" id={"id"} />
    </div>
  );
};
```

# Original sources/attributions:

[typed-htmx](https://github.com/Desdaemon/typed-htmx)  
[typed-html](https://github.com/nicojs/typed-html)
