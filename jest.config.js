module.exports = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*'],
  coverageReporters: [['text', { skipFull: false, skipEmpty: true }], 'lcov'],
  coverageThreshold: {
    global: {
      branches: 94,
      functions: 100,
      lines: 100,
      statements: 98,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  randomize: true, // Just to be sure memoization isn't broken
  testRegex: 'tests/.*\\.spec\\.(js|ts)$',
}
