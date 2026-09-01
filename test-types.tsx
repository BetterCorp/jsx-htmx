/** @jsxImportSource jsx-htmx */

import upstreamHtmx from "htmx.org";

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
