# eslint-plugin-typescript-sort-keys

Sort interface and string enum keys

Inspired by and forked from [eslint/sort-keys](https://github.com/eslint/eslint/blob/master/docs/rules/sort-keys.md)

## Installation

You'll first need to install [ESLint](http://eslint.org), [typescript](http://www.typescriptlang.org/) and [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)

```sh
yarn add -D eslint typescript @typescript-eslint/parser
```

Next, install `eslint-plugin-typescript-sort-keys`:

```sh
yarn add -D eslint-plugin-typescript-sort-keys
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-typescript-sort-keys` globally.

## Usage

Add `typescript-sort-keys` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["typescript-sort-keys"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "typescript-sort-keys/interface": 2
  }
}
```

## Supported Rules

<!-- begin rule list -->

**Key**: :heavy_check_mark: = recommended, :wrench: = fixable

<!-- prettier-ignore -->
| Name | Description | :heavy_check_mark: | :wrench: |
| ---- | ----------- | ------------------ | -------- |
| [`typescript-sort-keys/interface`](./docs/rules/interface.md) | require interface keys to be sorted |  |  |

<!-- end rule list -->
