const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/integrations/**/*.spec.{js,jsx,ts,tsx}",
    fixturesFolder: "cypress/fixtures", // добавлено
  },
});
