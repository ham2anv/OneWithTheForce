import { ClassDef } from "./classdef.js";
import { idGenerator } from "./utils.js";

const linkNameGen = idGenerator("link");

/**
 * Represents a link style definition.
 * @extends ClassDef
 */
export class LinkDef extends ClassDef {
  /**
   * The class definition's name.
   * @private
   * @type {string}
   */
  #name;
  /**
   * The class definition's styles.
   * @private
   * @type {{color: CssColor, fill: CssColor, stroke: CssColor, strokeWidth:
   * CssLength, strokeDash: SvgDashArray}}
   * @property {CssColor} color The style's text color.
   * @property {CssColor} fill The style's fill color.
   * @property {CssColor} stroke The style's stroke color.
   * @property {CssLength} strokeWidth The style's stroke width.
   * @property {SvgDashArray} strokeDash The style's stroke-dasharray.
   */
  #style;


  /** 
   * Creates a new LinkDef instance. 
   * @param {string} name The link definition's name.
   */
  constructor() {
    super("link");

    this.#name = null;
    this.#style = {
      color: null,
      fill: null,
      stroke: null,
      strokeWidth: null,
      strokeDash: null,
    };

  }


  /**
   * Creates a new link definition that is a copy of the given link
   * definition.
   * @param {LinkDef} linkDef The class definition to be copied.
   * @returns {LinkDef} A new LinkDef instance.
   * @throws {TypeError} If linkDef is not a ClassDef object.
   */
  static from(linkDef) {
    if (!(linkDef instanceof LinkDef))
      throw TypeError("Requires a source LinkDef object.");
    return new LinkDef(linkNameGen.next().value)
      .color(linkDef.style.color)
      .fill(linkDef.style.fill)
      .stroke(linkDef.style.stroke)
      .strokeDash(linkDef.style.strokeDash)
      .strokeWidth(linkDef.style.strokeWidth);
  }


  /**
   * Renders the link definition.
   * @param {(number|string)[]} [n="default"] - Number of the associated connection in
   * order as defined in the graph. (If ommitted, renders a default link
   * definition.)
   * @returns {string} The Mermaid-syntax representation of the link definition.
   */
  render(n = ["default"]) {
    let md = "\nlinkStyle " + n.join(",") + " ";

    let styles = [];
    for (const [key, value] of Object.entries(this.style)) {
      if (value !== null)
        styles.push(`${key === "strokeWidth"
          ? "stroke-width"
          : key === "strokeDash"
            ? "stroke-dasharray"
            : key}:${value}`);
    }

    md += styles.join(",");
    return md;
  }
}