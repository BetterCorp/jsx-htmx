declare module "jsx-htmx" {
  import type * as CSS from "csstype";

  class RawText {
    constructor(value: string);
    toString(): string;
  }

  type CssScalar = string | number;
  type CssLeafValue = CssScalar | readonly CssScalar[] | undefined | null;
  type CssDeclaration = CSS.PropertiesFallback<CssScalar> & {
    [selectorOrProperty: string]:
      | CssLeafValue
      | CssDeclaration;
  };
  type CssRules = Record<string, CssDeclaration | undefined>;

  type AttributeValue = number | string | Date | boolean | string[] | RawText;

  interface Children {
    children?: AttributeValue | AttributeValue[];
  }

  interface CustomElementHandler {
    (attributes: Attributes & Children, contents: Array<string | RawText>): string;
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
    ...contents: Array<string | RawText>
  ): string;

  const jsxConfig: JsxConfig;

  const html: HtmlTemplator;
  function css(input: string | CssRules): RawText;
  function js(input: string | (() => unknown)): RawText;

  type Element = string;
}
declare module "jsx-htmx/jsx-runtime" {
  // element-types
  namespace JSX {
    type Booleanish = boolean | "true" | "false";
    type ContentEditableValue = Booleanish | "inherit" | "plaintext-only";
    type CrossOrigin = "anonymous" | "use-credentials" | "";
    type DirValue = "ltr" | "rtl" | "auto";
    type FetchPriority = "high" | "low" | "auto";
    type HiddenValue = boolean | "hidden" | "until-found";
    type InputMode =
      | "none"
      | "text"
      | "tel"
      | "url"
      | "email"
      | "numeric"
      | "decimal"
      | "search";
    type PopoverTargetAction = "hide" | "show" | "toggle";
    type PreloadValue = "none" | "metadata" | "auto";
    type ReferrerPolicy =
      | "no-referrer"
      | "no-referrer-when-downgrade"
      | "origin"
      | "origin-when-cross-origin"
      | "same-origin"
      | "strict-origin"
      | "strict-origin-when-cross-origin"
      | "unsafe-url";
    type SpellcheckValue = boolean | "true" | "false" | "default";
    type TargetValue = "_self" | "_blank" | "_parent" | "_top" | string;
    type TranslateValue = "yes" | "no";

