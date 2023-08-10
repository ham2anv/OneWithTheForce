import { ClassDef } from "./classdef.js";
import { Enum, idGenerator } from "./utils.js";

const newId = idGenerator("node");

/** Represents a node in a graph. */
export class ChartNode {
  /**
   * Flags if the node has been rendered previously in the current rendering.
   * @private
   * @type {boolean}
   */
  #hasBeenRendered;
  /**
   * The unique id of the node.
   * @private
   * @type {string}
   */
  #id;
  /**
   * The node's class definition.
   * @private
   * @type {ClassDef}
   */
  #node_class;
  /**
   * The node's shape.
   * @private
   * @type {NodeShape}
   */
  #node_shape;
  /**
   * The node's text.
   * @private
   * @type {string}
   */
  #node_text;



  /**
   * Whether the node has been previously rendered in the current rendering.
   * @type {boolean}
  */
  get hasBeenRendered() {
    return this.#hasBeenRendered;
  }


  /** 
   * The node's unique id string. 
   * @type {string}
  */
  get id() {
    return this.#id;
  }


  /** 
   * The node's class definition. 
   * @type {ClassDef}
  */
  get nodeClass() {
    return this.#node_class;
  }


  /** 
   * The node's shape. 
   * @type {NodeShape}
  */
  get nodeShape() {
    return this.#node_shape;
  }


  /** 
   * The node's text. 
   * @type {string}
  */
  get nodeText() {
    return this.#node_text;
  }


  /**
   * Creates a new ChartNode instance.
   * @param {string} id - A unique id for the node.
   */
  constructor(id = newId.next().value) {
    this.#hasBeenRendered = false;
    this.#id = id;
    this.#node_class = null;
    this.#node_shape = null;
    this.#node_text = "";
  }


  /**
   * Creates a new node that is a copy of the given node and returns it.
   * @param {ChartNode} node - The node to copy.
   * @returns {ChartNode} A new ChartNode instance.
   * @throws {TypeError} If node is not a ChartNode object.
   */
  static from(node, id = newId.next().value) {
    if (!(node instanceof ChartNode))
      throw TypeError("Requires a source ChartNode object.");
    const newNode = new ChartNode(id)
      .text(node.nodeText);
    if (node.nodeClass) newNode.class(node.nodeClass);
    if (node.nodeShape) newNode.shape(node.nodeShape);
    return newNode;
  }


  /**
   * Sets the node's class definition. (If classDef is ommitted, clears the
   * node's class definition.)
   * @param {ClassDef} classDef - The class definition to set.
   * @returns {ChartNode} The current ChartNode instance.
   * @throws {TypeError} If classDef is not a ClassDef object.
   */
  class(classDef) {
    if (classDef === undefined) {
      this.#node_class = null;
      return this;
    }
    if (!(classDef instanceof ClassDef))
      throw TypeError("classDef must be a ClassDef object.");
    this.#node_class = classDef;
    return this;
  }


  /**
   * Sets the node's shape. (If shape is ommitted, clears the node's shape.)
   * @param {string} shape - The string to set the node's shape.
   * @returns {ChartNode} The current ChartNode instance.
   */
  shape(shape) {
    if (shape === undefined) {
      this.#node_shape = null;
      return this;
    }
    if (!NodeShape.match(shape))
      throw TypeError("Value must be a valid node shape.")
    this.#node_shape = NodeShape[shape];
    return this;
  }


  /**
   * Sets the node's text. (If text is ommitted, clears the node's text.)
   * @param {string} text - The string to set as the node's text. 
   * @returns {ChartNode}
   */
  text(text = "") {
    this.#node_text = text;
    return this;
  }


  /**
   * Returns the Mermaid-syntax string representing the node.
   * @returns {string}
   */
  render() {
    let text = "";
    if (!this.#hasBeenRendered) {
      const shape = this.nodeShape ?? NodeShape.default;
      text = (this.#node_text
        ? shape.start + this.#node_text + shape.end
        : ""
      );
    }
    this.#hasBeenRendered = true;
    return this.#id + text;
  }


