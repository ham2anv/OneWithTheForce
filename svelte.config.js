import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from '@sveltejs/adapter-auto';
import remarkGfm from "remark-gfm";

function highlighter(code, lang) {
  console.log(code);
  return `<pre data-theme="night"><code class="${lang}">${code}</code></pre>`;
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  "extensions": [".svelte", ...mdsvexConfig.extensions],

  kit: {
    adapter: adapter()
  },

  preprocess: [vitePreprocess({}), mdsvex({
    "extensions": [".svelte.md", ".md", ".svx"],

    "smartypants": {
      "dashes": "oldschool"
    },

    highlight: { highlighter },

    "remarkPlugins": [remarkGfm],
    "rehypePlugins": [],
    "layout": { "page": "./src/layouts/page.svelte", "index": "./src/layouts/index.svelte" }
  })]
};

export default config;