    interface HtmlRequired extends HtmlTag {
      required?: boolean;
    }
    interface HtmlReadOnly extends HtmlTag {
      readonly?: boolean;
    }
    interface HtmlDisabled extends HtmlTag {
      disabled?: boolean;
    }
    interface HtmlTag {
      accesskey?: string;
      autocapitalize?: string;
      class?: string;
      contenteditable?: ContentEditableValue;
      dir?: DirValue;
      enterkeyhint?:
        | "enter"
        | "done"
        | "go"
        | "next"
        | "previous"
        | "search"
        | "send";
      exportparts?: string;
      hidden?: HiddenValue;
      id?: string;
      inert?: boolean;
      inputmode?: InputMode;
      role?: string;
      lang?: string;
      nonce?: string;
      part?: string;
      popover?: "" | "auto" | "manual";
      slot?: string;
      draggable?: boolean | "true" | "false" | "auto";
      spellcheck?: SpellcheckValue;
      style?: string;
      tabindex?: string | number;
      title?: string;
      translate?: TranslateValue;
      [dataAttr: `data-${string}`]: string | number | boolean | undefined;
      [ariaAttr: `aria-${string}`]:
        | string
        | number
        | boolean
        | undefined;
    }
    interface HtmlAnchorTag extends HtmlTag {
      href?: string;
      target?: TargetValue;
      download?: string | boolean;
      ping?: string;
      rel?: string;
      media?: string;
      hreflang?: string;
      referrerpolicy?: ReferrerPolicy;
      type?: string;
    }
    interface HtmlAreaTag extends HtmlTag {
      alt?: string;
      coords?: string;
      shape?: string;
      href?: string;
      target?: TargetValue;
      ping?: string;
      rel?: string;
      media?: string;
      hreflang?: string;
      download?: string | boolean;
      referrerpolicy?: ReferrerPolicy;
      type?: string;
    }
    interface HtmlAudioTag extends HtmlTag {
      src?: string;
      autoplay?: boolean;
      controls?: boolean;
      controlslist?: string;
      crossorigin?: CrossOrigin;
      disableremoteplayback?: boolean;
      loop?: boolean;
      muted?: boolean;
      preload?: PreloadValue;
    }
    interface BaseTag extends HtmlTag {
      href?: string;
      target?: TargetValue;
    }
    interface HtmlQuoteTag extends HtmlTag {
      cite?: string;
    }
    interface HtmlBodyTag extends HtmlTag {}
    interface HtmlButtonTag extends HtmlTag, HtmlDisabled {
      autofocus?: boolean;
      form?: string;
      formaction?: string;
      formenctype?: string;
      formmethod?: string;
      formnovalidate?: boolean;
      formtarget?: TargetValue;
      name?: string;
      popovertarget?: string;
      popovertargetaction?: PopoverTargetAction;
      type?: "submit" | "reset" | "button";
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
      novalidate?: boolean;
      rel?: string;
      target?: TargetValue;
    }
    interface HtmlHtmlTag extends HtmlTag {}
    interface HtmlIFrameTag extends HtmlTag {
      allow?: string;
      allowfullscreen?: boolean;
      height?: string;
      loading?: "eager" | "lazy";
      src?: string;
      srcdoc?: string;
      name?: string;
      referrerpolicy?: ReferrerPolicy;
      sandbox?: string;
      width?: string;
    }
    interface HtmlImageTag extends HtmlTag {
      alt?: string;
      crossorigin?: CrossOrigin;
      decoding?: "sync" | "async" | "auto";
      fetchpriority?: FetchPriority;
      height?: string;
      ismap?: boolean;
      loading?: "eager" | "lazy";
      referrerpolicy?: ReferrerPolicy;
      sizes?: string;
      src?: string;
      srcset?: string;
      usemap?: string;
      width?: string;
    }
    interface HtmlInputTag
      extends HtmlTag,
        HtmlRequired,
        HtmlReadOnly,
        HtmlDisabled {
      accept?: string;
      alt?: string;
      autocomplete?: string;
      autofocus?: boolean;
      capture?: boolean | "user" | "environment";
      checked?: boolean;
      dirname?: string;
      form?: string;
      formaction?: string;
      formenctype?: string;
      formmethod?: string;
      formnovalidate?: boolean;
      formtarget?: TargetValue;
      height?: string;
      inputmode?: InputMode;
      list?: string;
      max?: string;
      maxlength?: string;
      min?: string;
      minlength?: string;
      multiple?: boolean;
      name?: string;
      pattern?: string;
      placeholder?: string;
      popovertarget?: string;
      popovertargetaction?: PopoverTargetAction;
      size?: string;
      src?: string;
      step?: string;
      type?: string;
      value?: string;
      width?: string;
    }
    interface HtmlModTag extends HtmlTag {
      cite?: string;
      datetime?: string | Date;
    }
    interface HtmlLabelTag extends HtmlTag {
      form?: string;
      for?: string;
    }
    interface HtmlLITag extends HtmlTag {
      value?: string | number;
    }
    interface HtmlLinkTag extends HtmlTag {
      as?: string;
      blocking?: string;
      crossorigin?: CrossOrigin;
      disabled?: boolean;
      fetchpriority?: FetchPriority;
      href?: string;
      hreflang?: string;
      imagesizes?: string;
      imagesrcset?: string;
      integrity?: string;
      media?: string;
      referrerpolicy?: ReferrerPolicy;
      rel?: string;
      sizes?: string;
      type?: string;
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
      reversed?: boolean;
      start?: string | number;
    }
    interface HtmlOptgroupTag extends HtmlTag, HtmlDisabled {
      label?: string;
    }
    interface HtmlOptionTag extends HtmlTag, HtmlDisabled {
      label?: string;
      selected?: boolean;
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
    interface HtmlLegendTag extends HtmlTag {}
    interface HtmlMenuTag extends HtmlTag {
      type?: string;
      label?: string;
    }
    interface HtmlScriptTag extends HtmlTag {
      async?: boolean;
      blocking?: string;
      crossorigin?: CrossOrigin;
      defer?: boolean;
      fetchpriority?: FetchPriority;
      integrity?: string;
      nomodule?: boolean;
      nonce?: string;
      referrerpolicy?: ReferrerPolicy;
      src?: string;
      charset?: string;
      text?: string;
      type?: string;
    }
    interface HtmlDetailsTag extends HtmlTag {
      name?: string;
      open?: boolean;
    }
    interface HtmlDialogTag extends HtmlTag {
      open?: boolean;
    }
    interface HtmlSelectTag extends HtmlTag, HtmlRequired, HtmlDisabled {
      autofocus?: boolean;
      form?: string;
      multiple?: boolean;
      name?: string;
      size?: string | number;
    }
    interface HtmlSourceTag extends HtmlTag {
      media?: string;
      sizes?: string;
      src?: string;
      srcset?: string;
      type?: string;
    }
    interface HtmlStyleTag extends HtmlTag {
      media?: string;
      nonce?: string;
      type?: string;
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
      autofocus?: boolean;
      cols?: string;
      dirname?: string;
      form?: string;
      maxlength?: string;
      minlength?: string;
      name?: string;
      placeholder?: string;
      readonly?: boolean;
      rows?: string | number;
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
      default?: boolean;
      kind?: string;
      label?: string;
      src?: string;
      srclang?: string;
    }
    interface HtmlVideoTag extends HtmlTag {
      autoplay?: boolean;
      controls?: boolean;
      controlslist?: string;
      crossorigin?: CrossOrigin;
      disableremoteplayback?: boolean;
      width?: string;
      height?: string;
      loop?: boolean;
      muted?: boolean;
      playsinline?: boolean;
      poster?: string;
      preload?: PreloadValue;
      src?: string;
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
      data: DataTag;
      datalist: HtmlDataListTag;
      dd: HtmlTag;
      del: HtmlModTag;
      details: HtmlDetailsTag;
      dialog: HtmlDialogTag;
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
      picture: HtmlTag;
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
      slot: HtmlTag;
      source: HtmlSourceTag;
      span: HtmlTag;
      strong: HtmlTag;
      style: HtmlStyleTag;
      sub: HtmlTag;
      summary: HtmlTag;
      sup: HtmlTag;
      table: HtmlTableTag;
      tbody: HtmlTableSectionTag;
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
     * Definitions for HTMX v2 attributes and common official extensions.
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
      /**
       * Handle DOM or htmx events inline with the HTMX v2 `hx-on:*` syntax.
       * Examples:
       * - `hx-on:click`
       * - `hx-on:htmx:before-request`
       * - `hx-on::after-request`
       *
       * HTML attribute names are case-insensitive, so event names should use kebab-case in markup.
       * `hx-on::event-name` is shorthand for htmx events.
       *
       * @see https://htmx.org/attributes/hx-on/
       */
      [key: `hx-on:${string}`]: string | undefined;
      /**
       * Handle htmx lifecycle events inline with shorthand syntax.
       *
       * @see https://htmx.org/attributes/hx-on/
       */
      [key: `hx-on::${string}`]: string | undefined;
    }

