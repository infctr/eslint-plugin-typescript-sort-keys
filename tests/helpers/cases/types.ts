import { RuleTester as ESLintRuleTester } from 'eslint'

import { OptionsSet, OptionsSetsKey } from '../options'

/* Types for processing test cases */
export type ValidTestCase = Omit<ESLintRuleTester.ValidTestCase, 'options'> & OptionsSet
export type InvalidTestCase = Omit<ESLintRuleTester.InvalidTestCase, 'options'> &
  OptionsSet

/* Types for preprocessing test cases */
export type PreInvalidTestCaseList = (Omit<InvalidTestCase, 'optionsSet' | 'errors'> & {
  /** About errors prop
   * A number or an array of 1-2 strings or a number
   * - Number indicates overall how many errors in the entire body
   * - Array of items:
   *   - 1 string array: corresponds to "at the end" error msg
   *   - 2 strings array: corresponds to "x should be before y" error msg
   *   - number entry:
   */
  errors: Array<[string] | [string, string] | number> | number
  omitInferredErrorCount?: boolean
})[]
export type PreInvalidTestCaseObject = Partial<
  Record<OptionsSetsKey, PreInvalidTestCaseList>
>
export type PreValidTestCaseObject = Partial<Record<OptionsSetsKey, string[]>>
