declare module "jsx-htmx/jsx-runtime" {
  namespace JSX {
    // MathML Core: https://w3c.github.io/mathml-core/
    interface MathStyleAttributes {
      displaystyle?: Booleanish;
      scriptlevel?: string | number;
      mathbackground?: string;
      mathcolor?: string;
      mathsize?: string | number;
    }
    interface MathTag extends SvgCoreAttributes, GlobalEvents, HtmxAttributes, MathStyleAttributes {
      dir?: "ltr" | "rtl";
      xmlns?: string;
      intent?: string;
      arg?: string;
    }
    interface MathOperatorTag extends MathTag {
      form?: "prefix" | "infix" | "postfix";
      fence?: Booleanish;
      separator?: Booleanish;
      stretchy?: Booleanish;
      symmetric?: Booleanish;
      largeop?: Booleanish;
      movablelimits?: Booleanish;
      lspace?: string | number;
      rspace?: string | number;
      minsize?: string | number;
      maxsize?: string | number;
    }
    interface MathSpaceTag extends MathTag {
      width?: string | number;
      height?: string | number;
      depth?: string | number;
    }
    interface MathPaddedTag extends MathSpaceTag {
      lspace?: string | number;
      voffset?: string | number;
    }
    interface HtmlAnchorTag extends MathStyleAttributes {}

    interface IntrinsicElements {
      math: MathTag & { display?: "block" | "inline" };
      annotation: MathTag & { encoding?: string };
      "annotation-xml": MathTag & { encoding?: string };
      maction: MathTag & { actiontype?: string; selection?: string | number };
      merror: MathTag;
      mfrac: MathTag & { linethickness?: string | number };
      mi: MathTag & { mathvariant?: "normal" };
      mmultiscripts: MathTag;
      mn: MathTag;
      mo: MathOperatorTag;
      mover: MathTag & { accent?: Booleanish };
      mpadded: MathPaddedTag;
      mphantom: MathTag;
      mprescripts: MathTag;
      mroot: MathTag;
      mrow: MathTag;
      ms: MathTag;
      mspace: MathSpaceTag;
      msqrt: MathTag;
      mstyle: MathTag;
      msub: MathTag;
      msubsup: MathTag;
      msup: MathTag;
      mtable: MathTag;
      mtd: MathTag & { columnspan?: string | number; rowspan?: string | number };
      mtext: MathTag;
      mtr: MathTag;
      munder: MathTag & { accentunder?: Booleanish };
      munderover: MathTag & { accent?: Booleanish; accentunder?: Booleanish };
      semantics: MathTag;
    }
  }
}
