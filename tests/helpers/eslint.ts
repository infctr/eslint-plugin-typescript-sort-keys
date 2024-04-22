import { Linter } from 'eslint'

import { ESLint } from '@typescript-eslint/utils/ts-eslint'

import plugin from '../../src'
import recommended from '../../src/config/recommended.config'
import requiredFirst from '../../src/config/requiredFirst.config'
import { typescriptConfig } from './configs'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const parser = require('@typescript-eslint/parser')

export enum Config {
  Recommended,
  RequiredFirst,
}

/**
 * @param config Enum deciding which config from src/config to use
 * @param fix Boolean telling ESLint to emit fixes or not
 * @returns ESLint instance configured with the local plugin
 */
export function getESLint(config: Config, fix = true) {
  const eslint = new ESLint({
    overrideConfig: {
      ...(config === Config.Recommended ? recommended : requiredFirst),
      ...typescriptConfig,
      parserOptions: { sourceType: 'module' }, // Exclude project property for generated input files
    },
    plugins: {
      'typescript-sort-keys': plugin,
    },
    useEslintrc: false,
    fix,
  })
  return eslint
}

// For unit testing
export function getSourceCode(code: string) {
  const linter = new Linter()
  linter.defineParser('@typescript-eslint/parser', parser)

  const config = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {},
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  } as Linter.Config

  const messages = linter.verify(code, config)

  return messages[0]?.fatal ? null : linter.getSourceCode()
}
