import { LinkDef } from "./linkdef.js";
import { Enum } from "./utils.js";

/** Represents a connection between two nodes in a graph. */
export class Connection {
  /**
   * The connection's depth, if any.
   * @private
   * @type {number}
   */
  #depth;
  /**
   * The node on the first end of the connection.
   * @private
   * @type {ChartNode}
   */
  #from_node;
  /**
   * The connection's link definition.
   * @private
   * @type {LinkDef}
   */
  #link_class;
  /**
   * The connection's line style (none, dotted, or thick).
   * @private
   * @type {string}
   */
  #link_style;
  /**
   * The text to appear on the connection's line.
   * @private
   * @type {string}
   */
  #link_text;
  /**
   * The node on the second end of the connection.
   * @private
   * @type {ChartNode}
   */
  #to_node;


  /**
   * The connection's depth in ranks.
   * @type {number}
   */
  get depth() {
    return this.#depth;
  }


  /**
   * An object representing the node on the first end of the connection and the
   * arrow pointing to it, if any.
   * @type {Object<ChartNode, boolean, ArrowStyle>}
   * @property {ChartNode} node The node on the first end of the connection.
   * @property {boolean} arrow Whether an arrow points at the node.
   * @property {ArrowStyle} arrowStyle The style of the arrow, if any.
   */
  get fromNode() {
    return this.#from_node;
  }


  /**
   * The connection's link definition.
   * @type {LinkDef}
   */
  get linkClass() {
    return this.#link_class;
  }


  /**
   * The style of the connection's line (none, dotted, or thick).
   * @type {string}
   */
  get linkStyle() {
    return this.#link_style;
  }


  /**
   * The text to appear on the connection's line.
   * @type {string}
   */
  get linkText() {
    return this.#link_text;
  }


  /**
   * The node on the second end of the connection.
   * @type {ChartNode}
   */
  get toNode() {
    return this.#to_node;
  }

  /**
   * Creates a new Connection instance.
   * @param {number} [depth] The depth of the connection, if any.
   */
  constructor(depth) {
    if (depth !== undefined && !parseInt(depth))
      throw Error("If included, depth must be an integer.");
    this.#depth = depth || 0;
    this.#from_node = null;
    this.#link_class = null;
    this.#link_style = null;
    this.#link_text = null;
    this.#to_node = null;
  }


  /**
   * Sets the connection's link definition. (If linkDef ommitted, clears the
   * connection's link definition.)
   * @param {LinkDef} [linkDef] The link definition to set.
   * @returns {Connection} The current Connection instance.
   * @throws {TypeError} If linkDef is a non-LinkDef object.
   */
  class(linkDef) {
    if (linkDef === undefined) {
      this.#link_class = null;
      return this;
    }
    if (linkDef && !(linkDef instanceof LinkDef))
      throw TypeError("If included, linkDef must be a LinkDef object.");
    this.#link_class = LinkDef.from(linkDef)
    return this;
  }

  /**
   * Adds a node to the first end of the connection.
   * @param {ChartNode} node The node to assign to the connection.
   * @param {boolean} arrow Whether an arrow points to the node.
   * @param {string} arrowStyle The style of the arrow, if any.
   * @returns {Connection}
   */
  from(node = null, arrow = false, arrowStyle = "default") {
    this.from_node = { node: node, arrow: arrow, arrowStyle: arrowStyle };
    return this;
  }


  /**
   * Sets the line style of the connection.
   * @param {string} style The line style to set.
   * @returns {Connection} The current Connection instance.
   */
  style(style = null) {
    this.link_style = style;
    return this;
  }


  /**
   * Sets the text to appear on the connection's line.
   * @param {string} text The text to set.
   * @returns {Connection} The current Connection instance.
   */
  text(text = null) {
    this.link_text = text;
    return this;
  }


  /**
   * Adds a node to the second end of the connection.
   * @param {ChartNode} node The node to add.
   * @param {boolean} arrow Whether an arrow points to the node.
   * @param {string} arrowStyle The style of arrow, if any.
   * @returns {Connection}
   */
  to(node = null, arrow = false, arrowStyle = "default") {
    this.to_node = { node: node, arrow: arrow, arrowStyle: arrowStyle };
    return this;
  }


  /**
   * Returns the Mermaid-syntax string representing the connection.
   * @returns {string}
   */
  render() {
    let fromN = this.from_node;
    let toN = this.to_node;
    const start = getArrowStyle(fromN.arrowStyle, fromN.arrow);
    const end = getArrowStyle(toN.arrowStyle, !toN.arrow);

    let line_length = 3 + this.depth;
    if (fromN.arrow || toN.arrow) line_length--;
    if (line_length % 2 === 0 && this.link_style === "dotted") line_length++;
    let line = new Array(line_length).fill("");
    switch (this.link_style) {
      case "dotted":
        line = line.map((d, i) => ["-", "."][i % 2]);
        break;
      case "thick":
        line = line.map((d) => "=");
        break;
      default:
        line = line.map((d) => "-");
        break;
    }

    return (
      fromN.node.render() +
      (fromN.arrow ? start : " ") +
      line.join("") +
      (toN.arrow ? end : "") +
      (this.link_text ? `|${this.link_text}| ` : " ") +
      toN.node.render()
    );
  }
}


/**
 * Returns the start and end strings for an arrow of the given style.
 * @private
 * @param {string} style The style of the arrow
 * @param {boolean} left Whether the node is on the left.
 * @returns {string} The appropriate character for the arrow style.
 */
function getArrowStyle(style, left = false) {
  switch (style) {
    case "round":
      return "o";
    case "x":
      return "x";
    default:
      return left ? "<" : ">";
  }
}


/**
 * A valid arrow style for lines on a graph. Options: 'default', 'round', 'x'.
 * @typedef {string} ArrowStyle
*/

/** 
 * Enum for checking valid arrow styles. 
 * @readonly
 * @enum {string}
 */
export class ArrowStyle extends Enum {
  static default = "default";
  static round = "round";
  static x = "x";
}