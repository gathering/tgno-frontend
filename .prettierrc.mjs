/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  tabWidth: 2,
  useTabs: false,
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
