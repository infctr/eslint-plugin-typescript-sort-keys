import { OptionsSet, OptionsSetsKey } from '../options'
import { RuleTester as ESLintRuleTester } from 'eslint'

/* Types for processing test cases */
export type ValidTestCase = Omit<ESLintRuleTester.ValidTestCase, 'options'> & OptionsSet
export type InvalidTestCase = Omit<ESLintRuleTester.InvalidTestCase, 'options'> &
  OptionsSet

/* Types for preprocessing test cases */
export type PreInvalidTestCaseList = (Omit<InvalidTestCase, 'optionsSet' | 'errors'> & {
  errors: Array<string[] | number> | number
  omitInferredErrorCount?: boolean
})[]
export type PreInvalidTestCaseObject = Partial<
  Record<OptionsSetsKey, PreInvalidTestCaseList>
>
export type PreValidTestCaseObject = Partial<Record<OptionsSetsKey, string[]>>
