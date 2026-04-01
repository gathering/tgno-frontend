// @ts-check
import { defineConfig, envField } from "astro/config";

import node from "@astrojs/node";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [],
  output: "server",
  env: {
    schema: {
      API_URL: envField.string({
        context: "server",
        access: "secret",
      }),
      SITE_URL: envField.string({
        context: "server",
        access: "secret",
      }),
      MATOMO_SITE_ID: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      MATOMO_INSTANCE_URL: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      TZ: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },

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
