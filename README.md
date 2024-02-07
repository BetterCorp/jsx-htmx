# jsx-htmx

## !!!  
Not ready for use












[![npm](https://img.shields.io/npm/v/typed-htmx?style=flat-square)](https://www.npmjs.com/package/typed-htmx)
[![docs](https://github.com/Desdaemon/typed-htmx/actions/workflows/docs.yml/badge.svg)](https://github.com/Desdaemon/typed-htmx/actions/workflows/docs.yml)
[![tests](https://github.com/Desdaemon/typed-htmx/actions/workflows/test.yml/badge.svg)](https://github.com/Desdaemon/typed-htmx/actions/workflows/test.yml)

[![demo](static/demo.gif)](https://asciinema.org/a/598553)

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
    "moduleResolution": "node16"
  }
}
```

An alternative is to include the library directly in each file instead of globally importing it.  
completions for htmx attributes:

```jsx
/** @jsx createElement */
/** @jsxFrag Fragment */
/** @jsxImportSource jsx-htmx/src */
import { createElement } from "jsx-htmx/lib";
import { Fragment } from "jsx-htmx/lib/jsx-runtime";
import * as React from "jsx-htmx";

function MyComponent({ children }) {
  return <div hx-get="/asd">{children}</div>;
  //          ^?: string | undefined
}
```

If your frontend library injects its own JSX types, you'll need to augment it.
See the [example project](https://github.com/Desdaemon/typed-htmx/tree/main/example)
for a demo. typed-html and React are supported out of the box.

### As a JSX templating engine

If you prefer to use JSX only for its templating capabilities in the vein of
[typed-html], you can use `typed-htmx/typed-html` which is included with this
library and optimized for htmx usage:

- Attributes such as [`hx-vals`](https://htmx.org/attributes/hx-vals/) and
  [`hx-headers`](https://htmx.org/attributes/hx-headers/) may also accept an object
  literal, which will be stringified on demand.
- Configurable options for sanitization, defaults to a no-op.

Configure your `tsconfig.json` as follows:

```jsonc
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "jsx-htmx",
    "moduleResolution": "node16" // or "nodenext"
  }
}
```

# Source/Forked from  
[typed-htmx](https://github.com/Desdaemon/typed-htmx)  
[typed-html](https://github.com/nicojs/typed-html)