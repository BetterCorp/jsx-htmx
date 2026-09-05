import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import runtime from "./lib/index.js";
import jsxRuntime from "./lib/jsx-runtime.js";
import jsxDevRuntime from "./lib/jsx-dev-runtime.js";

const { createElement, css, html, js, jsxConfig, raw } = runtime;
const { jsx, jsxs } = jsxRuntime;

test("components receive original props and escape rendered children exactly once", () => {
  const values = { message: "<x>" };
  const props = { "hx-vals": values, children: ["<x>", raw("<b>trusted</b>"), 0, null, false] };
  const Echo = (received) => {
    assert.equal(received["hx-vals"], values);
    assert.equal(received.children, props.children);
    return jsx("span", received);
  };
  for (const render of [jsx, jsxs, jsxDevRuntime.jsxDEV]) {
    assert.equal(render(Echo, props).toString(),
      '<span hx-vals="{&quot;message&quot;:&quot;<x>&quot;}">&lt;x&gt;<b>trusted</b>0</span>');
    assert.equal(render(() => "<untrusted>", {}).toString(), "&lt;untrusted&gt;");
    assert.equal(render(() => null, {}).toString(), "");
  }
  assert.equal(props["hx-vals"], values);
});

test("conditional children and fragments omit booleans and retain zero", () => {
  for (const render of [jsx, jsxs, jsxDevRuntime.jsxDEV]) {
    const children = [null, false, true, undefined, 0, ["<x>", jsx("b", { children: "bold" })]];
    assert.equal(render("div", { children }).toString(), '<div>0&lt;x&gt;<b>bold</b></div>');
    assert.equal(render(jsxRuntime.Fragment, { children }).toString(), '0&lt;x&gt;<b>bold</b>');
  }
  assert.equal(jsx("div", null).toString(), "<div></div>");
  assert.equal(jsx("div").toString(), "<div></div>");
});

test("createElement honors props children and explicit variadic children", () => {
  assert.equal(createElement("p", { children: 0, key: "item" }), "<p>0</p>");
  assert.equal(createElement("p", { children: [null, true, [0, "text"]] }), "<p>0text</p>");
  assert.equal(createElement("p", { children: "prop" }, "argument"), "<p>argument</p>");
  assert.equal(createElement("p", null, "text"), "<p>text</p>");
  assert.equal(jsx("p", { key: "item", children: "text" }).toString(), "<p>text</p>");
});

test("htmx value attributes retain booleans including inherited and data forms", () => {
  for (const name of ["hx-boost", "hx-browser-indicator", "hx-history", "hx-validate", "hx-push-url", "hx-replace-url", "hx-swap-oob"]) {
    for (const prefix of ["", "data-"]) {
      for (const suffix of ["", ":inherited"]) {
        for (const value of [true, false]) {
          const attribute = `${prefix}${name}${suffix}`;
          assert.equal(jsx("div", { [attribute]: value }).toString(),
            `<div ${attribute}="${value}"></div>`);
        }
      }
    }
  }
});

test("explicit htmx bindings and CSS custom properties preserve case", () => {
  assert.equal(jsx("div", { "hx-live:textContent": "name", "data-hx-live:attr.viewBox": "box" }).toString(),
    '<div hx-live:textContent="name" data-hx-live:attr.viewBox="box"></div>');
  assert.equal(css({ ":root": { "--brandColor": "red", color: "var(--brandColor)" } }).toString(),
    ':root { --brandColor: red; color: var(--brandColor); }');
});

test("rejects dynamic names that could break out of markup", () => {
  for (const name of ["", "div><script", "div onclick", "div/", "1div"]) {
    assert.throws(() => createElement(name), /Invalid element name/);
  }
  for (const name of ["", 'data-x" onclick', "x=y", "x/y", "x\u0000"]) {
    assert.throws(() => jsx("div", { [name]: "value" }), /Invalid attribute name/);
  }
  assert.equal(createElement("my-widget", { "hx-on:click": "run()" }),
    '<my-widget hx-on:click="run()"></my-widget>');
});