  /** 
   * Reset's the flag denoting whether the node has been rendered. 
   * @ignore
  */
  reset() {
    this.#hasBeenRendered = false;
  }
}

/**
 * A shape for nodes on a graph. Options: 'round-rect', 'pill', 'stadium',
 * 'subroutine', 'cylinder', 'database', 'circle', 'asymmetric', 'flag',
 * 'diamond', 'rhombus', 'hex', 'hexagon', 'parallel-r', 'skew-r',
 * 'parallel-l', 'skew-l', 'trapezoid', 'trapezoid-alt', 'double-circle'.
 * @typedef {string} NodeShape
 */

/**
 * Enum for checking valid node shapes.
 * @readonly
 * @enum {string}
 */
export class NodeShape extends Enum {
  static "round-rect" = { start: "(", end: ")", name: "round-rect" };
  static "pill" = { start: "([", end: "])", name: "pill" };
  static "stadium" = { start: "([", end: "])", name: "stadium" };
  static "subroutine" = { start: "[[", end: "]]", name: "subroutine" };
  static "cylinder" = { start: "[(", end: ")]", name: "cylinder" };
  static "database" = { start: "[(", end: ")]", name: "database" };
  static "circle" = { start: "((", end: "))", name: "circle" };
  static "asymmetric" = { start: ">", end: "]", name: "asymmetric" };
  static "flag" = { start: ">", end: "]", name: "flag" };
  static "diamond" = { start: "{", end: "}", name: "diamond" };
  static "rhombus" = { start: "{", end: "}", name: "rhombus" };
  static "hex" = { start: "{{", end: "}}", name: "hex" };
  static "hexagon" = { start: "{{", end: "}}", name: "hexagon" };
  static "parallel-r" = { start: "[/", end: "/]", name: "parallel-r" };
  static "skew-r" = { start: "[/", end: "/]", name: "skew-r" };
  static "parallel-l" = { start: "[\\", end: "\\]", name: "parallel-l" };
  static "skew-l" = { start: "[\\", end: "\\]", name: "skew-l" };
  static "trapezoid" = { start: "[/", end: "\\]", name: "trapezoid" };
  static "trapezoid-alt" = { start: "[\\", end: "/]", name: "trapezoid-alt" };
  static "double-circle" = { start: "(((", end: ")))", name: "double-circle" };
  static default = { start: "[", end: "]", name: "default" };
}

/**
 * Returns the start and end strings for rendering a node.
 * @param {'round-rect'|'pill'|'stadium'|'subroutine'|'cylinder'|'database'|
   * 'circle'|'asymmetric'|'flag'|'diamond'|'rhombus'|'hex'|'hexagon'|
* 'parallel-r'|'skew-r'|'parallel-l'|'skew-l'|'trapezoid'|'trapezoid-alt'|
* 'double-circle'|string} nodeStyle
 * @returns {{start: string, end: string}}
 * @property {string} start The shape's start string.
 * @property {string} end The shape's end string.
 * @ignore
 */
function getNodeShape(nodeStyle) {
  switch (nodeStyle) {
    case "round-rect":
      return { start: "(", end: ")" };
    case "pill":
    case "stadium":
      return { start: "([", end: "])" };
    case "subroutine":
      return { start: "[[", end: "]]" };
    case "cylinder":
    case "database":
      return { start: "[(", end: ")]" };
    case "circle":
      return { start: "((", end: "))" };
    case "asymmetric":
    case "flag":
      return { start: ">", end: "]" };
    case "diamond":
    case "rhombus":
      return { start: "{", end: "}" };
    case "hex":
    case "hexagon":
      return { start: "{{", end: "}}" };
    case "parallel-r":
    case "skew-r":
      return { start: "[/", end: "/]" };
    case "parallel-l":
    case "skew-l":
      return { start: "[\\", end: "\\]" };
    case "trapezoid":
      return { start: "[/", end: "\\]" };
    case "trapezoid-alt":
      return { start: "[\\", end: "/]" };
    case "double-circle":
      return { start: "(((", end: ")))" };
    default:
      return { start: "[", end: "]" };
  }
}
