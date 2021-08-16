import path from 'path'
import fs from 'fs'
import tmp from 'tmp'
import { ESLint, Linter } from 'eslint'

import plugin from '../src'
import recommended from 'config/recommended'
import { SortingOrder } from 'common/options'
import { typescript } from './helpers/configs'

describe('autofix', () => {
  beforeEach(() => {
    tmp.setGracefulCleanup()
  })

  it.each([
    [recommended, 'autofix.output.ts'],
    [
      {
        plugins: recommended.plugins,
        rules: {
          ...recommended.rules,
          'typescript-sort-keys/interface': [
            'error' as const,
            SortingOrder.Ascending,
            { caseSensitive: true, natural: true, requiredFirst: true },
          ] as Linter.RuleEntry,
        },
      },
      'requiredFirst.output.ts',
    ],
  ])(
    'should autofix and properly format comments and indent level',
    async (config, fileName) => {
      const { name: tmpDir } = tmp.dirSync({
        prefix: 'typescript-sort-keys-',
        unsafeCleanup: true,
      })

      const testFilePath = path.join(tmpDir, 'autofix.ts')
      const input = fs.readFileSync('tests/fixtures/autofix.input.ts', 'utf8')
      const expected = fs.readFileSync(`tests/fixtures/${fileName}`, 'utf8')

      fs.writeFileSync(testFilePath, input)

      const eslint = new ESLint({
        overrideConfig: {
          ...config,
          parser: typescript.parser,
          parserOptions: { sourceType: 'module' },
        },
        plugins: {
          'typescript-sort-keys': plugin,
        },
        useEslintrc: false,
        fix: true,
      })

      const results = await eslint.lintFiles(testFilePath)
      const result = results[0]

      expect(result.messages).toHaveLength(0)
      expect(result.errorCount).toBe(0)
      expect(result.warningCount).toBe(0)
      expect(result.fixableErrorCount).toBe(0)
      expect(result.fixableWarningCount).toBe(0)

      await ESLint.outputFixes(results)

      const output = fs.readFileSync(testFilePath, 'utf8')

      expect(output).toStrictEqual(expected)
    },
  )
})
