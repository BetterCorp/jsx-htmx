import { JSX } from "jsx-htmx/jsx-runtime";
import { jsxConfig, createElement } from "./index";

type Element = JSX.Element | Node;

export class Node {
  constructor(private children: Element | Element[]) {}

  toString(): string {
    if (Array.isArray(this.children)) return this.children.join("\n");
    return this.children.toString();
  }
}

export function Fragment({ children }: { children?: unknown }): Element {
  if (Array.isArray(children)) {
    const elts = children.map(sanitizer);
    return jsxConfig.trusted ? elts.join("\n") : new Node(elts);
  }
  const elt = sanitizer(children);
  return jsxConfig.trusted ? elt : new Node(elt);
}

function sanitizer(value: unknown): Element {
  const str = value || value === 0 ? (value as any).toString() : "";
  if (!jsxConfig.sanitize || jsxConfig.trusted) return str;
  if (value instanceof Node) return value;
  return jsxConfig.sanitize(str, typeof value);
}

function expandLiterals(props: Record<string, unknown>) {
  for (const attr of jsxConfig.jsonAttributes) {
    if (!(attr in props)) continue;
    const value = props[attr];
    if (typeof value === "object") {
      props[attr] = { toString: () => JSON.stringify(value) };
    }
  }
}

export function jsx(
  tag: any,
  { children, ...props }: { children?: unknown }
): Element {
  expandLiterals(props as any);
  const contents = Array.isArray(children)
    ? children.map(sanitizer)
    : [sanitizer(children)];
  const elt = createElement(tag, props as any, ...(contents as any[]));
  return jsxConfig.trusted ? elt : new Node(elt);
}

export function jsxs(
  tag: any,
  { children, ...props }: { children: unknown[] }
): Element {
  expandLiterals(props as any);
  const elt = createElement(
    tag,
    props as any,
    ...(children.map(sanitizer) as any[])
  );
  return jsxConfig.trusted ? elt : new Node(elt);
}
