/** @jsxImportSource jsx-htmx */

import upstreamHtmx from "htmx.org";
import type { JSX } from "jsx-htmx/jsx-runtime";
import { createElement, type SimpleCustomComponent } from "jsx-htmx";

const Wrapper: SimpleCustomComponent = ({ children }) => <section>{children}</section>;
const conditionalChildren = <Wrapper>{null}{false}{true}{0}{[undefined, <span />]}</Wrapper>;
const booleanHtmx = <div hx-boost={false} hx-history={false} hx-validate="true" hx-push-url={false} hx-replace-url={true} hx-swap-oob={true} />;
createElement("div", { children: [null, false, 0, ["text"]], title: undefined });
createElement("div", null, 0, false, null);
void conditionalChildren;
void booleanHtmx;

// Every standard DOM element has a JSX declaration (deprecated HTML excluded).
type AssertNever<T extends never> = T;
type MissingElements = AssertNever<Exclude<
  keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | keyof MathMLElementTagNameMap,
  keyof JSX.IntrinsicElements
>>;

const graphics = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height="24"
    preserveAspectRatio="xMidYMid meet" role="img" aria-hidden={false} focusable={false}
    hx-get="/icon" onpointerdown="selectIcon(event)">
    <title xmlLang="en">Example icon</title>
    <defs>
      <linearGradient id="paint" gradientUnits="userSpaceOnUse" gradientTransform="rotate(45)">
        <stop offset="0%" stopColor="red" stopOpacity={0.5} />
        <stop offset={1} stop-color="blue" />
      </linearGradient>
      <radialGradient href="#paint" cx="50%" cy="50%" r="50%" fr={0} />
      <clipPath id="clip" clipPathUnits="objectBoundingBox"><rect width={1} height={1} /></clipPath>
      <mask id="mask" maskUnits="userSpaceOnUse" mask-type="alpha"><circle r={12} /></mask>
      <pattern id="tiles" patternUnits="userSpaceOnUse" width={4} height={4} viewBox="0 0 4 4" />
      <marker id="arrow" markerWidth={4} markerHeight={4} refX={2} refY={2} orient="auto-start-reverse" />
      <filter id="effect" filterUnits="userSpaceOnUse">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1 2" result="blur" />
        <feConvolveMatrix in="blur" kernelMatrix="0 1 0 1 0 1 0 1 0" preserveAlpha={false} />
        <feColorMatrix type="saturate" values={0.5} />
        <feComponentTransfer><feFuncA type="linear" slope={0.5} /></feComponentTransfer>
        <feTurbulence baseFrequency={0.05} numOctaves={2} stitchTiles="stitch" />
        <feDisplacementMap in2="blur" xChannelSelector="R" yChannelSelector="A" />
        <feMerge><feMergeNode in="blur" /></feMerge>
      </filter>
      <symbol id="shape" viewBox="0 0 24 24"><path d="M0 0L24 24" /></symbol>
    </defs>
    <g fill="url(#paint)" clipPath="url(#clip)" strokeWidth={2} stroke-linecap="round">
      <path d="M0 0L24 24" pathLength={10} fillRule="evenodd" />
      <circle cx={12} cy={12} r="10%" />
      <ellipse cx={12} cy={12} rx={8} ry={4} />
      <line x1={0} y1={0} x2={24} y2={24} />
      <polygon points="0,0 24,0 12,24" />
      <polyline points="0,0 24,24" />
      <use href="#shape" x={1} />
      <use xlinkHref="#shape" {...{ "xlink:href": "#shape", "xml:space": "preserve" }} />
      <image href="/image.svg" width={24} height={24} crossorigin="anonymous" />
      <text x={0} y={12} textLength={24} textAnchor="middle">
        <tspan dx={2}>Label</tspan><textPath href="#shape" startOffset="50%">Path</textPath>
      </text>
      <animate attributeName="opacity" from={0} to={1} dur="1s" fill="freeze" />
      <animateMotion path="M0 0L24 24" rotate="auto" repeatCount="indefinite" />
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" />
      <a href="/details" fill="blue" transform="translate(1 2)">Details</a>
    </g>
    <foreignObject width={24} height={24}>
      <div xmlns="http://www.w3.org/1999/xhtml">HTML</div>
    </foreignObject>
  </svg>
);
void graphics;

const modernHtml = (
  <section autofocus autocorrect="off" writingsuggestions={false} is="custom-section"
    itemscope itemtype="https://schema.org/Thing" itemid="example" itemref="name"
    headingoffset={1} headingreset onbeforematch="reveal()" oncopy="copy(event)">
    <hgroup><h1 itemprop="name">Heading</h1><p>Subtitle</p></hgroup>
    <search><input type="search" maxlength={100} size={20} /></search>
    <button command="show-modal" commandfor="dialog">Open</button>
    <dialog id="dialog" closedby="any" oncancel="cancel(event)" onclose="closed()" />
    <div popover="hint" onbeforetoggle="toggle(event)" />
    <form accept-charset="UTF-8" onreset="reset(event)" onformdata="data(event)">
      <select autocomplete="country" onchange="changed(event)">
        <button><selectedcontent /></button><option value={1}>One</option>
      </select>
      <textarea autocomplete="on" oninput="changed(event)" cols={20} minlength={2} />
      <input type="color" alpha colorspace="display-p3" />
      <input type="number" min={0} max={10} step={0.5} value={1} />
    </form>
    <template shadowrootmode="open" shadowrootdelegatesfocus shadowrootclonable
      shadowrootserializable shadowrootslotassignment="named" shadowrootcustomelementregistry>
      <slot name="content" onslotchange="changed(event)" />
    </template>
    <picture><source srcset="image.webp" width={100} height={50} /><img src="image.png" width={100} height={50} /></picture>
    <canvas width={100} height={50} />
    <audio loading="lazy" /><video loading="lazy" disablepictureinpicture />
    <ol type="A"><li value={1}>One</li></ol>
    <table><thead><tr><th abbr="Qty">Quantity</th></tr></thead></table>
    <meta http-equiv="refresh" content="30" media="screen" />
    <link rel="mask-icon" href="/icon.svg" color="#000000" />
    <style blocking="render">{"body { color: black; }"}</style>
  </section>
);
void modernHtml;

