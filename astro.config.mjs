// @ts-check
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [],
  output: "server",

  adapter: node({
    mode: "standalone",
  }),

  vite: {
    plugins: [tailwindcss()],
  },
  security: {
    allowedDomains: [
      {
        hostname: "tg.no",
        protocol: "https",
      },
      {
        hostname: "www.tg.no",
        protocol: "https",
      },
      {
        hostname: "dev.tg.no",
        protocol: "https",
      },
      {
        hostname: "**.preview.tg.no",
        protocol: "https",
      },
    ],
  },
});
