/// <reference path="./index.d.ts" />
import {
  Attributes,
  Children,
  CssDeclaration,
  CssRules,
  CustomElementHandler,
  HtmlTemplator,
  InterpValue,
  JsxConfig,
} from "jsx-htmx";

const capitalACharCode = "A".charCodeAt(0);
const capitalZCharCode = "Z".charCodeAt(0);
const booleanAttributes = new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "disableremoteplayback",
  "download",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
]);
const booleanishEnumeratedAttributes = new Set([
  "contenteditable",
  "draggable",
  "spellcheck",
]);

export class RawText {
  constructor(private readonly value: string) {}

  toString(): string {
    return this.value;
  }
}

const isUpper = (input: string, index: number) => {
  const charCode = input.charCodeAt(index);
  return capitalACharCode <= charCode && capitalZCharCode >= charCode;
};

const toKebabCase = (camelCased: string) => {
  let kebabCased = "";
  for (let i = 0; i < camelCased.length; i++) {
    const prevUpperCased = i > 0 ? isUpper(camelCased, i - 1) : true;
    const currentUpperCased = isUpper(camelCased, i);
    const nextUpperCased =
      i < camelCased.length - 1 ? isUpper(camelCased, i + 1) : true;
    if (
      (!prevUpperCased && currentUpperCased) ||
      (currentUpperCased && !nextUpperCased)
    ) {
      kebabCased += "-";
      kebabCased += camelCased[i]!.toLowerCase();
    } else {
      kebabCased += camelCased[i];
    }
  }
  return kebabCased;
};

const escapeAttrNodeValue = (value: string) => {
  return value.replace(/(&)|(")|(\u00A0)/g, function (_, amp, quote) {
    if (amp) return "&amp;";
    if (quote) return "&quot;";
    return "&nbsp;";
  });
};

const attributeToString =
  (attributes: Attributes) =>
  (name: string): string => {
    const value = attributes[name];
    if (value === undefined || value === null) return "";
    const formattedName = toKebabCase(name);
    const makeAttribute = (value: string) => `${formattedName}="${value}"`;
    if (value instanceof Date) {
      return makeAttribute(value.toISOString());
    } else
      switch (typeof value) {
        case "boolean":
          if (booleanishEnumeratedAttributes.has(formattedName)) {
            return makeAttribute(value ? "true" : "false");
          }
          if (value && booleanAttributes.has(formattedName)) {
            return formattedName;
          }
          return value ? formattedName : "";
        default:
          return makeAttribute(escapeAttrNodeValue(value.toString()));
      }
  };

const attributesToString = (attributes: Attributes | undefined): string => {
  if (attributes) {
    const rendered = Object.keys(attributes)
      .filter((attribute) => attribute !== "children")
      .map(attributeToString(attributes))
      .filter((attribute) => attribute.length)
      .join(" ");
    return rendered.length > 0 ? ` ${rendered}` : "";
  } else {
    return "";
  }
};

const contentsToString = (contents: Array<string | RawText> | undefined) => {
  if (contents) {
    return contents
      .map((elements) =>
        Array.isArray(elements) ? elements.join("") : elements
      )
      .join("");
  } else {
    return "";
  }
};

const isVoidElement = (tagName: string) => {
  return (
    [
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
    ].indexOf(tagName) > -1
  );
};

export function createElement(
  name: string | CustomElementHandler,
  attributes: (Attributes & Children) | undefined = {},
  ...contents: Array<string | RawText>
) {
  const children = (attributes && attributes.children) || contents;

  if (typeof name === "function") {
    return name(children ? { children, ...attributes } : attributes, contents);
  } else {
    const tagName = toKebabCase(name);
    if (isVoidElement(tagName) && !contents.length) {
      return `<${tagName}${attributesToString(attributes)}>`;
    } else {
      return `<${tagName}${attributesToString(attributes)}>${contentsToString(
        contents
      )}</${tagName}>`;
    }
  }
}

// HTMX

// /// <reference path="./jsx.d.ts" />

/**
 * Configuration for the JSX runtime.
 */
export const jsxConfig: JsxConfig = {
  jsonAttributes: new Set([
    "hx-vals",
    "hx-headers",
    "data-hx-vals",
    "data-hx-headers",
  ]),
  sanitize: false,
  trusted: false,
};

