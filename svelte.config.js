import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from '@sveltejs/adapter-auto';
import remarkGfm from "remark-gfm";

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

    "remarkPlugins": [remarkGfm],
    "rehypePlugins": [],
    "layout": { "page": "./src/layouts/page.svelte", "index": "./src/layouts/index.svelte" }
  })]
};

export default config;
