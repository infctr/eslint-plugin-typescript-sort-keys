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
    'plugin:eslint-plugin/all',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:import/typescript', 'plugin:@typescript-eslint/recommended'],

      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },

      parserOptions: {
        project: ['./tsconfig.json', './tests/tsconfig.json'],
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
            'jest/no-test-prefixes': 'error',
            'jest/no-test-return-statement': 'error',
            'jest/prefer-to-have-length': 'warn',
            'jest/prefer-spy-on': 'error',
            'jest/valid-expect': 'error',
            'jest/no-test-callback': 'off',
          },
        },
      ],
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
}
