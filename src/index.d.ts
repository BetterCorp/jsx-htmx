declare module "jsx-htmx" {
  type AttributeValue = number | string | Date | boolean | string[];

  interface Children {
    children?: AttributeValue;
  }

  interface CustomElementHandler {
    (attributes: Attributes & Children, contents: string[]): string;
  }

  interface Attributes {
    [key: string]: AttributeValue;
  }

  type CustomComponentPropDerivedDefinition<CustomComponentType = null> =
    CustomComponentType extends null
      ? Children
      : CustomComponentType & Children;
  type CustomComponentPropDefinition<
    CustomComponentType = null,
    Props = null
  > = Props extends null
    ? CustomComponentPropDerivedDefinition<CustomComponentType>
    : Props & CustomComponentPropDerivedDefinition<CustomComponentType>;
  type CustomComponent<CustomComponentType = null, Props = null> = {
    (props: CustomComponentPropDefinition<CustomComponentType, Props>):
      | Element
      | string
      | null;
  };
  type SimpleCustomComponent<Props = null> = CustomComponent<null, Props>;

  interface JsxConfig {
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

  type Sanitizer = false | ((raw: string, originalType: string) => string);

  type InterpValue =
    | { $$child: unknown }
    | { $$children: unknown[] }
    | { $$spread: unknown }
    | Record<string, unknown>;

  type HtmlTemplator<Output = string> = (
    raw: TemplateStringsArray,
    ...values: InterpValue[]
  ) => Output;

  function createElement(
    name: string | CustomElementHandler,
    attributes: (Attributes & Children) | undefined = {},
    ...contents: string[]
  ): string;

  const jsxConfig: JsxConfig;

  const html: HtmlTemplator;

  type Element = string;
}
declare module "jsx-htmx/jsx-runtime" {
  // element-types
  namespace JSX {
    interface HtmlRequired extends HtmlTag {
      required?: boolean;
    }
    interface HtmlReadOnly extends HtmlTag {
      readonly?: string;
    }
    interface HtmlDisabled extends HtmlTag {
      disabled?: string;
    }
    interface HtmlTag {
      accesskey?: string;
      class?: string;
      contenteditable?: string;
      dir?: string;
      hidden?: string | boolean;
      id?: string;
      role?: string;
      lang?: string;
      draggable?: string | boolean;
      spellcheck?: string | boolean;
      style?: string;
      tabindex?: string;
      title?: string;
      translate?: string | boolean;
    }
    interface HtmlAnchorTag extends HtmlTag {
      href?: string;
      target?: string;
      download?: string;
      ping?: string;
      rel?: string;
      media?: string;
      hreflang?: string;
      type?: string;
    }
    interface HtmlAreaTag extends HtmlTag {
      alt?: string;
      coords?: string;
      shape?: string;
      href?: string;
      target?: string;
      ping?: string;
      rel?: string;
      media?: string;
      hreflang?: string;
      type?: string;
    }
    interface HtmlAudioTag extends HtmlTag {
      src?: string;
      autobuffer?: string;
      autoplay?: string;
      loop?: string;
      controls?: string;
    }
    interface BaseTag extends HtmlTag {
      href?: string;
      target?: string;
    }
    interface HtmlQuoteTag extends HtmlTag {
      cite?: string;
    }
    interface HtmlBodyTag extends HtmlTag {}
    interface HtmlButtonTag extends HtmlTag, HtmlDisabled {
      action?: string;
      autofocus?: string;
      enctype?: string;
      form?: string;
      method?: string;
      name?: string;
      novalidate?: string | boolean;
      target?: string;
      type?: string;
      value?: string;
    }
    interface HtmlDataListTag extends HtmlTag {}
    interface HtmlCanvasTag extends HtmlTag {
      width?: string;
      height?: string;
    }
    interface HtmlTableColTag extends HtmlTag {
      span?: string;
    }
    interface HtmlTableSectionTag extends HtmlTag {}
    interface HtmlTableRowTag extends HtmlTag {}
    interface DataTag extends HtmlTag {
      value?: string;
    }
    interface HtmlEmbedTag extends HtmlTag {
      src?: string;
      type?: string;
      width?: string;
      height?: string;
      // TODO: MAKE THIS WORK WITH HTMX
      // [anything: string]: string | boolean | undefined;
    }
    interface HtmlFieldSetTag extends HtmlTag, HtmlDisabled {
      form?: string;
      name?: string;
    }
    interface HtmlFormTag extends HtmlTag {
      acceptCharset?: string;
      action?: string;
      autocomplete?: string;
      enctype?: string;
      method?: string;
      name?: string;
      novalidate?: string | boolean;
      target?: string;
    }
    interface HtmlHtmlTag extends HtmlTag {
      manifest?: string;
    }
    interface HtmlIFrameTag extends HtmlTag {
      src?: string;
      srcdoc?: string;
      name?: string;
      sandbox?: string;
      seamless?: string;
      width?: string;
      height?: string;
    }
    interface HtmlImageTag extends HtmlTag {
      alt?: string;
      src?: string;
      crossorigin?: string;
      usemap?: string;
      ismap?: string;
      width?: string;
      height?: string;
    }
    interface HtmlInputTag
      extends HtmlTag,
        HtmlRequired,
        HtmlReadOnly,
        HtmlDisabled {
      accept?: string;
      action?: string;
      alt?: string;
      autocomplete?: string;
      autofocus?: string;
      checked?: string | boolean;
      enctype?: string;
      form?: string;
      height?: string;
      list?: string;
      max?: string;
      maxlength?: string;
      method?: string;
      min?: string;
      multiple?: string;
      name?: string;
      novalidate?: string | boolean;
      pattern?: string;
      placeholder?: string;
      size?: string;
      src?: string;
      step?: string;
      target?: string;
      type?: string;
      value?: string;
      width?: string;
    }
    interface HtmlModTag extends HtmlTag {
      cite?: string;
      datetime?: string | Date;
    }
    interface KeygenTag extends HtmlTag, HtmlDisabled {
      autofocus?: string;
      challenge?: string;
      form?: string;
      keytype?: string;
      name?: string;
    }
    interface HtmlLabelTag extends HtmlTag {
      form?: string;
      for?: string;
    }
    interface HtmlLITag extends HtmlTag {
      value?: string | number;
    }
    interface HtmlLinkTag extends HtmlTag {
      href?: string;
      crossorigin?: string;
      rel?: string;
      media?: string;
      hreflang?: string;
      type?: string;
      sizes?: string;
      integrity?: string;
    }
    interface HtmlMapTag extends HtmlTag {
      name?: string;
    }
    interface HtmlMetaTag extends HtmlTag {
      name?: string;
      httpEquiv?: string;
      content?: string;
      charset?: string;
    }
    interface HtmlMeterTag extends HtmlTag {
      value?: string | number;
      min?: string | number;
      max?: string | number;
      low?: string | number;
      high?: string | number;
      optimum?: string | number;
    }
    interface HtmlObjectTag extends HtmlTag {
      data?: string;
      type?: string;
      name?: string;
      usemap?: string;
      form?: string;
      width?: string;
      height?: string;
    }
    interface HtmlOListTag extends HtmlTag {
      reversed?: string;
      start?: string | number;
    }
    interface HtmlOptgroupTag extends HtmlTag, HtmlDisabled {
      label?: string;
    }
    interface HtmlOptionTag extends HtmlTag, HtmlDisabled {
      label?: string;
      selected?: string;
      value?: string;
    }
    interface HtmlOutputTag extends HtmlTag {
      for?: string;
      form?: string;
      name?: string;
    }
    interface HtmlParamTag extends HtmlTag {
      name?: string;
      value?: string;
    }
    interface HtmlProgressTag extends HtmlTag {
      value?: string | number;
      max?: string | number;
    }
    interface HtmlCommandTag extends HtmlTag, HtmlDisabled {
      type?: string;
      label?: string;
      icon?: string;
      checked?: string;
      radiogroup?: string;
      default?: string;
    }
    interface HtmlLegendTag extends HtmlTag {}
    interface HtmlBrowserButtonTag extends HtmlTag {
      type?: string;
    }
    interface HtmlMenuTag extends HtmlTag {
      type?: string;
      label?: string;
    }
    interface HtmlScriptTag extends HtmlTag {
      src?: string;
      type?: string;
      charset?: string;
      async?: string;
      defer?: string;
      crossorigin?: string;
      integrity?: string;
      text?: string;
    }
    interface HtmlDetailsTag extends HtmlTag {
      open?: string;
    }
    interface HtmlSelectTag extends HtmlTag, HtmlRequired, HtmlDisabled {
      autofocus?: string;
      form?: string;
      multiple?: string;
      name?: string;
      size?: string;
    }
    interface HtmlSourceTag extends HtmlTag {
      src?: string;
      type?: string;
      media?: string;
    }
    interface HtmlStyleTag extends HtmlTag, HtmlDisabled {
      media?: string;
      type?: string;
      scoped?: string;
    }
    interface HtmlTableTag extends HtmlTag {}
    interface HtmlTableDataCellTag extends HtmlTag {
      colspan?: string | number;
      rowspan?: string | number;
      headers?: string;
    }
    interface HtmlTextAreaTag
      extends HtmlTag,
        HtmlRequired,
        HtmlReadOnly,
        HtmlDisabled {
      autofocus?: string;
      cols?: string;
      dirname?: string;
      form?: string;
      maxlength?: string;
      minlength?: string;
      name?: string;
      placeholder?: string;
      rows?: string;
      wrap?: string;
    }
    interface HtmlTableHeaderCellTag extends HtmlTag {
      colspan?: string | number;
      rowspan?: string | number;
      headers?: string;
      scope?: string;
    }
    interface HtmlTimeTag extends HtmlTag {
      datetime?: string | Date;
    }
    interface HtmlTrackTag extends HtmlTag {
      default?: string;
      kind?: string;
      label?: string;
      src?: string;
      srclang?: string;
    }
    interface HtmlVideoTag extends HtmlTag {
      src?: string;
      poster?: string;
      autobuffer?: string;
      autoplay?: string;
      loop?: string;
      controls?: string;
      width?: string;
      height?: string;
    }

    // events
    interface HtmlBodyTag {
      onafterprint?: string;
      onbeforeprint?: string;
      onbeforeonload?: string;
      onblur?: string;
      onerror?: string;
      onfocus?: string;
      onhaschange?: string;
      onload?: string;
      onmessage?: string;
      onoffline?: string;
      ononline?: string;
      onpagehide?: string;
      onpageshow?: string;
      onpopstate?: string;
      onredo?: string;
      onresize?: string;
      onstorage?: string;
      onundo?: string;
      onunload?: string;
    }
    interface HtmlTag {
      oncontextmenu?: string;
      onkeydown?: string;
      onkeypress?: string;
      onkeyup?: string;
      onclick?: string;
      ondblclick?: string;
      ondrag?: string;
      ondragend?: string;
      ondragenter?: string;
      ondragleave?: string;
      ondragover?: string;
      ondragstart?: string;
      ondrop?: string;
      onmousedown?: string;
      onmousemove?: string;
      onmouseout?: string;
      onmouseover?: string;
      onmouseup?: string;
      onmousewheel?: string;
      onscroll?: string;
    }
    interface FormEvents {
      onblur?: string;
      onchange?: string;
      onfocus?: string;
      onformchange?: string;
      onforminput?: string;
      oninput?: string;
      oninvalid?: string;
      onselect?: string;
      onsubmit?: string;
    }
    interface HtmlInputTag extends FormEvents {}
    interface HtmlFieldSetTag extends FormEvents {}
    interface HtmlFormTag extends FormEvents {}
    interface MediaEvents {
      onabort?: string;
      oncanplay?: string;
      oncanplaythrough?: string;
      ondurationchange?: string;
      onemptied?: string;
      onended?: string;
      onerror?: string;
      onloadeddata?: string;
      onloadedmetadata?: string;
      onloadstart?: string;
      onpause?: string;
      onplay?: string;
      onplaying?: string;
      onprogress?: string;
      onratechange?: string;
      onreadystatechange?: string;
      onseeked?: string;
      onseeking?: string;
      onstalled?: string;
      onsuspend?: string;
      ontimeupdate?: string;
      onvolumechange?: string;
      onwaiting?: string;
    }
    interface HtmlAudioTag extends MediaEvents {}
    interface HtmlEmbedTag extends MediaEvents {}
    interface HtmlImageTag extends MediaEvents {}
    interface HtmlObjectTag extends MediaEvents {}
    interface HtmlVideoTag extends MediaEvents {}

    // intrinsic-elements
    type Element = string;
    interface IntrinsicElements {
      a: HtmlAnchorTag;
      abbr: HtmlTag;
      address: HtmlTag;
      area: HtmlAreaTag;
      article: HtmlTag;
      aside: HtmlTag;
      audio: HtmlAudioTag;
      b: HtmlTag;
      bb: HtmlBrowserButtonTag;
      base: BaseTag;
      bdi: HtmlTag;
      bdo: HtmlTag;
      blockquote: HtmlQuoteTag;
      body: HtmlBodyTag;
      br: HtmlTag;
      button: HtmlButtonTag;
      canvas: HtmlCanvasTag;
      caption: HtmlTag;
      cite: HtmlTag;
      code: HtmlTag;
      col: HtmlTableColTag;
      colgroup: HtmlTableColTag;
      commands: HtmlCommandTag;
      data: DataTag;
      datalist: HtmlDataListTag;
      dd: HtmlTag;
      del: HtmlModTag;
      details: HtmlDetailsTag;
      dfn: HtmlTag;
      div: HtmlTag;
      dl: HtmlTag;
      dt: HtmlTag;
      em: HtmlTag;
      embed: HtmlEmbedTag;
      fieldset: HtmlFieldSetTag;
      figcaption: HtmlTag;
      figure: HtmlTag;
      footer: HtmlTag;
      form: HtmlFormTag;
      h1: HtmlTag;
      h2: HtmlTag;
      h3: HtmlTag;
      h4: HtmlTag;
      h5: HtmlTag;
      h6: HtmlTag;
      head: HtmlTag;
      header: HtmlTag;
      hr: HtmlTag;
      html: HtmlHtmlTag;
      i: HtmlTag;
      iframe: HtmlIFrameTag;
      img: HtmlImageTag;
      input: HtmlInputTag;
      ins: HtmlModTag;
      kbd: HtmlTag;
      keygen: KeygenTag;
      label: HtmlLabelTag;
      legend: HtmlLegendTag;
      li: HtmlLITag;
      link: HtmlLinkTag;
      main: HtmlTag;
      map: HtmlMapTag;
      mark: HtmlTag;
      menu: HtmlMenuTag;
      meta: HtmlMetaTag;
      meter: HtmlMeterTag;
      nav: HtmlTag;
      noscript: HtmlTag;
      object: HtmlObjectTag;
      ol: HtmlOListTag;
      optgroup: HtmlOptgroupTag;
      option: HtmlOptionTag;
      output: HtmlOutputTag;
      p: HtmlTag;
      param: HtmlParamTag;
      pre: HtmlTag;
      progress: HtmlProgressTag;
      q: HtmlQuoteTag;
      rb: HtmlTag;
      rp: HtmlTag;
      rt: HtmlTag;
      rtc: HtmlTag;
      ruby: HtmlTag;
      s: HtmlTag;
      samp: HtmlTag;
      script: HtmlScriptTag;
      section: HtmlTag;
      select: HtmlSelectTag;
      small: HtmlTag;
      source: HtmlSourceTag;
      span: HtmlTag;
      strong: HtmlTag;
      style: HtmlStyleTag;
      sub: HtmlTag;
      sup: HtmlTag;
      table: HtmlTableTag;
      tbody: HtmlTag;
      td: HtmlTableDataCellTag;
      template: HtmlTag;
      textarea: HtmlTextAreaTag;
      tfoot: HtmlTableSectionTag;
      th: HtmlTableHeaderCellTag;
      thead: HtmlTableSectionTag;
      time: HtmlTimeTag;
      title: HtmlTag;
      tr: HtmlTableRowTag;
      track: HtmlTrackTag;
      u: HtmlTag;
      ul: HtmlTag;
      var: HtmlTag;
      video: HtmlVideoTag;
      wbr: HtmlTag;
    }

    // HTMX

    /**
     * Provides type definitions in JSX for htmx attributes.
     * @module
     */

    /**
     * Either `"true"` or `"false"`.
     */
    type BoolStr = "true" | "false";
    type AnyStr = string & {};
    type HxSwap =
      | "innerHTML"
      | "outerHTML"
      | "beforebegin"
      | "afterbegin"
      | "beforeend"
      | "afterend"
      | "delete"
      | "none"
      | "morph"
      | "morphdom";

    /**
     * Either `this` which refers to the element itself, or a modifier followed by a CSS selector, e.g. `closest form`.
     */
    type HxTarget = "this" | "closest " | "find " | "next " | "previous ";

    /**
     * A CSS selector, followed by one of these sync strategies, e.g. `form:abort`.
     */
    type HxSync =
      | ":drop"
      | ":abort"
      | ":replace"
      | ":queue"
      | ":queue first"
      | ":queue last"
      | ":queue all";

    /**
     * An event followed by one of these modifiers, e.g. `click once`.
     */
    type HxTriggerModifier =
      | " once"
      | " changed"
      | " delay:"
      | " throttle:"
      | " from:"
      | " target:"
      | " consume"
      | " queue:first"
      | " queue:last"
      | " queue:all"
      | " queue:none";

    /**
     * An extensible directory of htmx extensions.
     *
     * ### Declaring a new extension
     *
     * ```tsx twoslash
     * // in foo.d.ts:
     *
     * declare global {
     *     namespace JSX {
     *         interface HtmxExtensions {
     *             myExtension: "my-extension";
     *         }
     *         interface HtmlTag {
     *             /** Describe your attribute *\/
     *             ["my-extension-attr"]?: string;
     *             // Add any other attributes your extension uses here
     *         }
     *     }
     * }
     *
     * <div hx-ext="my-extension">
     *   <span my-extension-attr="foo">Hello</span>
     * </div>
     * ```
     */
    interface HtmxBuiltinExtensions {
      /**
       * Includes the commonly-used `X-Requested-With` header that identifies ajax requests in many backend frameworks.
       *
       * CDN: https://unpkg.com/htmx.org/dist/ext/ajax-header.js
       * @see https://htmx.org/extensions/ajax-header/
       */
      ajaxHeaders: "ajax-headers";
      /**
       * Server-Sent Events.
       *
       * CDN: https://unpkg.com/htmx.org/dist/ext/sse.js
       * @see https://htmx.org/extensions/server-sent-events/
       */
      serverSentEvents: "sse";
      /**
       * WebSockets support.
       *
       * CDN: https://unpkg.com/htmx.org/dist/ext/ws.js
       * @see https://htmx.org/extensions/web-sockets/
       */
      ws: "ws";
      /**
       * Class utilities.
       *
       * CDN: https://unpkg.com/htmx.org/dist/ext/class-tools.js
       * @see https://htmx.org/extensions/class-tools/
       */
      classTools: "class-tools";
      /**
       * Tool for debugging htmx requests.
       *
       * CDN: https://unpkg.com/htmx.org/dist/ext/debug.js
       * @see https://htmx.org/extensions/debug/
       */
      debug: "debug";
      /**
       * Disable elements during requests.
       *
       * CDN: https://unpkg.com/htmx.org/dist/ext/disable-element.js
       * @see https://htmx.org/extensions/disable-element/
       */
      disableElement: "disable-element";
      /**
       * Includes a JSON serialized version of the triggering event, if any.
       *
       * CDN: https://unpkg.com/htmx.org/dist/ext/event-header.js
       * @see https://htmx.org/extensions/event-header/
       */
      eventHeader: "event-header";
      /**
       * Support for adding tags to `<head>`.
       *
       * CDN: https://unpkg.com/htmx.org/dist/ext/head-support.js
       * @see https://htmx.org/extensions/head-support/
       */
      headSupport: "head-support";
      /**
       * Support for [Idiomorph](https://github.com/bigskysoftware/idiomorph), an alternative swapping mechanism for htmx.
       *
       * CDN: https://unpkg.com/idiomorph/dist/idiomorph-ext.min.js
       * @see https://github.com/bigskysoftware/idiomorph#htmx
       */
      idiomorph: "morph";
      /**
       * Use JSON encoding in the body of requests, rather than the default `x-www-form-urlencoded`.
       *
       * CDN: https://unpkg.com/htmx.org/dist/ext/json-enc.js
       * @see https://htmx.org/extensions/json-enc/
       */
      jsonEncode: "json-enc";
      /**
       * Support for inflight loading states.
       *
       * CDN: https://unpkg.com/htmx.org/dist/ext/loading-states.js
       * @see https://htmx.org/extensions/loading-states/
       */
      loadingStates: "loading-states";
      /**
       * Support for [morphdom](https://github.com/patrick-steele-idem/morphdom),
       * an alternative swapping mechanism for htmx.
       *
       * CDN: https://unpkg.com/htmx.org/dist/ext/morphdom-swap.js
       * @see https://htmx.org/extensions/morphdom-swap/
       */
      morphdom: "morphdom";
    }

    /**
     * Definitions for htmx attributes up to 1.9.3.
     */
    interface HtmxAttributes {
      /** @ignore For React compatibility only. */
      children?: {};
      /** @ignore For React compatibility only. */
      key?: {};
      /**
       * Issues a `GET` to the specified URL.
       * @see https://htmx.org/attributes/hx-get/
       * @category Core
       */
      ["hx-get"]?: string;
      /**
       * Issues a `POST` to the specified URL.
       * @see https://htmx.org/attributes/hx-post/
       * @category Core
       */
      ["hx-post"]?: string;
      /**
       * Issues a `PUT` to the specified URL.
       * @see https://htmx.org/attributes/hx-put/
       */
      ["hx-put"]?: string;
      /**
       * Issues a `DELETE` to the specified URL.
       * @see https://htmx.org/attributes/hx-delete/
       */
      ["hx-delete"]?: string;
      /**
       * Issues a `PATCH` to the specified URL.
       * @see https://htmx.org/attributes/hx-patch/
       */
      ["hx-patch"]?: string;
      /**
       * Add or remove [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
       * for links and forms.
       *
       * @see https://htmx.org/attributes/hx-boost/
       * @category Core
       */
      ["hx-boost"]?: BoolStr;
      /**
       * Handle any event with a script inline.
       * @see https://htmx.org/attributes/hx-on/
       * @category Core
       * @remarks Event listeners on htmx-specific events need to be specified with a spread attribute, and
       * 			 		are otherwise not supported in vanilla JSX.
       * ```jsx
       * <div {...{'hx-on::before-request': '...'}} />
       * ```
       * @since 1.9.3
       */
      ["hx-on:"]?: string;
      /**
       * Handle any event with a script inline. Each listener is specified on a separate line.
       * @see https://htmx.org/attributes/hx-on/
       * @remarks Superseded by `hx-on:$event`, unless IE11 support is required.
       * @since 1.9.0
       */
      ["hx-on"]?: string;
      /**
       * Pushes the URL into the browser location bar, creating a new history entry.
       * @see https://htmx.org/attributes/hx-push-url/
       * @category Core
       */
      ["hx-push-url"]?: BoolStr | AnyStr;
      /**
       * Select content to swap in from a response.
       * @see https://htmx.org/attributes/hx-select/
       * @category Core
       */
      ["hx-select"]?: string;
      /**
       * Select content to swap in from a response, out of band (somewhere other than the target).
       * @see https://htmx.org/attributes/hx-select-oob/
       * @category Core
       */
      ["hx-select-oob"]?: string;
      /**
       * Controls how content is swapped in (`outerHTML`, `beforeend`, `afterend`, …).
       * @see https://htmx.org/attributes/hx-swap/
       * @see [`InsertPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML#position) which is used in `Element.insertAdjacentHTML`.
       * @category Core
       * @remarks
       * - `morph` swaps are part of the {@linkcode HtmxBuiltinExtensions.idiomorph idiomorph} extension.
       * - `morphdom` swaps are part of the {@linkcode HtmxBuiltinExtensions.morphdom morphdom} extension.
       */
      ["hx-swap"]?: HxSwap | AnyStr;
      /**
       * Marks content in a response to be out of band (should swap in somewhere other than the target).
       * @see https://htmx.org/attributes/hx-swap-oob/
       */
      ["hx-swap-oob"]?: "true" | HxSwap | AnyStr;
      /**
       * Specifies the target element to be swapped.
       * @see https://htmx.org/attributes/hx-target/
       * @category Core
       */
      ["hx-target"]?: HxTarget | AnyStr;
      /**
       * Specifies the event that triggers the request.
       * @see https://htmx.org/attributes/hx-trigger/
       * @category Core
       */
      ["hx-trigger"]?: "every " | HxTriggerModifier | AnyStr;
      /**
       * Adds values to the parameters to submit with the request (JSON-formatted).
       * @see https://htmx.org/attributes/hx-params/
       * @category Core
       */
      ["hx-vals"]?:
        | AnyStr
        | "javascript:"
        | "js:"
        | Record<PropertyKey, unknown>;
      /**
       * Shows a `confirm()` dialog before issuing a request.
       * @see https://htmx.org/attributes/hx-confirm/
       */
      ["hx-confirm"]?: string;
      /**
       * Disables htmx processing for the given node and any children nodes.
       * @see https://htmx.org/attributes/hx-disable/
       */
      ["hx-disable"]?: boolean;
      /**
       * Control and disable automatic attribute inheritance for child nodes.
       * @see https://htmx.org/attributes/hx-disinherit/
       */
      ["hx-disinherit"]?: "*" | AnyStr;
      /**
       * Changes the request encoding type.
       * @see https://htmx.org/attributes/hx-encoding/
       */
      ["hx-encoding"]?: "multipart/form-data";
      /**
       * Extensions to use for this element.
       * @see https://htmx.org/attributes/hx-ext/
       * @see {@linkcode HtmxBuiltinExtensions} for how to declare extensions in JSX.
       */
      ["hx-ext"]?:
        | JSX.HtmxExtensions[keyof JSX.HtmxExtensions]
        | "ignore:"
        | AnyStr;
      /**
       * Adds to the headers that will be submitted with the request.
       * @see https://htmx.org/attributes/hx-headers/
       */
      ["hx-headers"]?:
        | AnyStr
        | "javascript:"
        | "js:"
        | Record<PropertyKey, unknown>;
      /**
       * Prevent sensitive data being saved to the history cache.
       * @see https://htmx.org/attributes/hx-history/
       */
      ["hx-history"]?: "false";
      /**
       * The element to snapshot and restore during history navigation.
       * @see https://htmx.org/attributes/hx-history-elt/
       */
      ["hx-history-elt"]?: boolean;
      /**
       * Include additional data in requests.
       * @see https://htmx.org/attributes/hx-include/
       */
      ["hx-include"]?: string;
      /**
       * The element to put the `htmx-request` class on during the request.
       * @see https://htmx.org/attributes/hx-indicator/
       */
      ["hx-indicator"]?: string;
      /**
       * Filters the parameters that will be submitted with a request.
       * @see https://htmx.org/attributes/hx-params/
       */
      ["hx-params"]?: "*" | "none" | "not " | AnyStr;
      /**
       * Specifies elements to keep unchanged between requests.
       * @see https://htmx.org/attributes/hx-preserve/
       * @remarks `true` is only observed by the `head-support` extension,
       * 			 		where it prevents an element from being removed from the `<head>`.
       */
      ["hx-preserve"]?: boolean | "true";
      /**
       * Shows a `prompt()` before submitting a request.
       * @see https://htmx.org/attributes/hx-prompt/
       */
      ["hx-prompt"]?: string;
      /**
       * Replace the URL in the browser location bar.
       * @see https://htmx.org/attributes/hx-replace-url/
       */
      ["hx-replace-url"]?: BoolStr | AnyStr;
      /**
       * Configures various aspects of the request.
       * @see https://htmx.org/attributes/hx-request/
       */
      ["hx-request"]?:
        | '"timeout":'
        | '"credentials":'
        | '"noHeaders":'
        | "javascript:"
        | "js:"
        | AnyStr;
      /**
       * Control how requests made by different elements are synchronized.
       * @see https://htmx.org/attributes/hx-sync/
       */
      ["hx-sync"]?: HxSync | AnyStr;
      /**
       * Force elements to validate themselves before a request.
       * @see https://htmx.org/attributes/hx-validate/
       */
      ["hx-validate"]?: boolean;
      /**
       * Adds values dynamically to the parameters to submit with the request.
       * @deprecated superseded by `hx-vals`
       */
      ["hx-vars"]?: AnyStr;
      /**
       * The URL of the SSE server.
       * @see https://htmx.org/extensions/server-sent-events/
       */
      ["sse-connect"]?: string;
      /**
       * The name of the message to swap into the DOM.
       * @see https://htmx.org/extensions/server-sent-events/
       */
      ["sse-swap"]?: string;
      /**
       * A URL to establish a WebSocket connection against.
       * @see https://htmx.org/extensions/web-sockets/
       */
      ["ws-connect"]?: string;
      /**
       * Sends a message to the nearest websocket based on the trigger value for the element.
       * @see https://htmx.org/extensions/web-sockets/
       */
      ["ws-send"]?: boolean;
      /**
       * Apply class transitions on this element.
       * @see https://htmx.org/extensions/class-tools/
       */
      ["classes"]?: "add " | "remove " | "toggle " | AnyStr;
      /**
       * The element or elements to disable during requests.
       * Accepts CSS selectors.
       * @see https://htmx.org/extensions/disable-element/
       */
      ["hx-disable-element"]?: "self" | AnyStr;
      /**
       * The strategy for merging new head content.
       * @see https://htmx.org/extensions/head-support/
       */
      ["hx-head"]?: "merge" | "append" | "re-eval";
      /**
       * Attach [hyperscript](https://hyperscript.org/docs) behavior to this element.
       * Available separately from htmx.
       *
       * CDN: https://unpkg.com/hyperscript.org
       */
      _?: AnyStr;
    }

    interface HtmxExtensions extends HtmxBuiltinExtensions {}

    // typed-html
    interface HtmlTag extends HtmxAttributes {}

    interface HTMLElement extends HtmxAttributes {}
  }
}
