import path from 'path'

import { Linter } from '@typescript-eslint/utils/ts-eslint'

import { name as enumRuleNameDeprecated } from '../../src/rules/string-enum'

const configPath = path.resolve(__dirname, '../config')
export const filename = path.join(configPath, 'file.ts')

export const typescriptConfig: Linter.ConfigType = {
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    sourceType: 'module',
    project: path.join(configPath, 'tsconfig.json'),
  },
}

export function isNotDeprecated(name) {
  switch (name) {
    case enumRuleNameDeprecated:
      return false
    default:
      return true
  }
}
