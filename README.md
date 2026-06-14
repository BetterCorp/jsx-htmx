# jsx-htmx

Type-safe HTML and HTMX v4 templates using TypeScript.

This branch tracks the `htmx.org@next` line, currently `4.0.0-beta2`.

## Why

I wanted an htmx-focused JSX library that:

- does not globally replace the JSX namespace
- does not rely on triple-slash references
- can coexist with React or other JSX runtimes in the same repo
- keeps htmx attributes and events typed

## Scope

`jsx-htmx` can be used in two ways:

- as JSX typings only
- as a small JSX-to-HTML templating runtime

This package does not bundle `htmx` itself. Install `htmx.org@next` separately when you need the browser runtime.

Any htmx attribute name that contains `:` must be written through a spread object in JSX:

```tsx
<button {...{ "hx-status:422": "target:#errors" }} />
```

Use direct JSX props only for names that are valid JSX identifiers, such as `hx-get`, `hx-post`, or the WebSocket alias props `hx-ws-connect` / `hx-ws-send`.

## Install

```bash
npm install jsx-htmx htmx.org@next
```

## Type Setup

`tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "node16",
    "jsxImportSource": "jsx-htmx"
  }
}
```

Or per file:

```tsx
/** @jsxImportSource jsx-htmx */

export function Example() {
  return <button hx-get="/messages">Load</button>;
}
```

## Runtime Helpers

The runtime exports:

