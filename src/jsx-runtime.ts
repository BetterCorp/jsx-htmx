import { JSX } from "jsx-htmx/jsx-runtime";
import { jsxConfig, createElement, RawText } from "./index";

type Element = JSX.Element | Node;

export class Node {
  constructor(private children: Element | Element[]) {}

  toString(): string {
    if (this.children === undefined || this.children === null) return "";
    if (Array.isArray(this.children)) return this.children.join("");
    return this.children.toString();
  }
}

export function Fragment({ children }: { children?: unknown }): Element {
  if (Array.isArray(children)) {
    const elts = children.map(sanitizer);
    return jsxConfig.trusted ? elts.join("") : new Node(elts);
  }
  const elt = sanitizer(children);
  return jsxConfig.trusted ? elt : new Node(elt);
}

function sanitizer(value: unknown): Element {
  if (value === null || value === undefined || typeof value === "boolean") return "";
  if (Array.isArray(value)) {
    const children = value.map(sanitizer);
    return jsxConfig.trusted ? children.join("") : new Node(children);
  }
  if (value instanceof RawText) return value.toString();
  const str = value || value === 0 ? value.toString() : "";
  if (!jsxConfig.sanitize || jsxConfig.trusted) return str;
  if (value instanceof Node) return value;
  return jsxConfig.sanitize(str, typeof value);
}

export function jsx(
  tag: any,
  attributes: Record<string, unknown> | null = {}
): Element {
  const { children, key, ...props } = attributes ?? {};
  // Components need their original data. Escape only what they render, once.
  if (typeof tag === "function") {
    const contents = children === undefined ? [] : Array.isArray(children) ? children : [children];
    const elt = sanitizer(tag({ ...props, children }, contents));
    return jsxConfig.trusted ? elt : new Node(elt);
  }
  const contents = Array.isArray(children)
    ? children.map(sanitizer)
    : [sanitizer(children)];
  const elt = createElement(tag, props as any, ...(contents as any[]));
  return jsxConfig.trusted ? elt : new Node(elt);
}

export const jsxs = jsx;