const attrPattern = /[<>&"']/g;
const attrPatternWithoutDQ = /[<>&']/g;
const attrReplacements: Record<string, string> = {
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  '"': "&quot;",
  "'": "&#39;",
};

type Renderable = 0 | {};
function isRenderable(value: unknown): value is Renderable {
  return value === 0 || !!value;
}
function attrSanitizer(raw: Renderable): string {
  return String(raw).replaceAll(
    attrPattern,
    (sub) => attrReplacements[sub] || sub
  );
}
function attrSanitizerWithoutDQ(raw: Renderable): string {
  return String(raw).replaceAll(
    attrPatternWithoutDQ,
    (sub) => attrReplacements[sub] || sub
  );
}
function htmlSanitizer(raw: Renderable): string {
  if (raw instanceof RawText) return raw.toString();
  const out = String(raw);
  if (jsxConfig.trusted) return out;
  return jsxConfig.sanitize ? jsxConfig.sanitize(out, typeof raw) : out;
}

function isObject(value: unknown): value is {} {
  return typeof value === "object" && value !== null;
}

function htmlTransformChildren(value: InterpValue): string {
  if ("$$child" in value)
    return isRenderable(value.$$child) ? htmlSanitizer(value.$$child) : "";
  if ("$$children" in value) {
    const out: string[] = [];
    for (const child of value.$$children as unknown[]) {
      if (isRenderable(child)) out.push(htmlSanitizer(child));
    }
    return out.join(" ");
  }

  let obj: {};
  if ("$$spread" in value && isObject(value.$$spread)) obj = value.$$spread;
  else if (isObject(value)) obj = value;
  else return "";
  const out: string[] = [];
  for (const [key, attr] of Object.entries(obj)) {
    if (!isRenderable(attr) && attr !== "") continue;
    if (jsxConfig.jsonAttributes.has(key)) {
      out.push(`${key}='${attrSanitizerWithoutDQ(JSON.stringify(attr))}'`);
    } else {
      out.push(`${key}="${attrSanitizer(attr)}"`);
    }
  }
  return out.join(" ");
}

/**
 * A [tagged template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
 * that interprets different kinds of {@link InterpValue values} into escaped HTML.
 *
 * ```ts twoslash
 * import { html } from 'typed-htmx';
 * function assertEqual(left: any, right: any) {}
 * // ---cut---
 * const template = html`
 *   <div hx-vals=${{ foo: 'bar' }} />
 * `;
 * assertEqual(template, `<div hx-vals='{"foo":"bar"}' />`);
 * ```
 */
export const html: HtmlTemplator = (raw, ...values) => {
  const values_ = values.map(htmlTransformChildren);
  return String.raw(raw, ...values_);
};

type CssScalar = string | number;

function isCssScalar(value: unknown): value is CssScalar {
  return typeof value === "string" || typeof value === "number";
}

function isCssDeclaration(value: unknown): value is CssDeclaration {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function serializeCssValue(value: CssScalar): string {
  return String(value);
}

function serializeCssDeclarations(selector: string, declaration: CssDeclaration): string {
  const declarations: string[] = [];
  const nested: string[] = [];

  for (const [propertyName, propertyValue] of Object.entries(declaration)) {
    if (propertyValue === undefined || propertyValue === null) {
      continue;
    }

    if (Array.isArray(propertyValue)) {
      for (const item of propertyValue) {
        if (item === undefined || item === null) continue;
        declarations.push(`${toKebabCase(propertyName)}: ${serializeCssValue(item)};`);
      }
      continue;
    }

    if (isCssDeclaration(propertyValue)) {
      const nestedSelector = propertyName.includes("&")
        ? propertyName.replaceAll("&", selector)
        : `${selector} ${propertyName}`;
      nested.push(serializeCssRule(nestedSelector, propertyValue));
      continue;
    }

    if (isCssScalar(propertyValue)) {
      declarations.push(`${toKebabCase(propertyName)}: ${serializeCssValue(propertyValue)};`);
    }
  }

  const rule = declarations.length > 0 ? `${selector} { ${declarations.join(" ")} }` : "";
  return [rule, ...nested].filter((entry) => entry.length > 0).join("\n");
}

function serializeCssAtRule(ruleName: string, declaration: CssDeclaration): string {
  const nestedRules: string[] = [];
  for (const [nestedSelector, nestedDeclaration] of Object.entries(declaration)) {
    if (!isCssDeclaration(nestedDeclaration)) {
      continue;
    }

    nestedRules.push(serializeCssRule(nestedSelector, nestedDeclaration));
  }

  return `${ruleName} {\n${nestedRules.join("\n")}\n}`;
}

function serializeCssRule(selector: string, declaration: CssDeclaration): string {
  if (selector.startsWith("@")) {
    return serializeCssAtRule(selector, declaration);
  }

  return serializeCssDeclarations(selector, declaration);
}

export function css(input: string | CssRules): RawText {
  if (typeof input === "string") {
    return new RawText(input);
  }

  const rules: string[] = [];
  for (const [selector, declaration] of Object.entries(input)) {
    if (!isCssDeclaration(declaration)) {
      continue;
    }

    rules.push(serializeCssRule(selector, declaration));
  }

  return new RawText(rules.join("\n"));
}

function extractFunctionBody(code: () => unknown): string {
  const source = code.toString().trim();
  const firstBrace = source.indexOf("{");
  const lastBrace = source.lastIndexOf("}");

  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return source.slice(firstBrace + 1, lastBrace).trim();
  }

  const arrowIndex = source.indexOf("=>");
  if (arrowIndex >= 0) {
    const expression = source.slice(arrowIndex + 2).trim();
    return expression.endsWith(";") ? expression : `${expression};`;
  }

  return source;
}

export function js(input: string | (() => unknown)): RawText {
  return new RawText(typeof input === "string" ? input : extractFunctionBody(input));
}

export type Element = string;
export type CustomComponentPropDerivedDefinition<CustomComponentType = null> =
  CustomComponentType extends null ? Children : CustomComponentType & Children;
export type CustomComponentPropDefinition<
  CustomComponentType = null,
  Props = null
> = Props extends null
  ? CustomComponentPropDerivedDefinition<CustomComponentType>
  : Props & CustomComponentPropDerivedDefinition<CustomComponentType>;
export type CustomComponent<CustomComponentType = null, Props = null> = {
  (props: CustomComponentPropDefinition<CustomComponentType, Props>):
    | Element
    | string
    | null;
};
export type SimpleCustomComponent<Props = null> = CustomComponent<null, Props>;
