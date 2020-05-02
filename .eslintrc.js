module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin', 'import', 'jest', 'prettier'],
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-plugin/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 10,
    project: ['./tsconfig.json', './tests/tsconfig.json'],
    sourceType: 'module',
  },
  rules: {
    // Built in.
    'no-console': 'warn',
    // 'no-param-reassign': 'error',
    // 'no-var': 'error',
    // Typescript eslint.
    // '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    // '@typescript-eslint/prefer-interface': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    // '@typescript-eslint/no-require-imports': 'error',
    // '@typescript-eslint/no-unused-vars': [
    //   'error',
    //   {
    //     args: 'after-used',
    //     argsIgnorePattern: '^_',
    //     caughtErrors: 'none',
    //     ignoreRestSiblings: true,
    //     vars: 'all',
    //   },
    // ],
    // '@typescript-eslint/no-use-before-define': [
    //   'error',
    //   {
    //     functions: true,
    //     classes: true,
    //     variables: true,
    //     typedefs: true,
    //   },
    // ],
  },
  overrides: [
    {
      files: ['tests/**'],
      env: {
        jest: true,
      },
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-alias-methods': 'error',
        'jest/no-identical-title': 'error',
        'jest/no-jasmine-globals': 'error',
        'jest/no-jest-import': 'error',
        'jest/no-test-prefixes': 'error',
        'jest/no-test-callback': 'error',
        'jest/no-test-return-statement': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/prefer-spy-on': 'error',
        'jest/valid-expect': 'error',
      },
    },
  ],
  settings: {
    'import/ignore': ['escape-string-regexp'],
  },
};
