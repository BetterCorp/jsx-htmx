declare module "jsx-htmx/jsx-runtime" {
  import type * as CSS from "csstype";

  namespace JSX {
    // SVG 2 content attributes, with CSS presentation types supplied by csstype.
    // https://www.w3.org/TR/SVG2/attindex.html
    type SvgLength = string | number;
    type SvgUnits = "userSpaceOnUse" | "objectBoundingBox";
    type SvgAlignment = `x${"Min" | "Mid" | "Max"}Y${"Min" | "Mid" | "Max"}`;
    type SvgAspectRatio = "none" | SvgAlignment | `${SvgAlignment} ${"meet" | "slice"}`;
    type SvgCoreAttributes = Pick<HtmlTag,
      "id" | "class" | "style" | "lang" | "tabindex" | "autofocus" | "role" |
      "nonce" | "slot" | `data-${string}` | `aria-${string}`>;

    interface SvgTag extends SvgCoreAttributes, GlobalEvents, HtmxAttributes,
      CSS.SvgProperties<SvgLength>, CSS.SvgPropertiesHyphen<SvgLength> {
      xmlns?: string;
      xmlnsXlink?: string;
      "xmlns:xlink"?: string;
      xmlBase?: string;
      "xml:base"?: string;
      xmlLang?: string;
      "xml:lang"?: string;
      xmlSpace?: "default" | "preserve";
      "xml:space"?: "default" | "preserve";
      transform?: string;
      transformOrigin?: CSS.Property.TransformOrigin<SvgLength>;
      "transform-origin"?: CSS.Property.TransformOrigin<SvgLength>;
      transformBox?: CSS.Property.TransformBox;
      "transform-box"?: CSS.Property.TransformBox;
      colorInterpolationFilters?: CSS.Property.ColorInterpolationFilters;
      "color-interpolation-filters"?: CSS.Property.ColorInterpolationFilters;
      maskType?: CSS.Property.MaskType;
      "mask-type"?: CSS.Property.MaskType;
      requiredExtensions?: string;
      requiredFeatures?: string;
      systemLanguage?: string;
      externalResourcesRequired?: Booleanish;
      focusable?: Booleanish | "auto";
      onfocusin?: string;
      onfocusout?: string;
    }
    interface SvgLinkAttributes {
      href?: string;
      xlinkHref?: string;
      "xlink:href"?: string;
      xlinkActuate?: "onLoad" | "onRequest" | "other" | "none";
      "xlink:actuate"?: "onLoad" | "onRequest" | "other" | "none";
      xlinkArcrole?: string;
      "xlink:arcrole"?: string;
      xlinkRole?: string;
      "xlink:role"?: string;
      xlinkShow?: "new" | "replace" | "embed" | "other" | "none";
      "xlink:show"?: "new" | "replace" | "embed" | "other" | "none";
      xlinkTitle?: string;
      "xlink:title"?: string;
      xlinkType?: "simple";
      "xlink:type"?: "simple";
    }
    interface SvgViewportAttributes {
      viewBox?: string;
      preserveAspectRatio?: SvgAspectRatio | `defer ${SvgAspectRatio}`;
    }
    interface SvgBounds {
      x?: SvgLength;
      y?: SvgLength;
      width?: SvgLength;
      height?: SvgLength;
    }
    interface SvgRootTag extends SvgTag, SvgBounds, SvgViewportAttributes {
      version?: string;
      baseProfile?: string;
      zoomAndPan?: "disable" | "magnify";
    }
    interface SvgGeometryTag extends SvgTag {
      pathLength?: SvgLength;
    }
    interface SvgPathTag extends SvgGeometryTag {
      d?: string;
    }
    interface SvgCircleTag extends SvgGeometryTag {
      cx?: SvgLength;
      cy?: SvgLength;
      r?: SvgLength;
    }
    interface SvgEllipseTag extends SvgGeometryTag {
      cx?: SvgLength;
      cy?: SvgLength;
      rx?: SvgLength;
      ry?: SvgLength;
    }
    interface SvgRectTag extends SvgGeometryTag, SvgBounds {
      rx?: SvgLength;
      ry?: SvgLength;
    }
    interface SvgLineTag extends SvgGeometryTag {
      x1?: SvgLength;
      y1?: SvgLength;
      x2?: SvgLength;
      y2?: SvgLength;
    }
    interface SvgPolyTag extends SvgGeometryTag {
      points?: string;
    }
    interface SvgUseTag extends SvgTag, SvgBounds, SvgLinkAttributes {}
    interface SvgImageTag extends SvgUseTag, SvgViewportAttributes {
      crossorigin?: CrossOrigin;
      decoding?: "sync" | "async" | "auto";
    }
    interface SvgSymbolTag extends SvgRootTag {
      refX?: SvgLength;
      refY?: SvgLength;
    }
    interface SvgViewTag extends SvgTag, SvgViewportAttributes {
      viewTarget?: string;
      zoomAndPan?: "disable" | "magnify";
    }
    interface SvgMarkerTag extends SvgTag, SvgViewportAttributes {
      markerHeight?: SvgLength;
      markerWidth?: SvgLength;
      markerUnits?: "strokeWidth" | "userSpaceOnUse";
      orient?: SvgLength;
      refX?: SvgLength;
      refY?: SvgLength;
    }
    interface SvgClipPathTag extends SvgTag {
      clipPathUnits?: SvgUnits;
    }
    interface SvgMaskTag extends SvgTag, SvgBounds {
      maskUnits?: SvgUnits;
      maskContentUnits?: SvgUnits;
    }
    interface SvgPatternTag extends SvgTag, SvgBounds, SvgViewportAttributes, SvgLinkAttributes {
      patternUnits?: SvgUnits;
      patternContentUnits?: SvgUnits;
      patternTransform?: string;
    }
    interface SvgGradientTag extends SvgTag, SvgLinkAttributes {
      gradientUnits?: SvgUnits;
      gradientTransform?: string;
      spreadMethod?: "pad" | "reflect" | "repeat";
    }
    interface SvgLinearGradientTag extends SvgGradientTag {
      x1?: SvgLength;
      y1?: SvgLength;
      x2?: SvgLength;
      y2?: SvgLength;
    }
    interface SvgRadialGradientTag extends SvgGradientTag {
      cx?: SvgLength;
      cy?: SvgLength;
      r?: SvgLength;
      fx?: SvgLength;
      fy?: SvgLength;
      fr?: SvgLength;
    }
    interface SvgStopTag extends SvgTag {
      offset?: SvgLength;
    }
    interface SvgTextLengthAttributes {
      textLength?: SvgLength;
      lengthAdjust?: "spacing" | "spacingAndGlyphs";
    }
    interface SvgTextTag extends SvgTag, SvgTextLengthAttributes {
      x?: SvgLength;
      y?: SvgLength;
      dx?: SvgLength;
      dy?: SvgLength;
      rotate?: SvgLength;
    }
    interface SvgTextPathTag extends SvgTag, SvgTextLengthAttributes, SvgLinkAttributes {
      startOffset?: SvgLength;
      method?: "align" | "stretch";
      spacing?: "auto" | "exact";
      side?: "left" | "right";
      path?: string;
    }
    interface SvgTimingAttributes extends SvgLinkAttributes {
      begin?: SvgLength;
      dur?: SvgLength;
      end?: SvgLength;
      min?: SvgLength;
      max?: SvgLength;
      restart?: "always" | "whenNotActive" | "never";
      repeatCount?: SvgLength;
      repeatDur?: SvgLength;
      fill?: "freeze" | "remove";
      onbegin?: string;
      onend?: string;
      onrepeat?: string;
    }
    // Animation's fill controls timing rather than paint.
    interface SvgSetTag extends Omit<SvgTag, "fill">, SvgTimingAttributes {
      attributeName?: string;
      attributeType?: "CSS" | "XML" | "auto";
      to?: SvgLength;
    }
    interface SvgAnimateTag extends SvgSetTag {
      from?: SvgLength;
      by?: SvgLength;
      values?: string;
      calcMode?: "discrete" | "linear" | "paced" | "spline";
      keyTimes?: string;
      keySplines?: string;
      additive?: "replace" | "sum";
      accumulate?: "none" | "sum";
    }
    interface SvgAnimateMotionTag extends SvgAnimateTag {
      path?: string;
      keyPoints?: string;
      rotate?: SvgLength;
      origin?: "default";
    }
    interface SvgAnimateTransformTag extends SvgAnimateTag {
      type?: "translate" | "scale" | "rotate" | "skewX" | "skewY";
    }
    interface SvgFilterTag extends SvgTag, SvgBounds, SvgLinkAttributes {
      filterUnits?: SvgUnits;
      primitiveUnits?: SvgUnits;
      filterRes?: SvgLength;
    }
    interface SvgFilterPrimitiveTag extends SvgTag, SvgBounds {
      result?: string;
    }
    interface SvgFilterInputTag extends SvgFilterPrimitiveTag {
      in?: string;
    }
    interface SvgBlendTag extends SvgFilterInputTag {
      in2?: string;
      mode?: CSS.Property.MixBlendMode;
    }
    interface SvgColorMatrixTag extends SvgFilterInputTag {
      type?: "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha";
      values?: SvgLength;
    }
    interface SvgCompositeTag extends SvgFilterInputTag {
      in2?: string;
      operator?: "over" | "in" | "out" | "atop" | "xor" | "lighter" | "arithmetic";
      k1?: SvgLength;
      k2?: SvgLength;
      k3?: SvgLength;
      k4?: SvgLength;
    }
    interface SvgConvolveMatrixTag extends SvgFilterInputTag {
      order?: SvgLength;
      kernelMatrix?: string;
      divisor?: SvgLength;
      bias?: SvgLength;
      targetX?: SvgLength;
      targetY?: SvgLength;
      edgeMode?: "duplicate" | "wrap" | "none";
      kernelUnitLength?: SvgLength;
      preserveAlpha?: Booleanish;
    }
    interface SvgLightingTag extends SvgFilterInputTag {
      surfaceScale?: SvgLength;
      kernelUnitLength?: SvgLength;
    }
    interface SvgDiffuseLightingTag extends SvgLightingTag {
      diffuseConstant?: SvgLength;
    }
    interface SvgSpecularLightingTag extends SvgLightingTag {
      specularConstant?: SvgLength;
      specularExponent?: SvgLength;
    }
    interface SvgDisplacementMapTag extends SvgFilterInputTag {
      in2?: string;
      scale?: SvgLength;
      xChannelSelector?: "R" | "G" | "B" | "A";
      yChannelSelector?: "R" | "G" | "B" | "A";
    }
    interface SvgDistantLightTag extends SvgTag {
      azimuth?: SvgLength;
      elevation?: SvgLength;
    }
    interface SvgPointLightTag extends SvgTag {
      x?: SvgLength;
      y?: SvgLength;
      z?: SvgLength;
    }
    interface SvgSpotLightTag extends SvgPointLightTag {
      pointsAtX?: SvgLength;
      pointsAtY?: SvgLength;
      pointsAtZ?: SvgLength;
      specularExponent?: SvgLength;
      limitingConeAngle?: SvgLength;
    }
    interface SvgComponentFunctionTag extends SvgTag {
      type?: "identity" | "table" | "discrete" | "linear" | "gamma";
      tableValues?: string;
      slope?: SvgLength;
      intercept?: SvgLength;
      amplitude?: SvgLength;
      exponent?: SvgLength;
      offset?: SvgLength;
    }
    interface SvgGaussianBlurTag extends SvgFilterInputTag {
      stdDeviation?: SvgLength;
      edgeMode?: "duplicate" | "wrap" | "none";
    }
    interface SvgOffsetTag extends SvgFilterInputTag {
      dx?: SvgLength;
      dy?: SvgLength;
    }
    interface SvgDropShadowTag extends SvgOffsetTag {
      stdDeviation?: SvgLength;
    }
    interface SvgFilterImageTag extends SvgFilterPrimitiveTag, SvgLinkAttributes, SvgViewportAttributes {
      crossorigin?: CrossOrigin;
    }
    interface SvgMergeNodeTag extends SvgTag {
      in?: string;
    }
    interface SvgMorphologyTag extends SvgFilterInputTag {
      operator?: "erode" | "dilate";
      radius?: SvgLength;
    }
    interface SvgTurbulenceTag extends SvgFilterPrimitiveTag {
      baseFrequency?: SvgLength;
      numOctaves?: SvgLength;
      seed?: SvgLength;
      stitchTiles?: "stitch" | "noStitch";
      type?: "fractalNoise" | "turbulence";
    }

    // These names are shared by HTML and SVG in the JSX namespace.
    interface HtmlAnchorTag extends SvgTag, SvgLinkAttributes {}
    interface HtmlScriptTag extends SvgTag, SvgLinkAttributes {}
    interface HtmlStyleTag extends SvgTag {}

    interface IntrinsicElements {
      svg: SvgRootTag;
      animate: SvgAnimateTag;
      animateMotion: SvgAnimateMotionTag;
      animateTransform: SvgAnimateTransformTag;
      circle: SvgCircleTag;
      clipPath: SvgClipPathTag;
      defs: SvgTag;
      desc: SvgTag;
      ellipse: SvgEllipseTag;
      feBlend: SvgBlendTag;
      feColorMatrix: SvgColorMatrixTag;
      feComponentTransfer: SvgFilterInputTag;
      feComposite: SvgCompositeTag;
      feConvolveMatrix: SvgConvolveMatrixTag;
      feDiffuseLighting: SvgDiffuseLightingTag;
      feDisplacementMap: SvgDisplacementMapTag;
      feDistantLight: SvgDistantLightTag;
      feDropShadow: SvgDropShadowTag;
      feFlood: SvgFilterPrimitiveTag;
      feFuncA: SvgComponentFunctionTag;
      feFuncB: SvgComponentFunctionTag;
      feFuncG: SvgComponentFunctionTag;
      feFuncR: SvgComponentFunctionTag;
      feGaussianBlur: SvgGaussianBlurTag;
      feImage: SvgFilterImageTag;
      feMerge: SvgFilterPrimitiveTag;
      feMergeNode: SvgMergeNodeTag;
      feMorphology: SvgMorphologyTag;
      feOffset: SvgOffsetTag;
      fePointLight: SvgPointLightTag;
      feSpecularLighting: SvgSpecularLightingTag;
      feSpotLight: SvgSpotLightTag;
      feTile: SvgFilterInputTag;
      feTurbulence: SvgTurbulenceTag;
      filter: SvgFilterTag;
      foreignObject: SvgTag & SvgBounds;
      g: SvgTag;
      image: SvgImageTag;
      line: SvgLineTag;
      linearGradient: SvgLinearGradientTag;
      marker: SvgMarkerTag;
      mask: SvgMaskTag;
      metadata: SvgTag;
      mpath: SvgTag & SvgLinkAttributes;
      path: SvgPathTag;
      pattern: SvgPatternTag;
      polygon: SvgPolyTag;
      polyline: SvgPolyTag;
      radialGradient: SvgRadialGradientTag;
      rect: SvgRectTag;
      set: SvgSetTag;
      stop: SvgStopTag;
      switch: SvgTag;
      symbol: SvgSymbolTag;
      text: SvgTextTag;
      textPath: SvgTextPathTag;
      tspan: SvgTextTag;
      use: SvgUseTag;
      view: SvgViewTag;
    }
  }
}
