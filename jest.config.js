const shouldUseCompiled = process.env.USE_COMPILED;

module.exports = {
  testRegex: 'tests/.*\\.spec\\.(js|ts)$',
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: [!shouldUseCompiled && 'tests/autofix.spec.ts'].filter(Boolean),
};
