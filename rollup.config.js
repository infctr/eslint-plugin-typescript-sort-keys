import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import tsconfig from 'tsconfig'
import fs from 'fs'
import assert from 'assert'

const filePath = tsconfig.resolveSync('.')

assert(filePath)

const config = tsconfig.readFileSync(filePath)
const baseUrl = config.compilerOptions.baseUrl

const moduleMappings = fs
  .readdirSync(baseUrl, { withFileTypes: true })
  .filter(dir => dir.isDirectory())
  .map(dir => [dir.name, '/'].join(''))

const external = id =>
  !id.startsWith('.') &&
  !id.startsWith('/') &&
  !id.startsWith('\0') &&
  !moduleMappings.some(mapping => id.startsWith(mapping))

export default [
  {
    input: './src/index.ts',
    external,
    output: [
      { dir: 'lib', entryFileNames: '[name].cjs.js', format: 'cjs' },
      { dir: 'lib', entryFileNames: '[name].esm.js', format: 'es' },
    ],
    plugins: [commonjs(), resolve(), typescript(), json()],
  },
]
