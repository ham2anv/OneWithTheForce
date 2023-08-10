import { ChartNode } from "./chart-node.js";
import { ClassDef } from "./classdef.js";
import { Connection } from "./connection.js";
import { Directive } from "./directive.js";
import { LinkDef } from "./linkdef.js";
import { idGenerator, slugify } from "./utils.js";

const subgraphGen = idGenerator("sub");

/** Represents a Mermaid flowchart graph. */
export class FlowChart {
  /** 
   * Direction of the graph. 
   * @private 
   * @type {string}
  */
  #chart_direction;
  /**
   * Collection of class definitions included in the graph. 
   * @private 
   * @type {Array<ClassDef>} 
  */
  #classes;
  /** 
   * Collection of connections included in the graph.
   * @private 
   * @type {Array<Connection>} 
  */
  #connections;
  /** 
   * The graph's default class definition.
   * @private 
   * @type {ClassDef} 
  */
  #default_class;
  /** 
   * The graph's default link definition.
   * @private 
   * @type {LinkDef} 
  */
  #default_link;
  /** 
   * Collection of directives included in the graph.
   * @private 
   * @type {Array<Directive>} 
  */
  #directives;
  /** 
   * Name of the graph, only used if a subgraph of another graph.
   * @private 
   * @type {string} 
  */
  #name;
  /** 
   * Collection of nodes included in the graph.
   * @private 
   * @type {Array<ChartNode>} 
  */
  #nodes;
  /** 
   * Class definition applied to the graph when used as a subgraph.
   * @private 
   * @type {ClassDef} 
  */
  #style;
  /** 
   * Collection of subgraphs included in the graph.
   * @private 
   * @type {Array<FlowChart>}
  */
  #subgraphs;


  /** 
   * The graph's direction (or orientation).
   * @type {string}
  */
  get chartDirection() {
    return this.#chart_direction;
  }


  /** 
   * An array of the class definitions included in the graph. 
   * @type {Array<ClassDef>}
  */
  get classes() {
    return this.#classes;
  }


  /** 
   * An array of the connections included in the graph. 
   * @type {Array<Connection>}
  */
  get connections() {
    return this.#connections;
  }


  /** 
   * The graph's default class and link definitions. 
   * @type {{class: ClassDef, link: LinkDef}}
   * @property {ClassDef} class The graph's default class definition.
   * @property {LinkDef} link The graph's default link definition.
  */
  get default() {
    return {
      class: this.#default_class,
      link: this.#default_link
    }
  }


  /** 
   * An array of the directives included in the graph. 
   * @type {Array<Directive>}
  */
  get directives() {
    return this.#directives;
  }


  /** 
   * The graph's name. 
   * @type {string}
  */
  get name() {
    return this.#name;
  }


  /** 
   * An array of all nodes in the graph. 
   * @type {Array<ChartNode>}
  */
  get nodes() {
    return this.#nodes;
  }


  /** 
   * The class definition applied to the graph when used as a subgraph. 
   * @type {ClassDef}
  */
  get style() {
    return this.#style;
  }


  /** 
   * An array of the subgraphs included in the graph. 
   * @type {Array<FlowChart>}
  */
  get subgraphs() {
    return this.#subgraphs;
  }


  /**
   * Creates a new flowchart instance.
   * @param {string} [name=null] - A name for the graph, only used if a
   *   subgraph of another graph.
   */
  constructor(name = null) {
    this.#chart_direction = "TD";
    this.#classes = [];
    this.#connections = [];
    this.#default_class = null;
    this.#default_link = null;
    this.#directives = [];
    this.#name = name;
    this.#nodes = [];
    this.#style = null;
    this.#subgraphs = [];
  }


  /**
   * Creates a new flowchart graph that is a copy of an existing graph and
   * returns it.
   * @example
   * const chart1 = new FlowChart().connect("node1","node2");
   * const chart2 = FlowChart.from(chart1);
   * @param {FlowChart} chart - The graph to copy.
   * @returns {FlowChart}
   */
  static from(chart) {
    if (!(chart instanceof FlowChart))
      throw TypeError("Requires a source FlowChart object.");
    return new FlowChart()
      .addClass(...chart.classes)
      .addConnection(...chart.connections)
      .addDirective(...chart.directives)
      .addNode(...chart.nodes)
      .addStyle(chart.style)
      .addSubgraph(...chart.subgraphs)
      .named(chart.name)
  }