const math = (
  <math xmlns="http://www.w3.org/1998/Math/MathML" display="block" displaystyle={false}>
    <semantics>
      <mfrac linethickness="1px"><mi mathvariant="normal">x</mi><mn>2</mn></mfrac>
      <annotation encoding="application/x-tex">x/2</annotation>
      <annotation-xml encoding="application/xhtml+xml"><span>Half x</span></annotation-xml>
    </semantics>
    <mo stretchy={false} fence={true} form="infix">+</mo>
    <munderover accent={true} accentunder={false}><mi>x</mi><mn>0</mn><mn>1</mn></munderover>
    <mpadded width="2em" voffset="1em"><mspace width="1em" /></mpadded>
    <mtable><mtr><mtd columnspan={2}><mtext>Label</mtext></mtd></mtr></mtable>
  </math>
);
void math;

// @ts-expect-error unknown SVG attributes must not be accepted
const badSvgAttribute = <svg viewbox="0 0 24 24" />;
// @ts-expect-error geometry attributes belong to the corresponding element
const badCircleAttribute = <circle d="M0 0" />;
// @ts-expect-error SVG coordinates cannot be booleans
const badCoordinate = <circle cx={false} />;
// @ts-expect-error presentation attribute values are checked
const badStroke = <path strokeLinecap="rounded" />;
// @ts-expect-error literal hyphenated presentation attributes are checked too
const badHyphenatedStroke = <path stroke-linecap="rounded" />;
// @ts-expect-error filter primitives have their own enumerations
const badFilter = <feTurbulence type="matrix" />;
// @ts-expect-error animation fill is a timing mode, not a paint color
const badAnimation = <animate fill="red" />;
// @ts-expect-error unknown elements must not be accepted
const badElement = <circel />;
// @ts-expect-error HTML elements do not acquire arbitrary SVG props
const badHtmlAttribute = <div viewBox="0 0 24 24" />;
// @ts-expect-error declarative shadow root modes are checked
const badShadowMode = <template shadowrootmode="public" />;
// @ts-expect-error HTML event handlers are inline strings, not React callbacks
const badEvent = <select onchange={() => {}} />;
// @ts-expect-error MathML display modes are checked
const badMathDisplay = <math display="grid" />;

const v4Attributes = (
  <div
    hx-browser-indicator="true"
    hx-history="false"
    hx-morph-skip="true"
    hx-pending="#pending"
    hx-prompt="Reason?"
    hx-query="/search"
    hx-swap="innerHTML swapEmpty:true"
    {...{
      "hx-live:textContent": "q('#name').value",
      "hx-multipart:connect": "/events",
      "hx-multipart:close": "done",
      "hx-prompt:inherited": "Reason?",
    }}
  />
);

void v4Attributes;

htmx.config.allowEmptySwapAfterOOB = false;
htmx.config.live = { inputDebounce: "100ms", bindPrefix: ":", useDollar: true };
htmx.config.sse = { releaseOn: "first" };
htmx.config.ws = { protocols: ["json", "hcon"] };
htmx.config.multipart = { reconnectDelay: "1s", reconnectMaxAttempts: 5 };
htmx.initialize();
htmx.process(document.body, true);

const interval: number | undefined = htmx.parseInterval(500);
const timeout: Promise<void> | undefined = htmx.timeout("1s");
void interval;
void timeout;

const query = htmx.live?.q(".item");
if (query) {
  query.attr.hidden = true;
  query.aria.busy = true;
  query.class.active = true;
  query.toggle(".view", "grid", "list").insert("into", "<span />");
}
htmx.live?.$(".item").closest("main");
htmx.live?.take(document.body, ".active", { from: "main" });
void htmx.live?.forEvent("click", 1000, document);
void htmx.live?.nextFrame();

document.addEventListener("htmx:finally:swap", (event) => event.detail.ctx);
document.addEventListener("htmx:prompt", (event) => event.detail.prompt);
htmx.on("htmx:prompt", (event) => event.detail.prompt);
document.addEventListener("htmx:multipart:before:part", (event) => {
  event.detail.connection.lastPartId;
  event.detail.waitUntil(event.detail.part.text());
});
document.addEventListener("htmx:sse:before:message", (event) => {
  event.detail.connection.url;
  event.detail.waitUntil(Promise.resolve());
});
document.addEventListener("htmx:ws:before:message:incoming", (event) => {
  event.detail.waitUntil(event.detail.message.text());
});
void new Response().parts();
window.htmxPrompt = (question) => question;

upstreamHtmx.config.allowEmptySwapAfterOOB = false;
upstreamHtmx.initialize();
upstreamHtmx.process(document.body, true);
upstreamHtmx.on("htmx:finally:swap", (event) => event.detail.ctx);

type HtmxEventName = keyof HtmxEventDetailMap;
// @ts-expect-error htmx 4 renamed this event to htmx:finally:swap
const removedEvent: HtmxEventName = "htmx:swap:finally";
// @ts-expect-error final v4 standardized SSE event names under htmx:sse:*
const removedExtensionEvent: HtmxEventName = "htmx:before:sse:message";
void removedEvent;
void removedExtensionEvent;
