module.exports = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*'],
  coverageReporters: [['text', { skipFull: false, skipEmpty: true }], 'lcov'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  randomize: true, // Just to be sure memoization isn't broken
  testRegex: 'tests/.*\\.spec\\.(js|ts)$',
}
