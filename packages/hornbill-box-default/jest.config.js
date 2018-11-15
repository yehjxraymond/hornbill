module.exports = {
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  testEnvironment: "./jest.hornbill-environment.js",
  collectCoverage: true,
  coverageDirectory: "<rootDir>/.coverage/",
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}"
  ]
};
