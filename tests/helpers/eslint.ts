import { ESLint } from '@typescript-eslint/utils/ts-eslint'

import plugin from '../../src'
import recommended from '../../src/config/recommended.config'
import requiredFirst from '../../src/config/requiredFirst.config'
import { typescriptConfig } from './configs'

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