test("all rendering APIs share safe JSON and attribute serialization", () => {
  const values = { message: '"quoted" & <tag>', enabled: false, count: 0 };
  const props = {
    "hx-vals": values,
    "data-hx-headers:inherited": { "X-Token": '" & value' },
    "hx-validate": false,
    "aria-hidden": false,
    title: '" & title',
    missing: undefined,
  };
  const expected = '<div hx-vals="{&quot;message&quot;:&quot;\\&quot;quoted\\&quot; &amp; <tag>&quot;,&quot;enabled&quot;:false,&quot;count&quot;:0}"' +
    ' data-hx-headers:inherited="{&quot;X-Token&quot;:&quot;\\&quot; &amp; value&quot;}"' +
    ' hx-validate="false" aria-hidden="false" title="&quot; &amp; title"></div>';
  assert.equal(jsx("div", props).toString(), expected);
  assert.equal(createElement("div", props), expected);
  assert.equal(html`<div ${props}></div>`, expected);
  assert.equal(html`<div ${{ $$spread: props }}></div>`, expected);
  assert.equal(props["hx-vals"], values);
  assert.equal(jsx("div", { "hx-vals": '{"count":0}' }).toString(),
    '<div hx-vals="{&quot;count&quot;:0}"></div>');
  assert.equal(html`<div ${{ "hx-vals": '{"count":0}' }}></div>`,
    '<div hx-vals="{&quot;count&quot;:0}"></div>');
  assert.throws(() => html`<div ${{ 'x" onclick': "run()" }}></div>`, /Invalid attribute name/);
  assert.equal(createElement("time", { datetime: new Date("2026-01-01T00:00:00Z") }),
    '<time datetime="2026-01-01T00:00:00.000Z"></time>');
});

test("preserves SVG names and serializes presentation and namespace attributes", () => {
  const gradient = jsx("linearGradient", {
    id: "paint", gradientUnits: "userSpaceOnUse", gradientTransform: "rotate(45)",
    children: jsx("stop", { offset: 0, stopColor: "red" }),
  });
  const svg = jsxs("svg", {
    viewBox: "0 0 24 24", preserveAspectRatio: "xMidYMid meet",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    children: [
      jsx("defs", { children: gradient }),
      jsx("path", { d: "M0 0L24 24", pathLength: 10, strokeWidth: 2, "stroke-linecap": "round", clipPath: "url(#clip)" }),
      jsx("use", { xlinkHref: '#shape&"', xmlSpace: "preserve" }),
      jsx("foreignObject", { width: 24, children: jsx("div", { children: "HTML & text" }) }),
    ],
  });
  assert.equal(svg.toString(),
    '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" xmlns:xlink="http://www.w3.org/1999/xlink">' +
    '<defs><linearGradient id="paint" gradientUnits="userSpaceOnUse" gradientTransform="rotate(45)"><stop offset="0" stop-color="red"></stop></linearGradient></defs>' +
    '<path d="M0 0L24 24" pathLength="10" stroke-width="2" stroke-linecap="round" clip-path="url(#clip)"></path>' +
    '<use xlink:href="#shape&amp;&quot;" xml:space="preserve"></use>' +
    '<foreignObject width="24"><div>HTML &amp; text</div></foreignObject></svg>');
  assert.equal(createElement("feGaussianBlur", { stdDeviation: "1 2" }),
    '<feGaussianBlur stdDeviation="1 2"></feGaussianBlur>');
  assert.equal(jsxDevRuntime.jsxDEV("clipPath", { clipPathUnits: "objectBoundingBox" }).toString(),
    '<clipPath clipPathUnits="objectBoundingBox"></clipPath>');
  assert.equal(createElement("use", { "xlink:href": "#shape", "xml:lang": "en" }),
    '<use xlink:href="#shape" xml:lang="en"></use>');
});

test("keeps explicit boolean values for ARIA, data, SVG and MathML", () => {
  for (const value of [true, false]) {
    assert.equal(jsx("svg", { "aria-hidden": value, focusable: value, "data-active": value }).toString(),
      `<svg aria-hidden="${value}" focusable="${value}" data-active="${value}"></svg>`);
    assert.equal(createElement("feConvolveMatrix", { preserveAlpha: value }),
      `<feConvolveMatrix preserveAlpha="${value}"></feConvolveMatrix>`);
    assert.equal(jsx("math", { displaystyle: value, children: jsx("mo", { stretchy: value, children: "<" }) }).toString(),
      `<math displaystyle="${value}"><mo stretchy="${value}">&lt;</mo></math>`);
  }
  assert.equal(jsx("template", { shadowrootmode: "open", shadowrootdelegatesfocus: true, shadowrootclonable: false }).toString(),
    '<template shadowrootmode="open" shadowrootdelegatesfocus></template>');
  assert.equal(jsx("div", { "hx-ignore": true, "data-hx-ignore": true, "hx-preserve": false }).toString(),
    '<div hx-ignore data-hx-ignore></div>');
});