  /**
   * Adds new class definitions to the graph. These are rendered at the end of
   *   the graph and include any associated nodes.
   * @param  {...ClassDef} classDefs - Class definitions to be added to the
   *   graph.
   * @returns {FlowChart} The current FlowChart instance.
   * @throws {TypeError} If classDefs includes a non-ClassDef param.
   */
  addClass(...classDefs) {
    if (classDefs.some(cd => !(cd instanceof ClassDef)))
      throw TypeError("classDefs must contain only ClassDef objects.");
    for (const classDef of classDefs) {
      if (classDef !== null && !this.#classes.includes(classDef))
        this.#classes.push(classDef);
    }
    return this;
  }


  /**
   * Adds new connections to the graph. Adds associated nodes that are not
   *   already in the graph.
   * @param  {...Connection} connections - Connections to be added to the graph.
   * @returns {FlowChart} The current FlowChart instance.
   * @throws {TypeError} If connections includes a non-Connection param.
   */
  addConnection(...connections) {
    if (connections.some(c => !(c instanceof Connection)))
      throw TypeError("connections must contain only Connection objects.");
    for (const connection of connections) {
      if (connection !== null && !this.#connections.includes(connection))
        this.#connections.push(connection);
      if (!this.#nodes.includes(connection.from_node.node))
        this.#nodes.push(connection.from_node.node);
      if (!this.#nodes.includes(connection.to_node.node))
        this.#nodes.push(connection.to_node.node);
    }
    return this;
  }

  /**
   * Adds new directives to the graph. These are rendered at the start of the
   *   graph.
   * @param  {...Directive} directives - Directives to be added to the graph.
   * @returns {FlowChart} The current FlowChart instance.
   * @throws {TypeError} If directives includes a non-Directive param.
   */
  addDirective(...directives) {
    if (directives.some(d => !(d instanceof Directive)))
      throw TypeError("directives must contain only Directive objects.");
    for (const directive of directives) {
      if (directive !== null && !this.#directives.includes(directive))
        this.#directives.push(directive);
    }
    return this;
  }


  /**
   * Adds new nodes to the graph.
   * @param  {...ChartNode} nodes - Nodes to be added to the graph.
   * @returns {FlowChart} The current FlowChart instance.
   * @throws {TypeError} If nodes includes a non-ChartNode param.
   */
  addNode(...nodes) {
    if (nodes.some(n => !(n instanceof ChartNode)))
      throw TypeError("nodes must contain only ChartNode objects.");
    for (const node of nodes) {
      if (node !== null && !this.#nodes.includes(node)) this.#nodes.push(node);
    }
    return this;
  }


  /**
   * Sets the class definition to be applied to the graph when used as a
   * subgraph.
   * @param {ClassDef} classDef - The class definition to set as the graph's
   * subgraph style. (If ommitted, removes the graph's subgraph style.)
   * @returns {FlowChart} The current FlowChart instance.
   * @throws {TypeError} If classDef is not a ClassDef object.
   */
  addStyle(classDef = null) {
    if (!(classDef instanceof ClassDef))
      throw TypeError("Requires a ClassDef object.");
    this.#style = classDef;
    return this;
  }


  /**
   * Adds other flowcharts to the graph as subgraphs.
   * @param  {...FlowChart} charts - Flowchart graphs to be added as subgraphs.
   * @returns {FlowChart}
   */
  addSubgraph(...charts) {
    for (const chart of charts) {
      if (chart !== null && !this.#subgraphs.includes(chart))
        this.#subgraphs.push(chart);
      for (const node of chart.nodes) {
        if (node !== null && !this.#nodes.includes(node)) this.#nodes.push(node);
      }
    }
    return this;
  }


  /**
   * Creates a new connection and adds it to the graph.
   * @param {string | {node: ChartNode, arrow: boolean?, arrowStyle: string?}} node1 - String id for a new ChartNode, or object.
   * @param {string | {node: ChartNode, arrow:boolean?, arrowStyle: string?}} node2 - As node1.
   * @param {number} [depth=0] - Depth of the connection (distance on the
   *   graph).
   * @returns {FlowChart}
   */
  connect(node1, node2, depth) {
    if (typeof node1 === "string")
      node1 = {
        node: new ChartNode(slugify(node1)).text(node1),
        arrow: false,
        arrowStyle: "default",
      };
    if (typeof node2 === "string")
      node2 = {
        node: new ChartNode(slugify(node2)).text(node2),
        arrow: false,
        arrowStyle: "default",
      };
    this.addConnection(
      new Connection(depth)
        .from(node1.node, node1.arrow, node1.arrowStyle)
        .to(node2.node, node2.arrow, node2.arrowStyle)
    );
    return this;
  }


  /**
   * Sets the graph's default class definition.
   * @param {ClassDef} [classDef] - The class definition to be the graph's
   *   default. (If ommitted, removes the graph's default class definition.)
   * @returns {FlowChart}
   */
  defaultClass(classDef = null) {
    if (classDef === null | !(classDef instanceof ClassDef))
      this.#default_class = null;
    else this.#default_class = ClassDef.from(classDef, "default");
    return this;
  }


  /**
   * Sets the graph's default link definition.
   * @param {LinkDef} [linkDef] - The link definition to be the graph's default. (If ommitted, removes the graph's default link definition.)
   * @returns {FlowChart}
   */
  defaultLink(linkDef = null) {
    this.#default_link = LinkDef.from(linkDef);
    return this;
  }


  /**
   * Sets the direction (or orientation) of the graph.
   * @param {('TB'|'TD'|'LR'|'RL'|'BT')} direction - The direction of the
   * graph. Valid options are `"TB"` (or `"TD"`, top to bottom), `"LR"` (left
   * to right), `"RL"` (right to left), or `"BT"` (bottom to top). 
   * @returns {FlowChart}
   */
  direction(direction = "TB") {
    this.#chart_direction = direction;
    return this;
  }


  /**
   * Sets the chart's name, only used when a subgraph of another graph.
   * @param {string} name - The string to set as the chart's name.
   * @returns {FlowChart}
   */
  named(name = "") {
    this.#name = name;
    return this;
  }


  /**
   * Returns a node in the graph with the given id, or undefined if no node is
   * found.
   * @param {string} id - A unique id to search by.
   * @returns {ChartNode | undefined}
   */
  findNode(id) {
    return this.nodes.find((n) => n.id === id);
  }


  /**
   * Returns the Mermaid-syntax string representing the complete graph.
   * @returns {string}
   */
  render() {
    let md =
      (this.directives.length
        ? this.directives.map(d => d.render()).join("\n")
        : "") +
      "flowchart " +
      this.#chart_direction +
      "\n" +
      this.connections.map((c) => c.render()).join("\n") +
      "\n" +
      this.nodes
        .reduce((collection, current) => {
          if (!current.hasBeenRendered) collection.push(current.render());
          return collection;
        }, [])
        .join("\n");

    md += this.subgraphs.map((g) => g.subRender()).join("\n");

    this.nodes.forEach((n) =>
      n.reset()
    );

    if (this.#default_class !== null) md += this.#default_class.render();

    this.classes.forEach((c) => {
      md += c.render();
      md +=
        "class " +
        this.nodes
          .reduce((collection, current) => {
            if (current.nodeClass === c) collection.push(current.id);
            return collection;
          }, [])
          .join(",") +
        " " +
        c.name +
        "\n";
    });

    if (this.#default_link !== null) md += this.#default_link.render();

    md += this.connections?.reduce((collection, current) => {
      if (current.linkClass !== null)
        collection += current.linkClass?.render();
      return collection
    }, "");

    return md;
  }


  /**
   * Returns the Mermaid-syntax string of the graph as a sugraph.
   * @returns {string}
   */
  subRender() {
    let md =
      "\nsubgraph " +
      (this.#name ?? subgraphGen.next().value) +
      "\n" +
      this.connections.map((c) => "  " + c.render()).join("\n") +
      "\n" +
      this.nodes
        .filter((n) => !n.hasBeenRendered)
        .map((n) => n.render())
        .join("\n") +
      "end\n";

    if (this.#style !== null) {
      let styles = [];
      for (const [key, value] of Object.entries(this.#style.style)) {
        if (value !== null)
          styles.push(
            `${key === "strokeWidth"
              ? "stroke-width"
              : key === "strokeDash"
                ? "stroke-dasharray"
                : key
            }:${value}`
          );
      }
      md += `style ${this.#name} ${styles.join(",")}`;
    }

    this.nodes.forEach((n) => {
      n.reset();
    });

    return md;
  }
}