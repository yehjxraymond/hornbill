module.exports = {
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  globalSetup: "./jest.setup.js",
  globalTeardown: "./jest.teardown.js",
  collectCoverage: true,
  coverageDirectory: "<rootDir>/.coverage/",
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}"
  ]
};
