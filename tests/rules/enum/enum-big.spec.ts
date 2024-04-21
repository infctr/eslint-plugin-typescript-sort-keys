import { Rule } from 'eslint'
import fs from 'fs'
import path from 'path'

import { name, rule } from '../../../src/rules/enum'
import { PreInvalidTestCaseObject, PreValidTestCaseObject, runCases } from '../../helpers/cases'
import { typescriptConfig } from '../../helpers/configs'
import { CaseCategory } from '../../helpers/strings'

const fixtures = path.resolve(__dirname, '../../fixtures')

const validBigTestCode = fs
  .readFileSync(path.resolve(fixtures, 'enum-big-valid.output.ts'))
  .toString('utf-8')
const invalidBigTestCode = fs
  .readFileSync(path.resolve(fixtures, 'enum-big-invalid.output.ts'))
  .toString('utf-8')

const valid: PreValidTestCaseObject = {
  ascendingWithDefaults: [validBigTestCode],
}

const invalid: PreInvalidTestCaseObject = {
  ascendingWithDefaults: [
    {
      code: invalidBigTestCode,
      output: validBigTestCode,
      errors: 167,
    },
  ],
}

runCases({ name, rule: rule as unknown as Rule.RuleModule, typescriptConfig }, valid, invalid, {
  category: CaseCategory.Enum,
  withRequiredFirstOption: false,
})
