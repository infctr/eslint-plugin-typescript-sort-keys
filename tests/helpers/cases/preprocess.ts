import { AllRuleOptions } from '../../../src/types'
import {
  OptionsSetsKey,
  optionsSetsNoRequired,
  optionsSetsWithRequiredFirst,
} from '../options'
import {
  CaseCategory,
  getCountErrorString,
  getEndErrorString,
  getSwapErrorString,
} from '../strings'
import {
  InvalidTestCase,
  PreInvalidTestCaseList,
  PreInvalidTestCaseObject,
  PreValidTestCaseObject,
  ValidTestCase,
} from './types'

/**
 * Get error messages based on args provided in test cases
 *
 * Array length 1 maps to the "x should be end" message
 * Array length 2 maps to the "x should be before y" message
 */
function processErrorArgs(
  category: CaseCategory,
  optionsSetsKey: OptionsSetsKey,
  errorArgs: Array<string[] | number> | number,
  omitInferredErrorCount: boolean,
) {
  const errorMessages: string[] = []
  if (!Array.isArray(errorArgs)) {
    // Can return count of errors for test case instead of strings
    return errorArgs
  }

  if (!omitInferredErrorCount)
    errorMessages.push(getCountErrorString(category, optionsSetsKey, errorArgs.length))

  for (const args of errorArgs) {
    // At this point args is number or string[]
    if (Array.isArray(args)) {
      switch (args.length) {
        case 1:
          errorMessages.push(getEndErrorString(category, args[0]))
          break
        case 2:
          errorMessages.push(getSwapErrorString(category, args[0], args[1]))
          break
      }
    } else {
      errorMessages.push(getCountErrorString(category, optionsSetsKey, args))
    }
  }
  return errorMessages
}

// First processing step to put cases in the shape of InvalidTestCase
export function preProcessInvalidTestCases(
  testCases: PreInvalidTestCaseObject,
  category: CaseCategory,
  withRequiredFirstOption: boolean,
): InvalidTestCase[] {
  const processedCases = [] as InvalidTestCase[]

  for (const key in testCases) {
    const optionsSetsKey = key as OptionsSetsKey
    const cases = testCases[optionsSetsKey]
    if (cases && cases.length > 0) {
      processedCases.push(
        ...convertPreInvalidCasesToProcessed(
          cases,
          category,
          withRequiredFirstOption,
          optionsSetsKey,
        ),
      )
    }
  }
  return processedCases
}

// Take from shape PreInvalidTestCase[] to InvalidTestCase[]
function convertPreInvalidCasesToProcessed(
  cases: PreInvalidTestCaseList,
  category: CaseCategory,
  withRequiredFirstOption: boolean,
  optionsSetsKey: OptionsSetsKey,
) {
  return cases.map(({ code, output, errors: errorArgs, omitInferredErrorCount }) => {
    const errors = processErrorArgs(
      category,
      optionsSetsKey,
      errorArgs,
      !!omitInferredErrorCount,
    )
    const optionsSet = (
      withRequiredFirstOption ? optionsSetsWithRequiredFirst : optionsSetsNoRequired
    )[optionsSetsKey] as AllRuleOptions[]
    return {
      code,
      output,
      errors,
      optionsSet,
    } as InvalidTestCase
  })
}

// First processing step to put cases in the shape of ValidTestCase
export function preProcessValidTestCases(
  testCases: PreValidTestCaseObject,
  withRequiredFirstOption: boolean,
): ValidTestCase[] {
  const processedCases = [] as ValidTestCase[]
  for (const key in testCases) {
    const optionsSetsKey = key as OptionsSetsKey
    const cases = testCases[optionsSetsKey]
    if (cases && cases.length > 0) {
      processedCases.push(
        ...convertPreValidCasesToProcessed(
          cases,
          withRequiredFirstOption,
          optionsSetsKey,
        ),
      )
    }
  }
  return processedCases
}

// Take from shape PreValidTestCase[] to ValidTestCase[]
function convertPreValidCasesToProcessed(
  cases: string[],
  withRequiredFirstOption: boolean,
  optionsSetsKey: OptionsSetsKey,
) {
  return cases.map(code => {
    const optionsSet = (
      withRequiredFirstOption ? optionsSetsWithRequiredFirst : optionsSetsNoRequired
    )[optionsSetsKey] as AllRuleOptions[]
    return {
      code,
      optionsSet,
    }
  })
}
