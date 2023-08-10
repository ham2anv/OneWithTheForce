import { ChartNode, ClassDef, Connection, Directive, FlowChart, LinkDef } from "./mermaid";

/**
 * @param {Object<string,any>} machine 
 * @param {Object<string,{class: ClassDef, shape: string}>} options 
 * @returns {string}
 */
export default function (machine, options) {
  const title = "---\ntitle: " + machine.id + "\n---\n";
  const chart = new FlowChart(machine.id);
  const linkClass = new LinkDef().stroke("white");
  if (!machine.tags?.length) machine.tags = /** @type {string[]} */[machine.tags];
  const directive = new Directive();
  machine.tags.forEach(value => {
    const tag = value.split(":");
    switch (tag[0]) {
      case "curve":
        directive.flowchart({ curve: tag[1] });
        break;
      case "var":
        directive.variables(Object.fromEntries(tag.slice(1)?.map(t => (t.split("=")))));
        break;
      default:
        break;
    }
  })
  chart.defaultLink(linkClass).addDirective(directive);
  /** @type {Map<string,ChartNode>} */
  const nodes = new Map();
  Object.entries(machine.states).forEach(([key, value]) => {
    const node = new ChartNode(key.replace(/\s/g, "_")).text(value.description ?? key)
    if ((value.type || value.tags) && (options[value.tags] || options[value.type])) {
      chart.addClass(options[value.type ?? value.tags].class);
      node.class(options[value.type ?? value.tags].class).shape(options[value.type ?? value.tags].shape);
    }
    nodes.set(key, node);
    chart.addNode(node);
  });
  Object.entries(machine.states).forEach(([key, value]) => {
    if (!value.on) return;
    Object.entries(value.on)?.forEach(([event, link]) => {
      const connection = new Connection()
        .from(nodes.get(key))
        .to(nodes.get(link.target), true);
      if (machine.tags.some((/** @type {string} */ tag) => tag.includes("link"))) connection.style(machine.tags.find(tag => tag.includes("link")).split(":")[1])
      if (link.description) connection.text(link.description);
      chart.addConnection(connection)
    })
  })

  return title + chart.render();
}