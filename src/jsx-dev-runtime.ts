// /** @jsx createElement */
// /** @jsxImportSource typed-html */
// import { createElement } from "../html";
// /// <reference path="../jsx.d.ts" />

export { Fragment } from "./jsx-runtime";
import { JSX } from 'jsx-htmx';
import { jsx, jsxs } from "./jsx-runtime";
import type { Node } from "./jsx-runtime";

export function jsxDEV(
  tag: any,
  props: any,
  _key: unknown,
  _isStatic: boolean,
  source: unknown,
  _self: unknown
): Node | JSX.Element {
  try {
    return Array.isArray(props.children) ? jsxs(tag, props) : jsx(tag, props);
  } catch (error) {
    const cause = error instanceof Error && (error as any).cause;
    console.error(`Error encountered while rendering ${tag}`, {
      error,
      cause,
      source,
    });
    throw error;
  }
}
