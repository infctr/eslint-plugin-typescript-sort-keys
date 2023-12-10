import { RuleTester as ESLintRuleTester } from 'eslint'
import { filename } from '../configs'
import { CaseCategory } from '../strings'
import { preProcessInvalidTestCases, preProcessValidTestCases } from './preprocess'
import {
  InvalidTestCase,
  PreInvalidTestCaseObject,
  PreValidTestCaseObject,
  ValidTestCase,
} from './types'

// Second processing step to put cases in the shape expected by eslint test runner
function processTestCases<T>(cases: (InvalidTestCase | ValidTestCase)[]) {
  return cases.flatMap(testCase =>
    testCase.optionsSet.map(options => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { optionsSet, ...eslintTestCase } = testCase
      return { filename, ...eslintTestCase, options }
    }),
  ) as T[]
}

/**
 * Convert our test cases into ones eslint test runner is expecting.
 */
export function processInvalidTestCase(
  testCases: PreInvalidTestCaseObject,
  category: CaseCategory,
  withRequiredFirstOption: boolean,
): ESLintRuleTester.InvalidTestCase[] {
  return processTestCases(
    preProcessInvalidTestCases(testCases, category, withRequiredFirstOption),
  )
}

/**
 * Convert our test cases into ones eslint test runner is expecting.
 */
export function processValidTestCase(
  testCases: PreValidTestCaseObject,
  withRequiredFirstOption: boolean,
): ESLintRuleTester.ValidTestCase[] {
  return processTestCases(preProcessValidTestCases(testCases, withRequiredFirstOption))
}
