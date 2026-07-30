/** @jsxImportSource jsx-htmx */

import upstreamHtmx from "htmx.org";

const beta6Attributes = (
  <div
    hx-browser-indicator="true"
    hx-history="false"
    hx-prompt="Reason?"
    hx-swap="innerHTML swapEmpty:true"
    {...{
      "hx-live:textContent": "q('#name').value",
      "hx-multipart:connect": "/events",
      "hx-multipart:close": "done",
      "hx-prompt:inherited": "Reason?",
    }}
  />
);

void beta6Attributes;

htmx.config.defaultSwapEmpty = false;
htmx.config.ws = { protocols: ["json", "hcon"] };
htmx.config.multipart = { reconnectDelay: "1s", reconnectMaxAttempts: 5 };
htmx.process(document.body, true);

const interval: number | undefined = htmx.parseInterval(500);
const timeout: Promise<void> | undefined = htmx.timeout("1s");
void interval;
void timeout;

const query = htmx.live?.q(".item");
query?.attr("hidden", true).toggle(".active").insert("end", "<span />");
htmx.live?.take(document.body, ".active", { from: "main" });
void htmx.live?.forEvent("click", 1000, document);
void htmx.live?.nextFrame();

document.addEventListener("htmx:finally:swap", (event) => event.detail.ctx);
document.addEventListener("htmx:prompt", (event) => event.detail.prompt);
htmx.on("htmx:prompt", (event) => event.detail.prompt);
document.addEventListener("htmx:multipart:before:part", (event) => {
  event.detail.waitUntil(event.detail.part.text());
});
void new Response().parts();
window.htmxPrompt = (question) => question;

upstreamHtmx.config.defaultSwapEmpty = false;
upstreamHtmx.process(document.body, true);
upstreamHtmx.on("htmx:finally:swap", (event) => event.detail.ctx);

type HtmxEventName = keyof HtmxEventDetailMap;
// @ts-expect-error beta6 renamed this event to htmx:finally:swap
const removedEvent: HtmxEventName = "htmx:swap:finally";
void removedEvent;
