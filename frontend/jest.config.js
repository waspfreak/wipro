const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports = Object.assign(jestPreset, {
  preset: '@testing-library/react-native',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|react-navigation|react-native-reanimated|react-navigation-redux-helpers|react-native-maps|@react-navigation/.*)/'
  ],
  collectCoverage: true,
  coverageReporters: ['json', 'html'],

  setupFiles: [...jestPreset.setupFiles, './setupTests.js'],

  setupFilesAfterEnv: ['./setupTests.js'],
  collectCoverageFrom: [
    'App/src/**/*.{js,jsx}',
    '!App/src/aws-exports.js',
    '!**/navigation/**',
    '!App/src/init.js',
    '!App/src/graphql/**',
    '!App/src/configs/**',
    '!**/*.spec.*',
    '!/node_modules/',
    '!/test/e2e/'
  ],
  testPathIgnorePatterns: ['test/e2e', 'node_modules']
});
