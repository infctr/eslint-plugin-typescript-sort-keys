import { Linter } from 'eslint'
import * as path from 'path'

export const filename = path.join(__dirname, 'file.ts')

export const typescript: Linter.Config = {
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    sourceType: 'module',
    project: path.join(__dirname, './tsconfig.json'),
  },
}
