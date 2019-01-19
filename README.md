# eslint-plugin-typescript-sort-keys

Sort interface keys

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-typescript-sort-keys`:

```
$ npm install eslint-plugin-typescript-sort-keys --save-dev
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
    "typescript-sort-keys/rule-name": 2
  }
}
```

## Supported Rules

- Fill in provided rules here
