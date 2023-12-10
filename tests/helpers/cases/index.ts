import { Rule, RuleTester } from 'eslint'

import { Linter } from '@typescript-eslint/utils/ts-eslint'

import { CaseCategory } from '../strings'
import { PreInvalidTestCaseObject, PreValidTestCaseObject } from './'
import { processInvalidTestCase, processValidTestCase } from './process'

export * from './types'
export { processInvalidTestCase, processValidTestCase } from './process'

/**
 * Helper for splitting up test cases by options and displaying info about which
 * set of options the test is running with. Sacrifices some parallelizatiom for debuggability.
 */
export function runCases(
  {
    name,
    rule,
    typescriptConfig,
  }: { name: string; rule: Rule.RuleModule; typescriptConfig: Linter.ConfigType },
  valid: PreValidTestCaseObject,
  invalid: PreInvalidTestCaseObject,
  runOptions: { withRequiredFirstOption: boolean; category: CaseCategory },
) {
  const usedOptionsKeys = new Set(Object.keys(invalid).concat(Object.keys(valid)))

  for (const optionsSetKey of usedOptionsKeys) {
    describe(optionsSetKey, () => {
      const ruleTester = new RuleTester(typescriptConfig)

      ruleTester.run(name, rule as unknown as Rule.RuleModule, {
        valid: processValidTestCase(
          { [optionsSetKey]: valid[optionsSetKey] },
          runOptions.withRequiredFirstOption,
        ),

        invalid: processInvalidTestCase(
          { [optionsSetKey]: invalid[optionsSetKey] },
          runOptions.category,
          runOptions.withRequiredFirstOption,
        ),
      })
    })
  }
}
