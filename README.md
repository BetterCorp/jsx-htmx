# jsx-htmx

[![npm](https://img.shields.io/npm/v/jsx-htmx?style=flat-square)](https://www.npmjs.com/package/jsx-htmx)
[![Release](https://github.com/BetterCorp/jsx-htmx/actions/workflows/release.yml/badge.svg)](https://github.com/BetterCorp/jsx-htmx/actions/workflows/release.yml)
[![Node.js](https://img.shields.io/node/v/jsx-htmx?style=flat-square)](https://www.npmjs.com/package/jsx-htmx)
[![license](https://img.shields.io/npm/l/jsx-htmx?style=flat-square)](https://www.npmjs.com/package/jsx-htmx)

Type-safe htmx 4 JSX with a tiny server-side HTML renderer.

**Upgrading to 4.0.100? This release includes breaking behavior changes. Read the
[upgrade checklist](#upgrading-to-40100) before updating.**

- Typed HTML, SVG, MathML Core, htmx attributes, extensions, events, and browser API
- A local JSX namespace that can coexist with React and other JSX runtimes
- Escaped interpolation by default
- No bundled browser runtime; `htmx.org` is an optional peer dependency

## Why jsx-htmx?

`htmx.org@4` ships TypeScript declarations for its browser API, but those declarations do not define JSX elements or `hx-*` props. `jsx-htmx` fills that authoring gap for server-rendered TSX.

| Capability | `htmx.org@4` types | `jsx-htmx` |
| --- | --- | --- |
| Browser runtime | Included | Not included |
| HTML in TSX | No JSX intrinsic elements or HTML props | Typed standard elements and attributes |
| htmx attributes | No TSX prop types | Typed v4 attributes, values, and `:` modifiers |
| Official extensions | No TSX prop or extension-event types | Typed bundled-extension attributes and events |
| JavaScript API | Typed core API and core events | Typed core API, globals, core events, and extension events |
| Server rendering | None | Tiny JSX-to-HTML renderer |
| Interpolation safety | Not applicable | Escaped by default; `raw()` is explicit |

Use `jsx-htmx` when TypeScript should check server-rendered TSX. Add `htmx.org@4` as well when the generated page needs htmx behavior in the browser; the packages complement each other.

## Install

Major and minor versions track the supported htmx release line. Patch versions
track jsx-htmx changes and can include breaking changes; check the release notes
when upgrading. Version `4.0.100` introduces scoped `js()` callbacks and corrected
component escaping while continuing to target htmx 4.0.

```bash
npm install jsx-htmx
```

Add htmx itself when the generated HTML will use it in the browser:

```bash
npm install htmx.org@4
```

## Upgrading to 4.0.100

This release targets **htmx 4.0**. Its larger patch number identifies a substantial
jsx-htmx update; it does not indicate a new htmx major/minor version. Existing
dependency ranges such as `^4.0.0` can select this release, so review these changes
even when your package manager presents it as a patch update.

| Change in 4.0.100 | What to check before upgrading |
| --- | --- |
| `js(function)` retains a function scope and invokes it in the browser; it previously extracted the body into script scope. | Check globals and functions referenced by other scripts or inline handlers. Assign shared state/handlers explicitly to `window` and declare their TypeScript types. Local `const`, `let`, and `var` are fresh on each execution. String inputs remain verbatim. |
| Repeated htmx script execution gets fresh locals. | Swap the same fragment at least twice. Check for duplicate document/window listeners, timers, and other side effects: function scope prevents declaration conflicts but does not perform cleanup. |
| Components receive original props/children, and returned plain strings are escaped. | Remove manual pre-escaping workarounds. Return JSX for markup; embed independently trusted HTML with `<>{raw(trustedHtml)}</>`. Check nested components, fragments, and text containing `<`, `&`, or quotes. |
| Boolean/null children are omitted, zero is retained, and `key` is not emitted. | Use `String(flag)` when boolean text is intentional. Replace selectors that relied on a rendered `key` with `id` or `data-*`. Check conditional rendering and snapshots. |
| `createElement` renders `props.children`; explicit variadic children take precedence. | Check direct factory calls that supply children in both places or previously relied on `props.children` being ignored. |
| JSX, `createElement` attributes, and `html` spreads share serialization. | Check htmx settings such as `hx-validate={false}`, history opt-outs, ARIA/data boolean values, and inherited JSON attributes. Presence flags such as `hx-ignore={false}` remain omitted. Update byte-for-byte markup snapshots for normalized JSON quoting and omitted metadata. |
| Explicit htmx bindings, SVG names, and CSS custom properties retain their required casing. | Check `hx-live:textContent`, `viewBox`, gradient/filter names, and references to custom properties such as `--brandColor`. Remove spelling workarounds added for the previous serializer. |
| Invalid dynamic element and attribute names now throw `TypeError`. | Check any names assembled at runtime; pass data as attribute values, not as fragments of markup in a name. |
| Built-in SVG, MathML Core, and additional HTML/event types are available. | Remove conflicting local JSX declaration augmentations or SVG shims. Run your TypeScript checks and inspect icons, forms, slots, and math rendering. |

After updating your lockfile, run your application's type checks and rendering
tests, then exercise repeated htmx swaps in the browser. See [Inline `js`](#inline-js)
and [Extending `window` in user scripts](#extending-window-in-user-scripts) for
scoping and shared-state examples. No new runtime dependencies were added.

## Quick start

Configure TypeScript:

```jsonc
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "jsx-htmx",
    "module": "Node16",
    "moduleResolution": "Node16"
  }
}
```

Then write a component. JSX values render to HTML with `.toString()`:

```tsx
/** @jsxImportSource jsx-htmx */

export function SaveButton() {
  return (
    <button hx-post="/messages" hx-vals={{ draft: true }}>
      Save
    </button>
  );
}

const markup = SaveButton().toString();
```

Object values for `hx-config`, `hx-vals`, and `hx-headers` are serialized to JSON automatically.

Function components receive their original props and children. Rendered text is
escaped once; return JSX for markup, using `raw()` inside JSX for explicitly trusted HTML.
Boolean and null children render nothing, while numeric zero is retained.

JSX, `createElement` attributes, and `html` template spreads share attribute
serialization, including JSON objects and inherited `hx-headers:inherited` /
`hx-vals:inherited` attributes. Boolean htmx settings such as `hx-validate={false}`
render as explicit `"false"` values; presence flags such as `hx-ignore={false}`
are omitted. JSX `key` metadata is not emitted into HTML.

### SVG and other elements

SVG shapes, text, gradients, masks, filters, and animations have element-specific
attributes. Use SVG's case-sensitive names (`viewBox`, `linearGradient`,
`preserveAspectRatio`). Presentation attributes accept both `strokeWidth` and
`stroke-width`; both render as `stroke-width`.

```tsx
<svg viewBox="0 0 24 24" width={24} height={24} role="img" aria-labelledby="icon-title">
  <title id="icon-title">Check</title>
  <path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
</svg>
```

Use `href` for SVG references, or `xlinkHref` / `"xlink:href"` for legacy assets.
SVG supports htmx, inline event handlers, `data-*`, and `aria-*` attributes too.
Unknown camelCase props and invalid enumerated values are rejected. TypeScript
allows unknown hyphenated JSX props; use `satisfies JSX.IntrinsicElements["path"]`
on a props object when checking their spelling matters.

HTML coverage includes `hgroup`, `search`, `selectedcontent`, named slots,
declarative shadow DOM, microdata, popovers, and global DOM events. Numeric HTML
attributes accept numbers as well as strings. MathML Core elements such as
`math`, `mfrac`, `mi`, `mo`, and `msup` are typed as well.

### Per-file setup

If you do not want a project-wide `jsxImportSource`, use the pragma shown above in each `.tsx` file.

### Attributes containing `:`

JSX requires colon-delimited htmx attributes to be passed with object spread syntax:

```tsx
<button {...{ "hx-status:422": "target:#errors" }} />
<div {...{ "hx-sse:connect": "/events" }} />
```

Direct props work for valid JSX names such as `hx-get`, `hx-post`, `hx-query`, `hx-ws-connect`, and `hx-ws-send`.

## Runtime helpers

| Export | Purpose |
| --- | --- |
| `createElement` | JSX factory used by the runtime |
| `html` | Escaping tagged-template helper |
| `css` | Typed CSS object or raw CSS string |
| `js` | Browser-ready JavaScript string or function invoked in its own scope |
| `raw` | Explicitly trusted HTML escape hatch |
| `jsxConfig` | JSON attributes and interpolation policy |

Everything returned by `raw`, `css`, and `js` is a `RawText` instance, so it is emitted verbatim and never double-escaped when placed inside JSX children.

`hx-config`, `hx-vals`, and `hx-headers` support object literals and are serialized to JSON automatically. Their `data-hx-*` forms are supported too.

### Security: escaping and trusted HTML

Interpolated values are HTML-escaped by default. Build reusable output with JSX and interpolate it directly: the JSX tags remain markup while their data stays escaped.

```tsx
const output = (
  <ul>
    <li>{data1}</li>
    <li>{data2}</li>
  </ul>
);

return <div>{output}</div>;
```

Use `raw` only when a complete HTML string is already trusted or has been independently sanitized:

```tsx
import { raw } from "jsx-htmx";

return <div>{raw("<strong>Trusted HTML</strong>")}</div>;
```

`raw` trusts the entire string. It cannot distinguish intended tags from interpolated data, so do not use it to make string-built views:

```tsx
// Unsafe when data contains untrusted HTML:
const output = `<ul><li>${data}</li></ul>`;
return <div>{raw(output)}</div>;
```

Applications can replace `jsxConfig.sanitize` with a custom interpolation policy or explicitly set it to `false`. Setting `jsxConfig.trusted` to `true` skips interpolation sanitization for the entire runtime.

## htmx v4 support

This package follows the shipped `htmx.org@4` types and extension source. Coverage includes:

- core request, swap, synchronization, inheritance, status, history, and event attributes
- `hx-query`, `hx-action`, `hx-method`, `hx-config`, and `swapEmpty`
- typed lifecycle events plus the `htmx` and `window.htmx` APIs
- reactive `hx-live` bindings and query API
- SSE, WebSocket, multipart, prompt, pending, CSP, and head extensions
- JSX-friendly aliases for colon-delimited WebSocket attributes

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

### Prompt and multipart extensions

`hx-prompt` is provided by the opt-in prompt extension. It sends the answer as the `HX-Prompt` request header and cancels the request when the user cancels:

```tsx
<button hx-delete="/items/1" hx-prompt="Reason for deletion?">
  Delete
</button>
```

The multipart extension can process streamed `multipart/mixed` and `multipart/parallel` responses. Persistent connections use colon attributes through JSX spread syntax:

```tsx
<div
  {...{
    "hx-multipart:connect": "/events",
    "hx-multipart:close": "done",
  }}
  hx-target="#status"
/>
```

Use `swapEmpty:true` or `swapEmpty:false` in `hx-swap` to override whether an empty response performs the main swap:

```tsx
<button hx-post="/clear" hx-swap="innerHTML swapEmpty:true">
  Clear
</button>
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

`js` returns `RawText` for embedding in a `<script>` tag. Pass a plain string, or
a **function invoked in its own scope in the browser**. The function is never
called at render time; its source is emitted as an immediately invoked function
expression (IIFE), preserving editor type checking and linting.

htmx can execute scripts again after a swap. Each function invocation gets fresh
local variables, so `const` and `let` declarations can run repeatedly without
global redeclaration errors, and `var` stays local too. Prefer `const` for values
that are not reassigned and `let` for values that are. Store deliberately shared
state on `window`, for example `window.myApp`.

This changes the previous behavior, which extracted the function body into the
script's top-level scope. Move globals needed by other scripts or inline handlers
onto `window`, or use the string form for an explicitly unscoped script. Repeated
event listener registration, timers, and other side effects still need appropriate
initialization and cleanup; a fresh variable scope does not deduplicate them.

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

Arrow functions (including expression bodies), ordinary functions, and async
functions are supported. A plain string passes through unchanged:

```tsx
<script>{js("console.log('ready')")}</script>
```

> Function source is emitted as written — it is **not** transpiled or bundled. Keep it to browser-ready JavaScript and avoid closing over server-side variables (interpolate values explicitly instead).

### Typed htmx DOM events

```ts
document.body.addEventListener("htmx:config:request", (event) => {
  event.detail.ctx.request.headers = {
    ...event.detail.ctx.request.headers,
    Authorization: "Bearer token",
  };
});

document.body.addEventListener("htmx:error", (event) => {
  console.error(event.detail.ctx?.status, event.detail.error);
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

## Notes for htmx 2 users

This is a breaking-major track.

Notable htmx v4 changes outside this package:

- requests use `fetch()` rather than `XMLHttpRequest`
- inheritance is explicit by default
- error responses swap by default unless disabled (only `204`/`304` skip the swap)
- `hx-ext`, `hx-request`, `hx-params`, and `hx-vars` are removed
- `hx-history-elt` is restored in core; `hx-history` belongs to the history-cache extension
- `hx-prompt` is restored by the opt-in prompt extension
- `hx-ignore` replaces the old "disable htmx processing" meaning of `hx-disable`
- the `hx-trigger` `queue:*` modifier is gone — use `hx-sync`
- `hx-on:event` dot-modifiers (`.prevent`, `.stop`, …) are gone — use the `hx-on="event mods -> code"` extended form
- the JS API was slimmed: DOM helpers (`addClass`/`closest`/`off`/…) were dropped for native equivalents, and `defineExtension` became `registerExtension`
- `HX-Source` / `HX-Target` replace the old trigger-centric header model, and htmx 4 now includes element names in those identifiers when present

If you still need the v2 surface, stay on the v2 branch / release line.

## Source of truth

Element and attribute coverage is checked against the [HTML Standard](https://html.spec.whatwg.org/multipage/indices.html),
the [SVG 2 attribute index](https://www.w3.org/TR/SVG2/attindex.html), and
[MathML Core](https://w3c.github.io/mathml-core/). SVG presentation values reuse
the installed `csstype` declarations. Type checks cover the standard HTML, SVG,
and MathML element names in TypeScript's DOM library.

This package’s v4 typings were aligned against:

- `htmx.org@4` package contents, especially `dist/htmx.d.ts`
- shipped extension source in `dist/ext/*`
- official htmx v4 docs and migration guide

When docs and shipped source disagree, this package prefers the shipped `htmx.org@4` behavior.