test("retains HTML, custom-element and CSS name conventions", () => {
  assert.equal(jsx("input", { type: "number", min: 0, disabled: true, required: false }).toString(),
    '<input type="number" min="0" disabled>');
  assert.equal(jsx("img", { width: 24, height: 24 }).toString(), '<img width="24" height="24">');
  assert.equal(createElement("meta", { httpEquiv: "refresh", content: "30" }),
    '<meta http-equiv="refresh" content="30">');
  assert.equal(createElement("form", { acceptCharset: "UTF-8" }), '<form accept-charset="UTF-8"></form>');
  assert.equal(createElement("myWidget", { customValue: "yes" }), '<my-widget custom-value="yes"></my-widget>');
  assert.equal(css({ path: { strokeWidth: 2, clipPath: "none" } }).toString(),
    'path { stroke-width: 2; clip-path: none; }');
});

test("js function inputs get fresh local scope on repeated script execution", () => {
  const script = js(() => {
    const label = "ready";
    let count = 0;
    var local = ++count;
    window.results.push(label + local);
  });
  const context = vm.createContext({ window: { results: [] } });
  // The same context models classic script tags executing after successive swaps.
  vm.runInContext(script.toString(), context);
  vm.runInContext(script.toString(), context);
  assert.deepEqual(context.window.results, ["ready1", "ready1"]);
  for (const name of ["label", "count", "local"]) {
    assert.equal(vm.runInContext(`typeof ${name}`, context), "undefined");
  }
  assert.equal(jsx("script", { children: script }).toString(), `<script>${script}</script>`);
});

test("js preserves function syntax, async execution, and raw strings", async () => {
  const context = vm.createContext({ window: { results: [] } });
  const snippets = [
    () => window.results.push("{expression}"),
    () => ({ value: "object expression" }),
    function named() { const value = "named"; window.results.push(value); return value; },
    async () => { const value = await Promise.resolve("async"); window.results.push(value); },
  ];
  for (const snippet of snippets) await vm.runInContext(js(snippet).toString(), context);
  assert.deepEqual(context.window.results, ["{expression}", "named", "async"]);
  const source = 'window.shared = "raw & unchanged";';
  assert.equal(js(source).toString(), source);
  assert.equal(jsx("script", { children: js(source) }).toString(), `<script>${source}</script>`);
});

test("escapes interpolated values by default", () => {
  assert.equal(
    jsx("p", { children: `<script>"x" & 'y'</script>` }).toString(),
    "<p>&lt;script&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/script&gt;</p>"
  );
  assert.equal(
    html`<p>${{ $$child: "<strong>unsafe</strong>" }}</p>`,
    "<p>&lt;strong&gt;unsafe&lt;/strong&gt;</p>"
  );
});

test("composes JSX without escaping its markup or trusting its data", () => {
  const list = jsxs("ul", {
    children: [
      jsx("li", { children: "<alice>" }),
      jsx("li", { children: "Bob & Carol" }),
    ],
  });

  assert.equal(
    jsx("div", { children: list }).toString(),
    "<div><ul><li>&lt;alice&gt;</li><li>Bob &amp; Carol</li></ul></div>"
  );
});

test("raw inserts a trusted HTML string verbatim", () => {
  assert.equal(
    jsx("div", { children: raw("<strong>trusted</strong>") }).toString(),
    "<div><strong>trusted</strong></div>"
  );
});

test("supports custom and disabled interpolation policies", () => {
  const defaultSanitizer = jsxConfig.sanitize;

  try {
    jsxConfig.sanitize = (value) => `[${value}]`;
    assert.equal(jsx("p", { children: "custom" }).toString(), "<p>[custom]</p>");

    jsxConfig.sanitize = false;
    assert.equal(
      jsx("p", { children: "<strong>legacy</strong>" }).toString(),
      "<p><strong>legacy</strong></p>"
    );
  } finally {
    jsxConfig.sanitize = defaultSanitizer;
  }
});
