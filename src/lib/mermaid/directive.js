import { Enum } from './utils.js';

/** Represents a Mermaid graph directive. */
export class Directive {
  /**
   * The directive's settings for flowchart graphs.
   * @private
   */
  #flowchart;
  /**
   * The directive's font family.
   * @private
   */
  #fontFamily;
  /**
   * The directive's theme, from the selection of built-in themes.
   * @private
   */
  #theme;

  #variables;

  /**
   * The directive's flowchart settings as an object.
   * @type {{titleTopMargin: number, diagramPadding: number, htmlLabels: boolean, nodeSpacing: number, rankSpacing: number, curve: string, padding: number, useMaxWidth: boolean}}
   * @property {number} titleTopMargin The top margin for text above the graph.
   * @property {number} diagramPadding The padding around the graph.
   * @property {boolean} htmlLabels Whether or not to use an html element for
   *   labels.
   * @property {number} nodeSpacing The spacing between nodes on the same level.
   * @property {number} rankSpacing The spacing between nodes on different
   *   levels.
   * @property {CurveType} curve The type of curve to use when rendering lines
   *   between nodes.
   * @property {boolean} useMaxWidth Whether or not the graph scales with the
   *   available space.
   */
  get flow() {
    return this.#flowchart;
  }

  /**
   * The directive's font family.
   * @type {string}
   */
  get family() {
    return this.#fontFamily;
  }

  /**
   * The directive's theme.
   * @type {ThemeType}
   */
  get themed() {
    return this.#theme;
  }

  /** Creates a new Directive instance. */
  constructor() {
    this.#theme = null;
    this.#fontFamily = null;
    this.#flowchart = null;
    this.#variables = null;
  }

  /**
   * Sets the curve type for flowchart graphs. (If value is ommitted, removes
   * the current curve type, if any.)
   * @param {CurveType} value The curve type to set.
   * @returns {Directive} The current Directive instance.
   * @throws {TypeError} If value is anything other than a valid CurveType.
   */
  curve(value) {
    if (!(this.#flowchart instanceof Object)) this.#flowchart = {};

    if (value === undefined) delete this.#flowchart.curve;
    else if (!Curve.match(value)) throw TypeError('Value must match a valid curve option.');
    else this.#flowchart.curve = value;

    if (!Object.keys(this.#flowchart).length) {
      this.#flowchart = null;
    }

    return this;
  }

  /**
   * Sets multiple flowchart properties at one time. (If value is ommitted,
   * clears all flowchart properties.)
   * @see Directive#flow
   * @param {Object} [value] - An object that sets multiple flowchart
   *   properties at once.
   * @param {number} [value.titleTopMargin] The top margin for text above the
   *   graph.
   * @param {number} [value.diagramPadding] The padding around the graph.
   * @param {boolean} [value.htmlLabels] Whether or not to use an html element
   *   for labels.
   * @param {number} [value.nodeSpacing] The spacing between nodes on the same
   *   level.
   * @param {number} [value.rankSpacing] The spacing between nodes on different
   *   levels.
   * @param {CurveType} [value.curve] The type of curve to use when rendering
   *   lines between nodes.
   * @param {boolean} [value.useMaxWidth] Whether or not the graph scales with
   *   the available space.
   * @returns {Directive} The current Directive instance.
   * @throws {TypeError} If value is anything but an object.
   * @throws {RangeError} If value contains any properties that aren't valid
   *   flowchart properties.
   */
  flowchart(value) {
    if (value === undefined) {
      this.#flowchart = null;
      return this;
    }

    if (!(value instanceof Object)) throw TypeError('Value must be an object.');

    if (!(this.#flowchart instanceof Object)) this.#flowchart = {};

    this.#flowchart = {
      ...this.#flowchart,
      ...Object.entries(value).reduce((acc, [key, value]) => {
        if (!FlowProps.entries().some(([prop, propVal]) => prop === key))
          throw RangeError(`'${key}' is not a valid flowchart property.`);

        if (value) acc[key] = value;
        return acc;
      }, {})
    };

    return this;
  }

  /**
   * Sets the directive's font family. (If newFamily is ommitted, clears the
   * font family.)
   * @param {string} newFamily The CSS font-family value to set.
   * @returns {Directive} The current Directive instance.
   * @throws {TypeError} If newFamily is anything but a string.
   */
  fontFamily(newFamily) {
    if (newFamily === undefined) {
      this.#fontFamily = null;
      return this;
    }

    if (typeof newFamily !== 'string') throw TypeError('Value must be a string.');

    this.#fontFamily = newFamily;
    return this;
  }

  /**
   * Sets whether to use html elements for labels in the flowchart. (If value is ommitted, clears the htmlLabels flowchart property.)
   * @param {boolean} value
   * @returns {Directive} The current Directive instance.
   */
  htmlLabels(value = true) {
    if (!(this.#flowchart instanceof Object)) this.#flowchart = {};
    else if (typeof this.#flowchart !== 'boolean') this.#flowchart = null;
    this.#flowchart.htmlLabels = value;
    return this;
  }

  /**
   * Sets the directive's theme to the given value.
   * @param {ThemeType} newTheme The valid theme string to apply.
   * @returns {Directive}
   */
  theme(newTheme) {
    this.#theme = newTheme;
    return this;
  }

  /**
   * @param {Object<string,string>} obj
   * @returns {Directive}
   */
  variables(obj) {
    this.#variables = { ...this.#variables, ...obj };
    return this;
  }

  /**
   * Returns the Mermaid-syntax string representing the directive.
   * @returns {string}
   */
  render() {
    let result = `%%{ init: {`;
    let args = [];
    if (this.#theme) args.push(`"theme": "${this.#theme}"`);
    if (this.#fontFamily) args.push(`"fontFamily": "${this.#fontFamily}"`);
    if (this.#variables)
      args.push(
        `"themeVariables": ${JSON.stringify(this.#variables)}`
      );
    if (this.#flowchart)
      args.push(
        `"flowchart": {${Object.entries(this.#flowchart).map(
          ([key, value]) => `"${key}": "${value}"`
        )}}`
      );
    result += args.join(', ') + '} }%%\n';
    return result;
  }
}

/**
 * A type of curve for rendering lines in graphs. Options: 'basis', 'bumpX',
 * 'bumpY', 'cardinal', 'catmullRom', 'linear', 'monotoneX', 'monotoneY',
 * 'natural', 'step', 'stepAfter', 'stepBefore'.
 * @typedef {string} CurveType
 */

/**
 * Enum for checking valid curve types.
 * @readonly
 * @enum {string}
 */
export class Curve extends Enum {
  static basis = 'basis';
  static bumpX = 'bumpX';
  static bumpY = 'bumpY';
  static cardinal = 'cardinal';
  static catmullRom = 'catmullRom';
  static linear = 'linear';
  static monotoneX = 'monotoneX';
  static monotoneY = 'monotoneY';
  static natural = 'natural';
  static step = 'step';
  static stepAfter = 'stepAfter';
  static stepBefore = 'stepBefore';
}

/**
 * Enum for checking valid flowchart directive properties.
 * @readonly
 * @enum {string}
 */
export class FlowProps extends Enum {
  static titleTopMargin;
  static diagramPadding;
  static htmlLabels;
  static nodeSpacing;
  static rankSpacing;
  static curve;
  static useMaxWidth;
}

/**
 * The built-in theme to use for styling the graph. Options: 'default', 'forest', 'dark', 'neutral', 'null'.
 * @typedef {string} ThemeType
 */
