module.exports = {
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
    'prettier/standard',
    'plugin:prettier/recommended',
    'plugin:node/recommended',
  ],
  rules: {
    'object-shorthand': 0,
  },
  overrides: [
    {
      files: ['tests/**'],
      env: {
        jest: true,
      },
    },
  ],
};
