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

- `createElement`
- `html`
- `css`
- `js`
- `jsxConfig`

`hx-config`, `hx-vals`, and `hx-headers` support object literals and are serialized to JSON automatically. Their `data-hx-*` forms are supported too.

## HTMX v4 Support

This branch targets htmx v4 semantics, including:

- `hx-action` + `hx-method`
- `hx-config`
- `hx-ignore` and the reassigned `hx-disable`
- explicit inheritance modifiers like `:inherited` and `:append`
- status-code rules via `hx-status:*`
- typed v4 DOM events like `htmx:config:request`, `htmx:before:request`, `htmx:error`
- SSE attributes `hx-sse:connect` and `hx-sse:close`
- WebSocket attributes `hx-ws:connect` and `hx-ws:send`
- JSX-friendly WebSocket aliases `hx-ws-connect` and `hx-ws-send`

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
- error responses swap by default unless disabled
- `hx-ext`, `hx-request`, `hx-history`, `hx-history-elt`, `hx-params`, `hx-prompt`, and `hx-vars` are removed
- `hx-ignore` replaces the old "disable htmx processing" meaning of `hx-disable`
- `HX-Source` / `HX-Target` replace the old trigger-centric header model, and htmx 4 now includes element names in those identifiers when present

If you still need the v2 surface, stay on the v2 branch / release line.

## Source Of Truth

This package’s v4 typings were aligned against:

- `htmx.org@next` package contents, especially `dist/htmx.d.ts`
- shipped extension source in `dist/ext/*`
- official htmx v4 docs and migration guide

When docs and shipped beta source disagree, this package prefers the shipped `htmx.org@next` behavior.