- **`createElement`** — the JSX factory. You rarely call it directly; it backs the `jsx-htmx` runtime.
- **`html`** — a tagged template that interpolates values into escaped HTML. Object values for `hx-config`/`hx-vals`/`hx-headers` are serialized to JSON. Pass a `RawText` (e.g. from `css`/`js`) to opt out of escaping.
- **`css`** — author CSS as a string (passthrough) or as a typed object of rules, returned as `RawText` for embedding in a `<style>` tag. See [Inline `css`](#inline-css).
- **`js`** — embed client JavaScript as a string, or as a function whose **body is extracted** so your editor type-checks it, returned as `RawText` for a `<script>` tag. See [Inline `js`](#inline-js).
- **`jsxConfig`** — runtime config: `jsonAttributes` (attribute names serialized to JSON), `trusted` (skip sanitization), and `sanitize` (a custom sanitizer).

Everything returned by `css` and `js` is a `RawText` instance, so it is emitted verbatim and never double-escaped when placed inside JSX children.

`hx-config`, `hx-vals`, and `hx-headers` support object literals and are serialized to JSON automatically. Their `data-hx-*` forms are supported too.

## HTMX v4 Support

This branch tracks **htmx v4 beta 4** semantics, including:

- `hx-action` + `hx-method`
- `hx-config`
- `hx-ignore` and the reassigned `hx-disable`
- explicit inheritance modifiers like `:inherited` and `:append`
- status-code rules via `hx-status:*`
- the `outerSync` swap style
- `hx-on` extended form (`hx-on="event -> code"`) alongside `hx-on:event`
- `hx-trigger` modifiers minus the removed `queue:*` (use `hx-sync`), plus `intersect` `root`/`rootMargin`/`threshold`
- `hx-history-elt` (restored from htmx 2)
- the reactive `hx-live` extension attribute and the `htmx.live` API
- the `hx-csp` extension (renamed from `hx-nonce`) and its `hx-nonce` attribute
- typed v4 DOM events like `htmx:config:request`, `htmx:before:request`, `htmx:response:error`, `htmx:error`
- SSE attributes `hx-sse:connect` and `hx-sse:close`
- WebSocket attributes `hx-ws:connect` and `hx-ws:send`
- JSX-friendly WebSocket aliases `hx-ws-connect` and `hx-ws-send`
- a typed `htmx` global (and `window.htmx`) matching htmx 4's slimmed JS API (`registerExtension`, `timeout`, …)

## Examples

### `hx-action` and `hx-method`

```tsx
/** @jsxImportSource jsx-htmx */

export function SaveButton() {
  return (
    <button hx-method="POST" hx-action="/messages">
      Save
    </button>
  );
}
```

### Explicit inheritance

```tsx
/** @jsxImportSource jsx-htmx */

export function Toolbar() {
  return (
    <section
      {...{
        "hx-target:inherited": "#panel",
        "hx-headers:inherited": { "X-CSRF": "token" },
      }}
    >
      <button hx-get="/inbox">Inbox</button>
      <button hx-get="/archive">Archive</button>
    </section>
  );
}
```

### `hx-status:*`

```tsx
/** @jsxImportSource jsx-htmx */

export function SignupForm() {
  return (
    <>
      <form
        hx-post="/signup"
        hx-target="#result"
        {...{
          "hx-status:422": "target:#errors",
          "hx-status:500": "target:#server-error",
        }}
      >
        <input name="email" type="email" />
        <button type="submit">Sign up</button>
      </form>
      <div id="errors" />
      <div id="result" />
      <div id="server-error" />
    </>
  );
}
```

### `hx-config`, `hx-vals`, `hx-headers`

```tsx
/** @jsxImportSource jsx-htmx */

export function ConfiguredRequest() {
  return (
    <button
      hx-post="/api/messages"
      hx-config={{ timeout: 5000, validate: false }}
      hx-vals={{ page: 2, draft: true }}
      hx-headers={{ "X-Feature": "inbox" }}
    >
      Send
    </button>
  );
}
```

### Inline `css`

`css` returns `RawText`, so it drops straight into a `<style>` element without escaping. Pass a plain string for passthrough, or an object of rules for a typed, autocompleted authoring experience.

Object form: top-level keys are selectors, declaration keys are camelCased CSS properties (kebab-cased on output), nested objects become nested selectors (`&` is interpolated with the parent selector, otherwise it nests as a descendant), at-rules like `@media` wrap their block, and array values expand to repeated declarations (handy for fallbacks).

```tsx
/** @jsxImportSource jsx-htmx */
import { css } from "jsx-htmx";

export function Styles() {
  return (
    <style>
      {css({
        ".card": {
          display: "grid",
          gap: "0.5rem",
          // fallback stack: emits two `color:` declarations in order
          color: ["rgb(0 0 0)", "color-mix(in oklab, black 80%, transparent)"],
          // nested descendant selector → `.card .title`
          ".title": { fontWeight: 600 },
          // `&` interpolates the parent → `.card:hover`
          "&:hover": { transform: "translateY(-2px)" },
        },
        "@media (min-width: 40rem)": {
          ".card": { gridTemplateColumns: "1fr 1fr" },
        },
      })}
    </style>
  );
}
```

To pass through a raw string unchanged:

```tsx
<style>{css(".btn { cursor: pointer; }")}</style>
```

### Inline `js`

`js` returns `RawText` for embedding in a `<script>` tag. Pass a string, or a **function whose body is extracted** — the function is never called at render time; its source is sliced out so your editor still type-checks and lints the client code.

```tsx
/** @jsxImportSource jsx-htmx */
import { js } from "jsx-htmx";

export function Bootstrap() {
  return (
    <script>
      {js(() => {
        htmx.config.implicitInheritance = false;

        htmx.on("htmx:response:error", (event) => {
          console.warn("request failed", event);
        });
      })}
    </script>
  );
}
```

Both the function body form and an arrow expression are supported, and a plain string passes through unchanged:

```tsx
<script>{js("console.log('ready')")}</script>
```

> The extracted source is emitted as written — it is **not** transpiled or bundled. Keep it to browser-ready JavaScript and avoid closing over server-side variables (interpolate values explicitly instead).

### Typed htmx DOM events

```ts
document.body.addEventListener("htmx:config:request", (event) => {
  event.detail.ctx.request.headers = {
    ...event.detail.ctx.request.headers,
    Authorization: "Bearer token",
  };
});

document.body.addEventListener("htmx:error", (event) => {
  console.error(event.detail.ctx.status, event.detail.error);
});
```

### Extending `window` in user scripts

`jsx-htmx` now types both the global `htmx` variable and `window.htmx` by default for user scripts.

Use TypeScript declaration merging only for your own extra globals, then assign the value at runtime inside `js(() => { ... })`.

```ts
// globals.d.ts
export {};

declare global {
  interface Window {
    myApp: {
      csrfToken: string;
    };
  }

  interface WindowEventMap {
    "app:ready": CustomEvent<{ userId: string }>;
  }
}
```

```tsx
/** @jsxImportSource jsx-htmx */
import { js } from "jsx-htmx";

export function GlobalsExample() {
  return (
    <script>
      {js(() => {
        window.myApp = { csrfToken: "abc123" };

        window.addEventListener("app:ready", (event) => {
          console.log(event.detail.userId, window.myApp.csrfToken);
        });

        htmx.on("htmx:load", () => {
          console.log("htmx loaded");
        });
      })}
    </script>
  );
}
```

The built-in `htmx` / `window.htmx` types only teach TypeScript about the global API. You still need to load the real browser script at runtime.

### SSE

```tsx
/** @jsxImportSource jsx-htmx */

export function Notifications() {
  return (
    <div
      hx-swap="beforeend"
      {...{
        "hx-sse:connect": "/notifications",
        "hx-sse:close": "done",
      }}
    >
      Waiting...
    </div>
  );
}
```

### WebSockets

```tsx
/** @jsxImportSource jsx-htmx */

export function Chat() {
  return (
    <div {...{ "hx-ws:connect": "/chat" }}>
      <div id="messages" hx-target="this" hx-swap="beforeend" />
      <form {...{ "hx-ws:send": true }}>
        <input name="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

## Notes For HTMX 2 Users

This is a breaking-major track.

Notable htmx v4 changes outside this package:

- requests use `fetch()` rather than `XMLHttpRequest`
- inheritance is explicit by default
- error responses swap by default unless disabled (only `204`/`304` skip the swap)
- `hx-ext`, `hx-request`, `hx-history`, `hx-params`, `hx-prompt`, and `hx-vars` are removed (`hx-history-elt` was restored in beta 3)
- `hx-ignore` replaces the old "disable htmx processing" meaning of `hx-disable`
- the `hx-trigger` `queue:*` modifier is gone — use `hx-sync`
- `hx-on:event` dot-modifiers (`.prevent`, `.stop`, …) are gone — use the `hx-on="event mods -> code"` extended form
- the JS API was slimmed: DOM helpers (`addClass`/`closest`/`off`/…) were dropped for native equivalents, and `defineExtension` became `registerExtension`
- `HX-Source` / `HX-Target` replace the old trigger-centric header model, and htmx 4 now includes element names in those identifiers when present

If you still need the v2 surface, stay on the v2 branch / release line.

## Source Of Truth

This package’s v4 typings were aligned against:

- `htmx.org@next` package contents, especially `dist/htmx.d.ts`
- shipped extension source in `dist/ext/*`
- official htmx v4 docs and migration guide

When docs and shipped beta source disagree, this package prefers the shipped `htmx.org@next` behavior.
