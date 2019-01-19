module.exports = {
  parserOptions: {
    sourceType: 'script',
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
};
