import assert from "node:assert/strict";
import test from "node:test";
import runtime from "./lib/index.js";
import jsxRuntime from "./lib/jsx-runtime.js";

const { html, jsxConfig, raw } = runtime;
const { jsx, jsxs } = jsxRuntime;

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
