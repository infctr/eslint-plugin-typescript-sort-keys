import { ESLint } from '@typescript-eslint/utils/ts-eslint'
import fs from 'fs'
import path from 'path'
import tmp from 'tmp'
import { Config, getESLint } from './helpers/eslint'

describe('autofix', () => {
  beforeEach(() => {
    tmp.setGracefulCleanup()
  })

  const cases: Array<[Config, string]> = [
    [Config.Recommended, 'recommended.output.ts'],
    [Config.RequiredFirst, 'requiredFirst.output.ts'],
  ]

  it.each(cases)(
    `should autofix (config=%s, output=%s)`,
    async (configName, outputFileName) => {
      const { name: tmpDir } = tmp.dirSync({
        prefix: 'typescript-sort-keys-',
        unsafeCleanup: true,
      })

      const testFilePath = path.join(tmpDir, `autofix-${configName}.ts`)
      const input = fs.readFileSync('tests/fixtures/autofix.input.ts', 'utf8')
      const expectedOutput = fs.readFileSync(`tests/fixtures/${outputFileName}`, 'utf8')

      fs.writeFileSync(testFilePath, input)

      const eslint = getESLint(configName)
      const results = await eslint.lintFiles(testFilePath)
      const result = results[0]

      // For debugging when output is malformed
      // eslint-disable-next-line no-console
      if (process.env.DEBUG === 'true') console.log(result.output)

      // Validate no issues linting
      expect(result.messages).toHaveLength(0)
      expect(result.errorCount).toBe(0)
      expect(result.warningCount).toBe(0)
      expect(result.fixableErrorCount).toBe(0)
      expect(result.fixableWarningCount).toBe(0)

      await ESLint.outputFixes(results)

      const output = fs.readFileSync(testFilePath, 'utf8')
      // Validate correctness
      expect(output).toStrictEqual(expectedOutput)
    },
  )
})
