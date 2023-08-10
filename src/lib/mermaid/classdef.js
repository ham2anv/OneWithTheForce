/**
 * A legal CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value color}
 * value. This includes hexadecimal codes, as well as color functions like
 * rgb() and hsl().
 * @typedef {string} CssColor
 */

import { idGenerator } from "./utils.js";

const classIdGen = idGenerator("class");

/**
 * A legal CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/length length}
 * value. This includes lengths in absolute units like px, as well as
 * relative units like em and rem.
 * @typedef {string} CssLength
 */

/**
 * A legal SVG {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray stroke-dasharray} string. This is a series of
 * lengths and percentages separated by commas and/or white space.
 * @typedef {string} SvgDashArray
 */

const cdNameGen = idGenerator("class");

/** Represents a class definition for styling nodes. */
export class ClassDef {
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
   * The class definition's name.
   * @type {string}
   */
  get name() {
    return this.#name;
  }


  /**
   * The class definition's style as an object.
   * @type {{color: CssColor, fill: CssColor, stroke: CssColor, strokeWidth:
   * string, strokeDash: string}}
   * @property {CssColor} color The style's text color.
   * @property {CssColor} fill The style's fill color.
   * @property {CssColor} stroke The style's stroke color.
   * @property {CssLength} strokeWidth The style's stroke width.
   * @property {SvgDashArray} strokeDash The style's stroke-dasharray.
   */
  get style() {
    return this.#style;
 }


 /**
   * Creates a new ClassDef instance.
   * @param {string} name The class definition's name.
   */
  constructor(name) {
    if (name === undefined) throw Error("Definition must have a name.")

    this.#name = name;
    this.#style = {
      color: null,
      fill: null,
      stroke: null,
      strokeWidth: null,
      strokeDash: null,
    };
  }


  /**
   * Creates a new class definition that is a copy of the given class
   * definition.
   * @param {ClassDef} classDef The class definition to be copied.
   * @param {string} [name] Name for the new class definition.
   * @returns {ClassDef} A new ClassDef instance.
   * @throws {TypeError} If classDef is not a ClassDef object.
   */
  static from(classDef, name) {
    if (!(classDef instanceof ClassDef))
      throw TypeError("Requires a source ClassDef object.");
    return new ClassDef(name ?? classIdGen.next().value)
      .color(classDef.style.color)
      .fill(classDef.style.fill)
      .stroke(classDef.style.stroke)
      .strokeDash(classDef.style.strokeDash)
      .strokeWidth(classDef.style.strokeWidth);
  }


  /**
   * Sets the class definition's text color to the given color.
   * @param {CssColor} color The color to set the style's text color to.
   * @returns {ClassDef} The current ClassDef instance.
   */
  color(color) {
    // if (!(color instanceof String)) color = color.toString();
    this.#style.color = color;
    return this;
  }


  /**
   * Sets the class definition's fill color to the given color.
   * @param {CssColor} color The color to set the style's fill color to.
   * @returns {ClassDef} The current ClassDef instance.
   */
  fill(color) {
    // if (!(color instanceof String)) color = color.toString();
    this.#style.fill = color;
    return this;
  }


  /**
   * Sets the class definition's stroke color to the given color.
   * @param {CssColor} color The color to set the style's stroke color to.
   * @returns {ClassDef} The current ClassDef instance.
   */
  stroke(color) {
    // if (!(color instanceof String)) color = color.toString();
    this.#style.stroke = color;
    return this;
  }


  /**
   * Sets the class definition's stroke width to the given length.
   * @param {CssLength} length The length to set the style's stroke width to.
   * @returns {ClassDef} The current ClassDef instance.
   */
  strokeWidth(length) {
    // if (!(color instanceof String)) color = color.toString();
    this.style.strokeWidth = length;
    return this;
  }


  /**
   * Sets the class definition's stroke dash array to the given string.
   * @param {SvgDashArray} dash_array The string to set the style's
   * stroke-dasharray to.
   * @returns {ClassDef}
   */
  strokeDash(dash_array) {
    // if (!(color instanceof String)) color = color.toString();
    this.style.strokeDash = dash_array;
    return this;
  }


  /**
   * Returns the Mermaid-syntax string representing the class definition.
   * @returns {string}
   */
  render() {
    let md = "\nclassDef " + this.name + " ";

    let styles = [];
    for (const [key, value] of Object.entries(this.style)) {
      if (value !== null)
        styles.push(`${key === "strokeWidth" ? "stroke-width" : key}:${value}`);
    }

    md += styles.join(",") + "\n";
    return md;
  }
}