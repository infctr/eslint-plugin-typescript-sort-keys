/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfig = require('tsconfig');
const fs = require('fs');
const assert = require('assert');

const isTest = process.env.NODE_ENV === 'test';
const filePath = tsconfig.resolveSync('.');

assert(filePath);

// @ts-ignore
const config = tsconfig.readFileSync(filePath);
const baseUrl = config.compilerOptions.baseUrl;

const moduleMappings = fs
  .readdirSync(baseUrl, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
  .reduce((memo, dir) => ({ ...memo, [dir]: ['./src/', dir].join('') }), {});

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    !isTest && [
      'module-resolver',
      {
        root: ['./src'],
        alias: moduleMappings,
      },
    ],
  ].filter(Boolean),
};
