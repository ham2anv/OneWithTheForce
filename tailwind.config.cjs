const daisyui = require("daisyui");
const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,svelte.md,ts}"],

  theme: {
    extend: {
      fontFamily: {
        oswald: "Oswald, sans-serif",
        source: "Source Serif, serif",
        dice: "Gems Precise"
      },
      maxWidth: {
        body: "min(100% - 3rem, 65ch)"
      }
    }
  },

  plugins: [forms, typography, daisyui],

  daisyui: {
    themes: ['night',
      {
        mytheme: {
          "primary": "#0ea5e9",
          "secondary": "#4ade80",
          "accent": "#fde047",
          "neutral": "#e11d48",
          "base-100": "#111827",
          "info": "#7dd3fc",
          "success": "#6ee7b7",
          "warning": "#fdba74",
          "error": "#fda4af",
        },
      },
    ],
  },
};

module.exports = config;