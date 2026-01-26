/** TODO: Replace this file with non-legacy config pattern, ref https://tailwindcss.com/docs/upgrade-guide */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#06070a",
        backgroundSecondary: "#0E0F16",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.white"),
            a: {
              color: theme("colors.sky.400"),
              "&:hover": {
                color: theme("colors.sky.600"),
              },
            },
            "h1, h2, h3, h4": {
              color: theme("colors.sky.400"),
            },
            code: {
              color: theme("colors.white"),
            },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