    interface HtmxExtensions extends HtmxBuiltinExtensions {}

    // typed-html
    interface HtmlTag extends HtmxAttributes {}

    interface HTMLElement extends HtmxAttributes {}
  }
}

interface HtmxPathInfo {
  requestPath?: string;
  finalRequestPath?: string;
  responsePath?: string | null;
  anchor?: string | null;
}

interface HtmxRequestConfig {
  boosted?: boolean;
  useUrlParams?: boolean;
  formData?: FormData;
  parameters?: Record<string, string | string[]>;
  unfilteredParameters?: Record<string, string | string[]>;
  headers?: Record<string, string>;
  target?: Element | null;
  verb?: string;
  errors?: unknown[];
  withCredentials?: boolean;
  timeout?: number;
  path?: string;
  triggeringEvent?: Event;
  elt?: Element;
}

interface HtmxBaseDetail {
  elt: Element;
}

interface HtmxCancelableRequestDetail extends HtmxBaseDetail {
  xhr: XMLHttpRequest;
  target?: Element | null;
  requestConfig?: HtmxRequestConfig;
  boosted?: boolean;
  select?: string;
  pathInfo?: HtmxPathInfo;
}

interface HtmxSwapDetail extends HtmxCancelableRequestDetail {
  shouldSwap?: boolean;
  ignoreTitle?: boolean;
  swapOverride?: string;
  selectOverride?: string;
  serverResponse?: string;
  isError?: boolean;
  successful?: boolean;
  failed?: boolean;
}

interface HtmxLoadDetail extends HtmxBaseDetail {
  xhr: XMLHttpRequest;
  target?: Element | null;
  requestConfig?: HtmxRequestConfig;
}

interface HtmxConfigRequestDetail extends HtmxBaseDetail {
  xhr: XMLHttpRequest;
  target?: Element | null;
  requestConfig?: HtmxRequestConfig;
  path?: string;
  verb?: string;
  headers?: Record<string, string>;
  parameters?: Record<string, string | string[]>;
  unfilteredParameters?: Record<string, string | string[]>;
  triggeringEvent?: Event;
}

interface HtmxConfirmationDetail extends HtmxBaseDetail {
  xhr?: XMLHttpRequest;
  target?: Element | null;
  path?: string;
  verb?: string;
  triggeringEvent?: Event;
  question?: string;
}

interface HtmxPromptDetail extends HtmxBaseDetail {
  prompt?: string | null;
  target?: Element | null;
}

interface HtmxValidationDetail extends HtmxBaseDetail {
  message?: string;
  validity?: ValidityState;
}

interface HtmxSseDetail extends HtmxBaseDetail {
  source?: EventSource;
}

interface HtmxWsDetail extends HtmxBaseDetail {
  socketWrapper?: unknown;
  message?: unknown;
}

interface HtmxEventDetailMap {
  "htmx:abort": HtmxBaseDetail;
  "htmx:afterOnLoad": HtmxLoadDetail;
  "htmx:afterProcessNode": HtmxBaseDetail;
  "htmx:afterRequest": HtmxSwapDetail;
  "htmx:afterSettle": HtmxSwapDetail;
  "htmx:afterSwap": HtmxSwapDetail;
  "htmx:beforeCleanupElement": HtmxBaseDetail;
  "htmx:beforeOnLoad": HtmxLoadDetail;
  "htmx:beforeProcessNode": HtmxBaseDetail;
  "htmx:beforeRequest": HtmxCancelableRequestDetail;
  "htmx:beforeSend": HtmxCancelableRequestDetail;
  "htmx:beforeSwap": HtmxSwapDetail;
  "htmx:configRequest": HtmxConfigRequestDetail;
  "htmx:confirm": HtmxConfirmationDetail;
  "htmx:historyCacheError": HtmxBaseDetail;
  "htmx:historyCacheMiss": HtmxCancelableRequestDetail;
  "htmx:historyCacheMissError": HtmxCancelableRequestDetail;
  "htmx:historyCacheMissLoad": HtmxCancelableRequestDetail;
  "htmx:historyRestore": HtmxBaseDetail;
  "htmx:beforeHistorySave": HtmxBaseDetail;
  "htmx:load": HtmxLoadDetail;
  "htmx:noSSESourceError": HtmxSseDetail;
  "htmx:oobAfterSwap": HtmxSwapDetail;
  "htmx:oobBeforeSwap": HtmxSwapDetail;
  "htmx:prompt": HtmxPromptDetail;
  "htmx:pushedIntoHistory": HtmxBaseDetail;
  "htmx:responseError": HtmxSwapDetail;
  "htmx:sendAbort": HtmxCancelableRequestDetail;
  "htmx:sendError": HtmxCancelableRequestDetail;
  "htmx:sseClose": HtmxSseDetail;
  "htmx:sseError": HtmxSseDetail;
  "htmx:sseOpen": HtmxSseDetail;
  "htmx:swapError": HtmxSwapDetail;
  "htmx:targetError": HtmxCancelableRequestDetail;
  "htmx:timeout": HtmxCancelableRequestDetail;
  "htmx:validation:validate": HtmxValidationDetail;
  "htmx:validation:failed": HtmxValidationDetail;
  "htmx:validation:halted": HtmxValidationDetail;
  "htmx:xhr:abort": HtmxCancelableRequestDetail;
  "htmx:xhr:loadend": HtmxCancelableRequestDetail;
  "htmx:xhr:loadstart": HtmxCancelableRequestDetail;
  "htmx:xhr:progress": HtmxCancelableRequestDetail & { loaded?: number; total?: number; lengthComputable?: boolean };
  "htmx:xhr:error": HtmxCancelableRequestDetail;
  "htmx:wsAfterMessage": HtmxWsDetail;
  "htmx:wsBeforeMessage": HtmxWsDetail;
  "htmx:wsClose": HtmxWsDetail;
  "htmx:wsError": HtmxWsDetail;
  "htmx:wsOpen": HtmxWsDetail;
}

type HtmxCustomEventMap = {
  [K in keyof HtmxEventDetailMap]: CustomEvent<HtmxEventDetailMap[K]>;
};

interface DocumentEventMap extends HtmxCustomEventMap {}

interface HTMLElementEventMap extends HtmxCustomEventMap {}

interface WindowEventMap extends HtmxCustomEventMap {}
