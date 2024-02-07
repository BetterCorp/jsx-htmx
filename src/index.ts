// /// <reference path="./jsx/element-types.d.ts" />
// /// <reference path="./jsx/events.d.ts" />
// /// <reference path="./jsx/intrinsic-elements.d.ts" />
/// <reference path="./index.d.ts" />

type AttributeValue = number | string | Date | boolean | string[];

export interface Children {
  children?: AttributeValue;
}

export interface CustomElementHandler {
  (attributes: Attributes & Children, contents: string[]): string;
}

export interface Attributes {
  [key: string]: AttributeValue;
}

const capitalACharCode = "A".charCodeAt(0);
const capitalZCharCode = "Z".charCodeAt(0);

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
          // https://www.w3.org/TR/2008/WD-html5-20080610/semantics.html#boolean
          if (value) {
            return formattedName;
          } else {
            return "";
          }
        default:
          return makeAttribute(escapeAttrNodeValue(value.toString()));
      }
  };

const attributesToString = (attributes: Attributes | undefined): string => {
  if (attributes) {
    return (
      " " +
      Object.keys(attributes)
        .filter((attribute) => attribute !== "children") // filter out children attributes
        .map(attributeToString(attributes))
        .filter((attribute) => attribute.length) // filter out negative boolean attributes
        .join(" ")
    );
  } else {
    return "";
  }
};

const contentsToString = (contents: any[] | undefined) => {
  if (contents) {
    return contents
      .map((elements) =>
        Array.isArray(elements) ? elements.join("\n") : elements
      )
      .join("\n");
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
      "command",
      "embed",
      "hr",
      "img",
      "input",
      "keygen",
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
  ...contents: string[]
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
	jsonAttributes: new Set(["hx-vals", "hx-headers", "data-hx-vals", "data-hx-headers"]),
	sanitize: false,
	trusted: false,
};

export interface JsxConfig {
	/**
	 * When these attributes' values are set to object literals, they will be stringified to JSON.
	 */
	jsonAttributes: Set<string>;
	/**
	 * The sanitizer to be used by the runtime.
	 * Accepts a function of the signature `(raw: string, originalType: string) => string`.
	 * @note {@link JsxConfig.trusted} must be false for elements to be sanitized.
	 * @see {@link Sanitizer}
	 */
	sanitize: Sanitizer;
	/**
	 * If false, value interpolations inside of JSX will be sanitized.
	 * @note Sanitization will change the return type of JSX functions to an object that overrides `toString`.
	 * 			 In most cases it will function as expected, but you might sometimes need to manually coerce the JSX tree to a string.
	 */
	trusted: boolean;
}

export type Sanitizer = false | ((raw: string, originalType: string) => string);

export type InterpValue =
	| { $$child: unknown }
	| { $$children: unknown[] }
	| { $$spread: unknown }
	| Record<string, unknown>;

export type HtmlTemplator<Output = string> = (raw: TemplateStringsArray, ...values: InterpValue[]) => Output;

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
	return String(raw).replaceAll(attrPattern, (sub) => attrReplacements[sub] || sub);
}
function attrSanitizerWithoutDQ(raw: Renderable): string {
	return String(raw).replaceAll(attrPatternWithoutDQ, (sub) => attrReplacements[sub] || sub);
}
function htmlSanitizer(raw: Renderable): string {
	const out = String(raw);
	if (jsxConfig.trusted) return out;
	return jsxConfig.sanitize ? jsxConfig.sanitize(out, typeof raw) : out;
}

function isObject(value: unknown): value is {} {
	return typeof value === "object" && value !== null;
}

function htmlTransformChildren(value: InterpValue): string {
	if ("$$child" in value) return isRenderable(value.$$child) ? htmlSanitizer(value.$$child) : "";
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
