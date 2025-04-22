const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    retries: {
      runMode: 2, // Number of retries in `cypress run` (headless mode)
      openMode: 1, // Number of retries in `cypress open` (interactive mode)
    },
  },
});
