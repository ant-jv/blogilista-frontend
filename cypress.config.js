const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'eh3r9t',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
