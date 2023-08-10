export class MermaidChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }
      
  async connectedCallback() {
    const chart = (
      await import(this.getAttribute("src"))
        .then(result => result)
        .catch(error => {console.error(error)})
    ).chart;
    this.shadowRoot.innerHTML = `Creating chart...`;
    const mermaid = (
      await import(
        'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs'
      )
        .then(result => result)
        .catch(() => {
          this.shadowRoot.innerHTML = `<pre>${chart.render()}</pre>`;
          return;
        })
    ).default;

    const tempDiv = createElement("div");
    document.body.append(tempDiv);

    mermaid.initialize({
      startOnLoad: false, 
    });

    this.shadowRoot.innerHTML = await mermaid.render('chart', chart.render(), tempDiv)
      .then(result => result.svg)
      .catch(error => console.error(error));

    tempDiv.remove();
  }
}


function createElement(element, styles=null, props=null) {
  if (arguments.length == 2 && typeof styles == "object") props = styles;
  const newElement = document.createElement(element);
  if (styles && props != styles) 
    newElement.classList.add(...styles.split(' '));
  if (props) {
    for (let [key,value] of Object.entries(props)) {
      newElement.setAttribute(key,value);
    }
  }
  return newElement;
}