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
  type ChildContent = string | RawText | ChildContent[];

  interface Children {
    children?: AttributeValue | ChildContent[];
  }

  interface CustomElementHandler {
    (attributes: Attributes & Children, contents: ChildContent[]): string;
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
    attributes?: (Attributes & Children) | undefined,
    ...contents: ChildContent[]
  ): string;

  const jsxConfig: JsxConfig;

  const html: HtmlTemplator;
  function css(input: string | CssRules): RawText;
  function js(input: string | (() => unknown)): RawText;
  function raw(input: string): RawText;

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
      [dataAttr: `data-${string}`]:
        | string
        | number
        | boolean
        | Record<PropertyKey, unknown>
        | undefined;
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

    type BoolStr = "true" | "false";
    type AnyStr = string & {};
    type HxJson =
      | AnyStr
      | "javascript:"
      | "js:"
      | Record<PropertyKey, unknown>;
    type HxConfig = AnyStr | Record<PropertyKey, unknown>;
    type HxRequestMethod =
      | "get"
      | "post"
      | "put"
      | "patch"
      | "delete"
      | "query"
      | "GET"
      | "POST"
      | "PUT"
      | "PATCH"
      | "DELETE"
      | "QUERY";
    type HxSwap =
      | "innerHTML"
      | "outerHTML"
      | "outerSync"
      | "textContent"
      | "before"
      | "beforebegin"
      | "prepend"
      | "afterbegin"
      | "append"
      | "beforeend"
      | "after"
      | "afterend"
      | "delete"
      | "none"
      | "morph"
      | "morph:outerHTML"
      | "morph:innerHTML";
    type HxSwapValue = HxSwap | `${HxSwap} ${string}` | AnyStr;

    type HxTarget =
      | "this"
      | "closest "
      | "find "
      | "next"
      | "next "
      | "previous"
      | "previous ";
    type HxSelectorTarget = HxTarget | AnyStr;

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

    type HxTriggerModifier =
      | " once"
      | " changed"
      | " delay:"
      | " throttle:"
      | " from:"
      | " target:"
      | " consume"
      | " prevent"
      | " stop"
      | " halt"
      | " capture"
      | " passive"
      | " root:"
      | " rootMargin:"
      | " threshold:";
    type HxDisable = HxSelectorTarget;
    type HxPreload =
      | boolean
      | "mouseenter"
      | "mouseover"
      | "touchstart"
      | "always"
      | AnyStr;
    type HxStatusRule = "none" | `target:${string}` | `swap:${string}` | AnyStr;
    type HtmxModifierValue = string | boolean | undefined;

    /**
     * Names for official htmx v4 extensions bundled in `htmx.org@4`.
     * Extensions are page-wide in v4 and loaded via script imports or config allowlists.
     */
    interface HtmxBuiltinExtensions {
      alpineCompat: "hx-alpine-compat";
      browserIndicator: "hx-browser-indicator";
      /** htmx 2.x compatibility shim: implicit inheritance, old event names, 4xx/5xx swap defaults. */
      compat: "htmx-2-compat";
      /** Content Security Policy enforcement (nonce gating, Trusted Types, safe eval). Renamed from `hx-nonce` in beta4. */
      csp: "hx-csp";
      download: "hx-download";
      head: "hx-head";
      historyCache: "hx-history-cache";
      /** Reactive `hx-live` expressions and the `q()` selector helper. New in beta3. */
      live: "hx-live";
      /** Stream multipart responses. New in beta6. */
      multipart: "hx-multipart";
      pending: "hx-pending";
      preload: "hx-preload";
      /** Restores the htmx 2 `hx-prompt` attribute. New in beta5. */
      prompt: "hx-prompt";
      ptag: "hx-ptag";
      sse: "hx-sse";
      targets: "hx-targets";
      upsert: "hx-upsert";
      ws: "hx-ws";
    }

    /**
     * Definitions for HTMX v4 attributes and commonly used official extensions.
     */
    interface HtmxAttributes {
      /** @ignore For React compatibility only. */
      children?: {};
      /** @ignore For React compatibility only. */
      key?: {};
      ["hx-action"]?: string;
      ["hx-boost"]?: BoolStr;
      ["hx-browser-indicator"]?: boolean | BoolStr;
      ["hx-config"]?: HxConfig;
      ["data-hx-config"]?: HxConfig;
      ["hx-confirm"]?: string;
      ["hx-delete"]?: string;
      ["hx-disable"]?: HxDisable;
      ["hx-encoding"]?: "multipart/form-data";
      ["hx-get"]?: string;
      ["hx-headers"]?: HxJson;
      ["data-hx-headers"]?: HxJson;
      ["hx-ignore"]?: boolean | "true";
      ["hx-include"]?: string;
      ["hx-indicator"]?: string;
      ["hx-method"]?: HxRequestMethod | AnyStr;
      ["hx-morph-skip"]?: boolean | "true";
      ["hx-morph-skip-children"]?: boolean | "true";
      ["hx-multipart:connect"]?: string;
      ["hx-multipart:close"]?: string;
      ["hx-patch"]?: string;
      ["hx-pending"]?: string;
      ["hx-post"]?: string;
      ["hx-preload"]?: HxPreload;
      ["hx-prompt"]?: string;
      ["hx-preserve"]?: boolean | "true";
      ["hx-push-url"]?: BoolStr | AnyStr;
      ["hx-put"]?: string;
      ["hx-query"]?: string;
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
      ["hx-swap"]?: HxSwapValue;
      /**
       * Marks content in a response to be out of band (should swap in somewhere other than the target).
       * @see https://htmx.org/attributes/hx-swap-oob/
       */
      ["hx-swap-oob"]?: "true" | HxSwapValue;
      /**
       * Specifies the target element to be swapped.
       * @see https://htmx.org/attributes/hx-target/
       * @category Core
       */
      ["hx-target"]?: HxSelectorTarget;
      ["hx-targets"]?: string;
      /**
       * Specifies the event that triggers the request.
       *
       * A trigger is only meaningful when paired with an action attribute
       * (`hx-get`, `hx-post`, `hx-put`, `hx-patch`, `hx-delete`) on this
       * element **or** inherited from a parent via `:inherited`.
       * A trigger with no associated action is a no-op.
       *
       * **Modifiers** (space-separated after event name):
       * - `once` — fire only once
       * - `changed` — fire only when value changes
       * - `delay:<time>` — debounce (e.g. `delay:500ms`)
       * - `throttle:<time>` — throttle (e.g. `throttle:1s`)
       * - `from:<selector>` — listen on a different element
       * - `target:<selector>` — filter by event target
       * - `consume` — call `stopPropagation()`
       * Queueing is configured with `hx-sync`; htmx 4 removed `queue:*` here.
       *
       * **Polling:** `every <time>` for periodic requests (e.g. `every 2s`).
       *
       * @example
       * ```tsx
       * // Standard trigger
       * <button hx-get="/api" hx-trigger="click">Go</button>
       *
       * // Debounced search
       * <input hx-post="/search" hx-trigger="keyup changed delay:500ms" />
       *
       * // Polling
       * <div hx-get="/feed" hx-trigger="every 2s">Live</div>
       *
       * // Inherited action — trigger on child, action on parent via :inherited
       * <div hx-get:inherited="/data">
       *   <button hx-trigger="click">Fires parent's GET</button>
       * </div>
       * ```
       *
       * @see https://htmx.org/attributes/hx-trigger/
       * @category Core
       */
      ["hx-trigger"]?: "every " | HxTriggerModifier | AnyStr;
      /**
       * Adds values to the parameters to submit with the request (JSON-formatted).
       * @see https://htmx.org/attributes/hx-params/
       * @category Core
       */
      ["hx-vals"]?: HxJson;
      ["data-hx-vals"]?: HxJson;
      /**
       * Replace the URL in the browser location bar.
       * @see https://htmx.org/attributes/hx-replace-url/
       */
      ["hx-replace-url"]?: BoolStr | AnyStr;
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
       * The strategy for merging new head content.
       * @see https://htmx.org/extensions/head-support/
       */
      ["hx-head"]?: "merge" | "append" | "re-eval";
      ["hx-ptag"]?: AnyStr;
      /**
       * Marks the element that history content is restored into when navigating back.
       * Defaults to `<body>` when absent. Restored from htmx 2 in htmx 4 beta3.
       *
       * @see https://htmx.org/attributes/hx-history-elt/
       * @category Core
       */
      ["hx-history-elt"]?: boolean | "true";
      /** Opt out of the history-cache extension for this element or page. */
      ["hx-history"]?: false | "false";
      /**
       * A JavaScript expression that re-runs whenever the DOM changes (input/change
       * events or mutations). Provided by the {@linkcode HtmxBuiltinExtensions.live `hx-live`} extension.
       * Inside the expression `this` is the element and `q(...)` selects elements.
       *
       * @example `<output hx-live="this.textContent = 'hi ' + q('#name').value"></output>`
       * @see https://htmx.org/extensions/hx-live/
       */
      ["hx-live"]?: AnyStr;
      /** Reactive attribute/property/class/style/text binding provided by hx-live. */
      [key: `hx-live:${string}`]: AnyStr | undefined;
      /**
       * CSP nonce stamped by the server on every htmx-bearing element. The
       * {@linkcode HtmxBuiltinExtensions.csp `hx-csp`} extension strips htmx
       * attributes from any element whose `hx-nonce` doesn't match the page nonce.
       *
       * @see https://htmx.org/extensions/hx-csp/
       */
      ["hx-nonce"]?: AnyStr;
      ["hx-sse:connect"]?: string;
      ["hx-sse:close"]?: string;
      ["hx-ws:connect"]?: string;
      ["hx-ws:send"]?: boolean | string;
      ["hx-ws-connect"]?: string;
      ["hx-ws-send"]?: boolean | string;
      /**
       * Attach [hyperscript](https://hyperscript.org/docs) behavior to this element.
       * Available separately from htmx.
       *
       * CDN: https://unpkg.com/hyperscript.org
       */
      _?: AnyStr;
      /**
       * Handle DOM or htmx events inline (simple form): one event, one expression.
       * Examples:
       * - `hx-on:click`
       * - `hx-on:htmx:before:request`
       * - `hx-on::after:request` (`::` is shorthand for `htmx:`)
       *
       * HTML attribute names are case-insensitive, so event names should use kebab-case in markup.
       *
       * @note In htmx 4 the dot-modifiers (`.prevent` `.stop` `.once` `.self` …) were
       *       removed from this `hx-on:event` form. Use the {@link HtmxAttributes "hx-on" extended form}
       *       with `->` and trigger modifiers instead.
       * @see https://htmx.org/attributes/hx-on/
       */
      [key: `hx-on:${string}`]: string | undefined;
      /**
       * Handle events inline with the htmx 4 **extended form**, which builds on
       * {@link HtmxAttributes "hx-trigger"}'s grammar and uses `->` to wire events to code.
       *
       * Syntax: `<event>[<filter>] <modifiers> [, ...] -> <js> [; <event> -> <js> ...]`
       *
       * Modifiers include `once`, `changed`, `delay:`, `throttle:`, `from:`, `target:`,
       * `prevent`, `stop`, `halt`, `capture`, `passive`, `from:self`, `from:outside`.
       *
       * @example
       * ```tsx
       * <dialog hx-on="load -> this.showModal()" />
       * <input hx-on="keydown[key=='Escape'] -> this.blur()" />
       * <dialog hx-on="click from:self, closeDialog from:body -> this.close()" />
       * ```
       *
       * @see https://htmx.org/attributes/hx-on/
       */
      ["hx-on"]?: AnyStr;
      /**
       * Handle htmx lifecycle events inline with shorthand syntax.
       *
       * @see https://htmx.org/attributes/hx-on/
       */
      [key: `hx-on::${string}`]: string | undefined;
      /**
       * Handle responses by HTTP status code.
       *
       * Use `hx-status:<code>` to define behavior for specific status codes.
       * Values: `none`, `target:<selector>`, `swap:<strategy>`, or any string.
       *
       * @example
       * ```tsx
       * <div hx-get="/api" hx-status:404="target:#error-panel" hx-status:500="swap:none">
       *   Content
       * </div>
       * ```
       *
       * @see https://htmx.org/attributes/hx-status/
       */
      [key: `hx-status:${string}`]: HxStatusRule | undefined;

      // ── Inheritance modifiers ─────────────────────────────────────
      //
      // HTMX v4 uses explicit inheritance via the `:inherited` suffix.
      // Place `:inherited` on a parent to pass that attribute's value to children.
      // Use `:append` to append to a parent's inherited value instead of replacing it.
      // Combine as `:inherited:append` to both inherit and append.
      //
      // Known attributes are listed explicitly below for autocomplete and
      // hover documentation. The fallback index signatures at the end allow
      // custom extension attributes — extend `HtmxAttributes` via declaration
      // merging to add typed modifiers for extension-specific attributes.

      // ── :inherited — pass attribute value to child elements ──

      /**
       * Inherit `hx-boost` to all descendant links and forms.
       * Children use AJAX navigation without needing their own `hx-boost`.
       *
       * @example `<div hx-boost:inherited="true">` → all child `<a>`/`<form>` elements are boosted.
       * @see https://htmx.org/attributes/hx-boost/
       */
      ["hx-boost:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-confirm` to child elements.
       * Children will show a confirmation dialog before issuing requests.
       *
       * @see https://htmx.org/attributes/hx-confirm/
       */
      ["hx-confirm:inherited"]?: HtmxModifierValue;
      /** Inherit the hx-prompt extension question to child requests. */
      ["hx-prompt:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-delete` to child elements.
       * Children can trigger this DELETE endpoint without their own `hx-delete`.
       *
       * @see https://htmx.org/attributes/hx-delete/
       */
      ["hx-delete:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-encoding` to child elements.
       * Children will use this encoding for their requests (e.g. `multipart/form-data`).
       *
       * @see https://htmx.org/attributes/hx-encoding/
       */
      ["hx-encoding:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-get` to child elements.
       * Children can trigger this GET endpoint via their own `hx-trigger`.
       *
       * @example
       * ```tsx
       * <div hx-get:inherited="/api/data">
       *   <button hx-trigger="click">Fires GET /api/data</button>
       * </div>
       * ```
       *
       * @see https://htmx.org/attributes/hx-get/
       */
      ["hx-get:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-headers` to child elements.
       * Children will include these headers in their requests.
       * Combine with `:append` to merge child headers with parent headers.
       *
       * @see https://htmx.org/attributes/hx-headers/
       */
      ["hx-headers:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-include` to child elements.
       * Children will include the specified selector's values in requests.
       *
       * @see https://htmx.org/attributes/hx-include/
       */
      ["hx-include:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-indicator` to child elements.
       * Children will use this element as their loading indicator.
       *
       * @see https://htmx.org/attributes/hx-indicator/
       */
      ["hx-indicator:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-method` to child elements.
       * Children will use this HTTP method for their requests.
       *
       * @see https://htmx.org/attributes/hx-method/
       */
      ["hx-method:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-patch` to child elements.
       * Children can trigger this PATCH endpoint via their own `hx-trigger`.
       *
       * @see https://htmx.org/attributes/hx-patch/
       */
      ["hx-patch:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-post` to child elements.
       * Children can trigger this POST endpoint via their own `hx-trigger`.
       *
       * @see https://htmx.org/attributes/hx-post/
       */
      ["hx-post:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-push-url` to child elements.
       * Children will push their request URL to browser history.
       *
       * @see https://htmx.org/attributes/hx-push-url/
       */
      ["hx-push-url:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-put` to child elements.
       * Children can trigger this PUT endpoint via their own `hx-trigger`.
       *
       * @see https://htmx.org/attributes/hx-put/
       */
      ["hx-put:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-replace-url` to child elements.
       * Children will replace the browser URL on request.
       *
       * @see https://htmx.org/attributes/hx-replace-url/
       */
      ["hx-replace-url:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-select` to child elements.
       * Children will select the same fragment from responses.
       *
       * @see https://htmx.org/attributes/hx-select/
       */
      ["hx-select:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-select-oob` to child elements.
       * Children will use the same out-of-band select strategy.
       *
       * @see https://htmx.org/attributes/hx-select-oob/
       */
      ["hx-select-oob:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-swap` to child elements.
       * Children will use this swap strategy (e.g. `outerHTML`, `innerHTML`).
       *
       * @see https://htmx.org/attributes/hx-swap/
       */
      ["hx-swap:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-swap-oob` to child elements.
       *
       * @see https://htmx.org/attributes/hx-swap-oob/
       */
      ["hx-swap-oob:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-sync` to child elements.
       * Children will use this synchronization strategy.
       *
       * @see https://htmx.org/attributes/hx-sync/
       */
      ["hx-sync:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-target` to child elements.
       * All child HTMX requests will swap into this target.
       *
       * @example `<div hx-target:inherited="#results">` → children swap into `#results`.
       * @see https://htmx.org/attributes/hx-target/
       */
      ["hx-target:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-trigger` to child elements.
       * Children will use this trigger event unless they define their own.
       *
       * @see https://htmx.org/attributes/hx-trigger/
       */
      ["hx-trigger:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-vals` to child elements.
       * Children will include these values in their request parameters.
       * Combine with `:append` to merge child values with parent values.
       *
       * @see https://htmx.org/attributes/hx-vals/
       */
      ["hx-vals:inherited"]?: HtmxModifierValue;
      /**
       * Inherit `hx-validate` to child elements.
       * Children will validate before issuing requests.
       *
       * @see https://htmx.org/attributes/hx-validate/
       */
      ["hx-validate:inherited"]?: HtmxModifierValue;

      // ── :append — append to parent's inherited value ──

      /**
       * Append to the parent's inherited `hx-headers` value.
       * Merges this element's headers with the parent's instead of replacing them.
       *
       * @example
       * ```tsx
       * <div hx-headers:inherited='{"Auth": "Bearer tok"}'>
       *   <button hx-headers:append='{"X-Custom": "val"}' hx-get="/api">
       *     Sends both Auth and X-Custom headers
       *   </button>
       * </div>
       * ```
       *
       * @see https://htmx.org/attributes/hx-headers/
       */
      ["hx-headers:append"]?: HtmxModifierValue;
      /**
       * Append to the parent's inherited `hx-vals` value.
       * Merges this element's values with the parent's instead of replacing them.
       *
       * @see https://htmx.org/attributes/hx-vals/
       */
      ["hx-vals:append"]?: HtmxModifierValue;
      /**
       * Append to the parent's inherited `hx-include` selector.
       *
       * @see https://htmx.org/attributes/hx-include/
       */
      ["hx-include:append"]?: HtmxModifierValue;
      /**
       * Append to the parent's inherited `hx-select` selector.
       *
       * @see https://htmx.org/attributes/hx-select/
       */
      ["hx-select:append"]?: HtmxModifierValue;
      /**
       * Merge this element's `hx-disable` targets with an inherited parent value.
       *
       * @see https://htmx.org/attributes/hx-disable/
       */
      ["hx-disable:merge"]?: HtmxModifierValue;
      /**
       * Append to the parent's inherited `hx-trigger` value.
       * Adds trigger events to the parent's trigger list instead of replacing it.
       *
       * @see https://htmx.org/attributes/hx-trigger/
       */
      ["hx-trigger:append"]?: HtmxModifierValue;

      // ── :inherited:append — inherit AND append ──

      /**
       * Inherit `hx-headers` to children AND append to parent's inherited value.
       * The merged result flows down to descendants.
       *
       * @see https://htmx.org/attributes/hx-headers/
       */
      ["hx-headers:inherited:append"]?: HtmxModifierValue;
      /**
       * Inherit `hx-vals` to children AND append to parent's inherited value.
       *
       * @see https://htmx.org/attributes/hx-vals/
       */
      ["hx-vals:inherited:append"]?: HtmxModifierValue;
      /**
       * Inherit `hx-include` to children AND append to parent's inherited value.
       *
       * @see https://htmx.org/attributes/hx-include/
       */
      ["hx-include:inherited:append"]?: HtmxModifierValue;
      /**
       * Inherit `hx-trigger` to children AND append to parent's inherited value.
       *
       * @see https://htmx.org/attributes/hx-trigger/
       */
      ["hx-trigger:inherited:append"]?: HtmxModifierValue;

      // ── Fallback index signatures for extension/custom attributes ──
      // Known attributes above provide autocomplete and hover docs.
      // These catch-alls allow custom extension attributes to use modifiers.
      // For typed support of custom attrs, extend HtmxAttributes via declaration merging.

      /**
       * **Fallback** — Marks any `hx-*` attribute as inherited by child elements.
       * Prefer the explicit named properties above for autocomplete and documentation.
       *
       * @see https://htmx.org/attributes/hx-inherit/
       */
      [key: `hx-${string}:inherited`]: HtmxModifierValue;
      /**
       * **Fallback** — Appends to a parent's inherited `hx-*` value.
       * Prefer the explicit named properties above for autocomplete and documentation.
       */
      [key: `hx-${string}:append`]: HtmxModifierValue;
      /**
       * **Fallback** — Inherits AND appends for any `hx-*` attribute.
       * Prefer the explicit named properties above for autocomplete and documentation.
       */
      [key: `hx-${string}:inherited:append`]: HtmxModifierValue;
    }

    interface HtmxExtensions extends HtmxBuiltinExtensions {}

    // typed-html
    interface HtmlTag extends HtmxAttributes {}

    interface HTMLElement extends HtmxAttributes {}
  }
}

type HtmxElementRef = string | Element | null | undefined;
type HtmxEventTargetRef = string | EventTarget;
type HtmxEventListener = EventListenerOrEventListenerObject;

interface HtmxAjaxContext {
  source?: HtmxElementRef;
  event?: Event;
  handler?: (elt: Element, info: HtmxResponseInfo) => void;
  target?: HtmxElementRef;
  swap?: string;
  values?: Record<string, unknown>;
  headers?: Record<string, string>;
  select?: string;
  selectOOB?: string;
  push?: string | boolean;
  replace?: string | boolean;
  [key: string]: unknown;
}

/**
 * Typed view of `htmx.config`. Mirrors the htmx 4 config surface; unknown keys
 * remain accessible via the index signature.
 * @see https://htmx.org/reference/#config
 */
interface HtmxConfig {
  logAll: boolean;
  /** Attribute prefix scanned for htmx attributes. Defaults to `"data-hx-"` so both `hx-*` and `data-hx-*` work. */
  prefix: string;
  transitions: boolean;
  history: boolean | "reload";
  mode: "same-origin" | "cors" | "no-cors";
  defaultSwap: string;
  defaultFocusScroll: boolean;
  defaultSettleDelay: number;
  indicatorClass: string;
  requestClass: string;
  includeIndicatorCSS: boolean;
  /** Request timeout in ms. Defaults to `60000` in htmx 4 (was `0` in htmx 2). */
  defaultTimeout: number;
  inlineScriptNonce?: string;
  extensions: string;
  morphIgnore: string[];
  morphScanLimit: number;
  morphSkip?: string;
  morphSkipChildren?: string;
  /** Run the main swap when a response contains only out-of-band elements. */
  allowEmptySwapAfterOOB: boolean;
  /** Status codes (or `"4xx"`/`"5xx"` ranges) that are not swapped. Defaults to `[204, 304]`. */
  noSwap: (number | string)[];
  /** Restore htmx 2's implicit attribute inheritance. Defaults to `false` in htmx 4. */
  implicitInheritance: boolean;
  metaCharacter?: string;
  live?: {
    inputDebounce?: number | string;
    bindPrefix?: string | false;
    useDollar?: boolean;
  };
  sse?: HtmxSseConfig;
  multipart?: HtmxMultipartConfig;
  ws?: HtmxWsConfig;
  [key: string]: unknown;
}

/** Context object passed to {@link HtmxApi.swap}. */
interface HtmxSwapContext {
  text: string;
  sourceElement?: Element;
  swap?: string;
  select?: string;
  selectOOB?: string;
  target?: Element;
  transition?: boolean;
  push?: string | boolean;
  replace?: string | boolean;
  anchor?: string;
}

/** A thin proxy over a set of elements returned by {@link HtmxLiveApi.q `q()`}. */
interface HtmxQueryProxy extends Iterable<Element> {
  /** Number of matched elements. */
  readonly count: number;
  /** Materialize the matches as a real array. */
  arr(): Element[];
  /** Re-run the selector grammar relative to each matched element. */
  q(selector: string): HtmxQueryProxy;
  readonly attr: Record<string, any> & { readonly class: HtmxClassProxy };
  readonly data: Record<string, any>;
  readonly aria: Record<string, any>;
  readonly class: HtmxClassProxy;
  readonly local: HtmxQueryScope;
  readonly closest: HtmxQueryScope & ((selector: string) => HtmxQueryProxy);
  take(name: string, scope?: string | Node | { from: string }): HtmxQueryProxy;
  toggle(name: string, ...values: any[]): HtmxQueryProxy;
  trigger(type: string, detail?: any, bubbles?: boolean): HtmxQueryProxy;
  insert(
    position: "before" | "after" | "start" | "end" | "into" | "replace",
    html: string
  ): HtmxQueryProxy;
  [key: string]: any;
}

interface HtmxClassProxy extends DOMTokenList {
  assign(classes: Record<string, any>): void;
  [name: string]: any;
}

interface HtmxQueryScope {
  readonly attr: Record<string, any> & { readonly class: HtmxClassProxy };
  readonly data: Record<string, any>;
  readonly aria: Record<string, any>;
  readonly class: HtmxClassProxy;
}

/**
 * The `htmx.live` namespace, available when the
 * {@linkcode JSX.HtmxBuiltinExtensions.live `hx-live`} extension is loaded.
 */
interface HtmxLiveApi {
  q(selector: string | Element | Iterable<Element> | ArrayLike<Element>): HtmxQueryProxy;
  $(selector: string | Element | Iterable<Element> | ArrayLike<Element>): HtmxQueryProxy;
  take(
    target: string | Element | NodeList,
    name: string,
    scope?: string | Node | { from: string }
  ): void;
  toggle(
    target: string | Element | NodeList,
    name: string,
    ...values: any[]
  ): void;
  forEvent(...args: (string | number | EventTarget)[]): Promise<Event | string | number>;
  debounce(ms: number): Promise<void>;
  debounce(ms: number, fn: () => void): void;
  /** Force a recompute of all live expressions. */
  refresh(): void;
  nextFrame(): Promise<void>;
  [key: string]: unknown;
}

/**
 * The htmx 4 public JavaScript API. The surface was deliberately slimmed in v4:
 * DOM helpers (`addClass`/`removeClass`/`closest`/`remove`/`off`/…) were dropped
 * in favor of native methods, and `defineExtension` became `registerExtension`.
 * @see https://htmx.org/docs/get-started/migration/
 */
interface HtmxApi {
  version: string;
  config: HtmxConfig;
  /** Reactive scripting primitives from the `hx-live` extension (`q`, `take`, …). */
  live?: HtmxLiveApi;
  ajax(
    verb: string,
    path: string,
    context?: HtmxElementRef | HtmxAjaxContext
  ): Promise<void>;
  find(selector: string): Element | null;
  find(elt: HtmxElementRef, selector: string): Element | null;
  findAll(selector: string): Element[];
  findAll(elt: HtmxElementRef, selector: string): Element[];
  /** Adds a listener and returns it, so it can be removed with `removeEventListener`. */
  on<K extends keyof HtmxEventDetailMap>(
    eventName: K,
    listener: (event: CustomEvent<HtmxEventDetailMap[K]>) => void
  ): (event: CustomEvent<HtmxEventDetailMap[K]>) => void;
  on<K extends keyof HtmxEventDetailMap>(
    target: HtmxEventTargetRef,
    eventName: K,
    listener: (event: CustomEvent<HtmxEventDetailMap[K]>) => void
  ): (event: CustomEvent<HtmxEventDetailMap[K]>) => void;
  on(eventName: string, listener: HtmxEventListener): HtmxEventListener;
  on(
    target: HtmxEventTargetRef,
    eventName: string,
    listener: HtmxEventListener
  ): HtmxEventListener;
  onLoad(callback: (elt: Element) => void): void;
  /** Set up history handling and process `document.body`. Safe to call repeatedly. */
  initialize(): void;
  parseInterval(value: string | number): number | undefined;
  process(elt: Element | Document | DocumentFragment, force?: boolean): void;
  /** Register an extension. Renamed from `defineExtension` in htmx 4. */
  registerExtension(name: string, extension: Record<string, unknown>): void;
  swap(context: HtmxSwapContext): Promise<void>;
  /** Resolve after `ms` milliseconds. */
  timeout(value: number | string): Promise<void> | undefined;
  trigger<K extends keyof HtmxEventDetailMap>(
    elt: HtmxElementRef,
    eventName: K,
    detail: HtmxEventDetailMap[K],
    bubbles?: boolean
  ): boolean;
  trigger(
    elt: HtmxElementRef,
    eventName: string,
    detail?: unknown,
    bubbles?: boolean
  ): boolean;
  [key: string]: unknown;
}

interface HtmxRequestConfig extends RequestInit {
  action?: string;
  method?: string;
  headers?: Record<string, string>;
  body?: BodyInit | null;
  validate?: boolean;
  sse?: HtmxSseConfig;
  multipart?: HtmxMultipartConfig;
  ws?: HtmxWsConfig;
  [key: string]: unknown;
}

interface HtmxResponseInfo {
  raw?: Response;
  status?: number;
  headers?: Headers;
  [key: string]: unknown;
}

interface HtmxRequestContext {
  sourceElement?: Element;
  sourceEvent?: Event;
  target?: Element | string | null;
  request: HtmxRequestConfig;
  response?: HtmxResponseInfo;
  text?: string;
  select?: string;
  selectOOB?: string;
  swap?: string;
  push?: string | boolean;
  replace?: string | boolean;
  transition?: boolean;
  confirm?: string;
  status?: string;
  hx?: Record<string, string>;
  [key: string]: unknown;
}

interface HtmxElementDetail {
  elt: Element;
}

interface HtmxContextDetail {
  ctx: HtmxRequestContext;
}

interface HtmxSettleDetail {
  task?: unknown;
  newContent?: Element[];
  settleTasks?: unknown[];
}

interface HtmxHistoryUpdate {
  type?: "push" | "replace";
  path?: string;
}

interface HtmxHistoryDetail {
  history: HtmxHistoryUpdate;
  sourceElement?: Element;
  response?: HtmxResponseInfo;
}

interface HtmxPathDetail {
  path: string;
}

interface HtmxHistoryRestoreDetail extends HtmxPathDetail {
  cacheMiss?: boolean;
}

interface HtmxImplicitInheritanceDetail extends HtmxElementDetail {
  name?: string;
  parent?: Element;
}

interface HtmxConfirmationDetail extends HtmxContextDetail {
  issueRequest: () => void;
  dropRequest: () => void;
}

interface HtmxErrorDetail extends HtmxContextDetail {
  error?: unknown;
}

interface HtmxViewTransitionDetail extends HtmxContextDetail {
  task?: (() => void) | unknown;
}

interface HtmxSseConnection {
  url?: string;
  attempt?: number;
  status?: number | null;
  lastEventId?: string | null;
  delay?: number;
  cancelled?: boolean;
  [key: string]: unknown;
}

interface HtmxSseConfig {
  reconnect?: boolean;
  reconnectDelay?: number | string;
  reconnectMaxDelay?: number | string;
  reconnectMaxAttempts?: number;
  reconnectJitter?: number;
  pauseOnBackground?: boolean;
  releaseOn?: "immediate" | "first" | "end";
  [key: string]: unknown;
}

interface HtmxSseMessage {
  data?: string;
  event?: string;
  id?: string;
  cancelled?: boolean;
  [key: string]: unknown;
}

interface HtmxSseConnectionDetail {
  connection: HtmxSseConnection;
}

interface HtmxSseMessageDetail {
  connection: HtmxSseConnection;
  message: HtmxSseMessage;
}

interface HtmxSseBeforeMessageDetail extends HtmxSseMessageDetail {
  cancelled: boolean;
  waitUntil(promise: PromiseLike<unknown>): void;
}

interface HtmxSseErrorDetail {
  connection?: HtmxSseConnection;
  error?: unknown;
  url?: string;
  status?: number;
}

interface HtmxSseCloseDetail {
  connection?: HtmxSseConnection;
  reason?: string;
}

interface HtmxWsConnection {
  url?: string;
  config?: HtmxWsConfig;
  socket?: WebSocket | null;
  attempt?: number;
  cancelled?: boolean;
  [key: string]: unknown;
}

interface HtmxWsConfig {
  protocols?: string | string[];
  reconnect?: boolean;
  reconnectDelay?: number | string;
  reconnectMaxDelay?: number | string;
  reconnectMaxAttempts?: number;
  reconnectJitter?: number;
  pauseOnBackground?: boolean;
  reconnectCodes?: number[];
  maxOutgoingMessagesQueueSize?: number;
  [key: string]: unknown;
}

interface HtmxDownloadProgressDetail {
  loaded: number;
  total: number | null;
  percent: number | null;
}

interface HtmxHeadElementDetail {
  headElement: Element;
}

interface HtmxHistoryCacheItem {
  content?: string;
  head?: string;
  scroll?: number;
  title?: string;
  [key: string]: unknown;
}

interface HtmxMultipartConfig {
  reconnect?: boolean;
  reconnectDelay?: number | string;
  reconnectMaxDelay?: number | string;
  reconnectMaxAttempts?: number;
  reconnectJitter?: number;
  pauseOnBackground?: boolean;
  [key: string]: unknown;
}

interface HtmxMultipartConnection {
  url?: string;
  config?: HtmxMultipartConfig;
  attempt?: number;
  status?: number;
  lastPartId?: string;
  cancelled?: boolean;
  [key: string]: unknown;
}

interface HtmxMultipartPart {
  readonly headers: Headers;
  readonly body: ReadableStream<Uint8Array> | null;
  readonly bodyUsed: boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
  blob(): Promise<Blob>;
  bytes(): Promise<Uint8Array>;
  json(): Promise<unknown>;
  text(): Promise<string>;
}

interface HtmxMultipartConnectionDetail {
  connection: HtmxMultipartConnection;
}

interface HtmxMultipartPartDetail extends HtmxContextDetail {
  connection: HtmxMultipartConnection;
  part: HtmxMultipartPart;
}

interface HtmxMultipartBeforePartDetail extends HtmxMultipartPartDetail {
  cancelled: boolean;
  waitUntil(promise: PromiseLike<unknown>): void;
}

interface HtmxWsOutgoingMessage {
  headers?: Record<string, string>;
  values?: Record<string, unknown>;
  data?: string | ArrayBufferLike | Blob | ArrayBufferView;
  [key: string]: unknown;
}

interface HtmxWsIncomingMessage {
  data: string | ArrayBuffer | Blob;
  text(): Promise<string>;
  json(): Promise<unknown>;
}

interface HtmxWsMessageDetail<Message> {
  connection: HtmxWsConnection;
  message: Message;
}

interface HtmxWsBeforeMessageDetail<Message> extends HtmxWsMessageDetail<Message> {
  cancelled: boolean;
  waitUntil(promise: PromiseLike<unknown>): void;
}

interface HtmxWsCloseDetail {
  connection?: HtmxWsConnection;
  reason?: string;
  code?: number | null;
  url?: string | null;
}

interface HtmxWsErrorDetail {
  connection?: HtmxWsConnection;
  url?: string | null;
  error?: unknown;
}

interface HtmxEventDetailMap {
  "htmx:abort": HtmxElementDetail;
  "htmx:after:cleanup": HtmxElementDetail;
  "htmx:after:history:push": HtmxPathDetail;
  "htmx:after:history:replace": HtmxPathDetail;
  "htmx:after:history:update": HtmxHistoryDetail;
  "htmx:head:after:merge": {
    added: Element[];
    kept: Element[];
    removed: Element[];
  };
  "htmx:after:implicitInheritance": HtmxImplicitInheritanceDetail;
  "htmx:after:init": HtmxElementDetail;
  "htmx:after:process": HtmxElementDetail;
  "htmx:after:request": HtmxContextDetail;
  "htmx:after:settle": HtmxSettleDetail;
  "htmx:after:swap": HtmxContextDetail;
  "htmx:after:viewTransition": HtmxViewTransitionDetail;
  "htmx:download:complete": { filename: string; size: number };
  "htmx:download:progress": HtmxDownloadProgressDetail;
  "htmx:download:start": { total: number | null };
  "htmx:history:cache:after:restore": { item: HtmxHistoryCacheItem };
  "htmx:history:cache:after:save": HtmxHistoryCacheItem;
  "htmx:history:cache:before:restore": {
    head?: string;
    ready?: PromiseLike<unknown>;
  };
  "htmx:history:cache:before:save": {
    target: Element;
    head: string;
    cancelled?: boolean;
  };
  "htmx:history:cache:hit": { path: string; item: HtmxHistoryCacheItem };
  "htmx:history:cache:miss": { path: string; refreshOnMiss?: boolean };
  "htmx:multipart:after:connection": HtmxMultipartConnectionDetail;
  "htmx:multipart:after:part": HtmxMultipartPartDetail;
  "htmx:multipart:before:connection": HtmxMultipartConnectionDetail;
  "htmx:multipart:before:part": HtmxMultipartBeforePartDetail;
  "htmx:multipart:close": HtmxMultipartConnectionDetail & { reason?: string };
  "htmx:multipart:error": {
    connection?: HtmxMultipartConnection;
    error?: unknown;
    url?: string;
    status?: number;
  };
  "htmx:prompt": { prompt: string; target: Element };
  "htmx:security:strip": { reason: string; stripped: string[] };
  "htmx:security:violation": {
    reason: string;
    action?: string;
    ctx?: HtmxRequestContext;
    submitter?: HTMLElement;
  };
  "htmx:head:before:add": HtmxHeadElementDetail;
  "htmx:head:before:merge": HtmxContextDetail;
  "htmx:head:before:remove": HtmxHeadElementDetail;
  "htmx:before:cleanup": HtmxElementDetail;
  "htmx:before:history:restore": HtmxHistoryRestoreDetail;
  "htmx:before:history:update": HtmxHistoryDetail;
  "htmx:before:init": HtmxElementDetail;
  "htmx:before:on:init": Record<string, never>;
  "htmx:before:process": HtmxElementDetail;
  "htmx:before:request": HtmxContextDetail;
  "htmx:before:response": HtmxContextDetail;
  "htmx:before:settle": HtmxSettleDetail;
  "htmx:before:swap": HtmxContextDetail & { tasks?: unknown[] };
  "htmx:finally:swap": HtmxContextDetail;
  "htmx:before:viewTransition": HtmxViewTransitionDetail;
  "htmx:config:request": HtmxContextDetail;
  "htmx:confirm": HtmxConfirmationDetail;
  "htmx:error": HtmxErrorDetail;
  "htmx:response:error": HtmxContextDetail & { status?: number };
  "htmx:finally:request": HtmxContextDetail;
  "htmx:process:partial": HtmxContextDetail & { tasks: unknown[] };
  "htmx:sse:after:connection": HtmxSseConnectionDetail;
  "htmx:sse:after:message": HtmxSseMessageDetail;
  "htmx:sse:before:connection": HtmxSseConnectionDetail;
  "htmx:sse:before:message": HtmxSseBeforeMessageDetail;
  "htmx:sse:close": HtmxSseCloseDetail;
  "htmx:sse:error": HtmxSseErrorDetail;
  "htmx:ws:after:connection": { connection: HtmxWsConnection };
  "htmx:ws:after:message:incoming": HtmxWsMessageDetail<HtmxWsIncomingMessage>;
  "htmx:ws:after:message:outgoing": HtmxWsMessageDetail<HtmxWsOutgoingMessage>;
  "htmx:ws:before:connection": { connection: HtmxWsConnection };
  "htmx:ws:before:message:incoming": HtmxWsBeforeMessageDetail<HtmxWsIncomingMessage>;
  "htmx:ws:before:message:outgoing": HtmxWsBeforeMessageDetail<HtmxWsOutgoingMessage>;
  "htmx:ws:close": HtmxWsCloseDetail;
  "htmx:ws:error": HtmxWsErrorDetail;
}

declare var htmx: HtmxApi;

interface Document {
  addEventListener<K extends keyof HtmxEventDetailMap>(
    type: K,
    listener: (this: Document, event: CustomEvent<HtmxEventDetailMap[K]>) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}

interface HTMLElement {
  addEventListener<K extends keyof HtmxEventDetailMap>(
    type: K,
    listener: (this: HTMLElement, event: CustomEvent<HtmxEventDetailMap[K]>) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}

interface Window {
  htmx: HtmxApi;
  /** Override the synchronous dialog used by the hx-prompt extension. */
  htmxPrompt?: (question: string) => string | null;
  addEventListener<K extends keyof HtmxEventDetailMap>(
    type: K,
    listener: (this: Window, event: CustomEvent<HtmxEventDetailMap[K]>) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}

interface Response {
  /** Iterate multipart response bodies when the hx-multipart extension is loaded. */
  parts(): AsyncIterableIterator<HtmxMultipartPart>;
}
