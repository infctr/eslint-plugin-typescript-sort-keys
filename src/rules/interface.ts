import { TSESTree } from '@typescript-eslint/utils'
import { JSONSchema4 } from '@typescript-eslint/utils/json-schema'

import { createReporter } from '../plugin'
import {
  ErrorMessage,
  RuleOptionsGeneric,
  SortingOrder,
  sortingOrderOptionSchema,
  SortingParamsOptions,
} from '../types'
import { getObjectBody } from '../utils/ast'
import { createRule, RuleMetaData } from '../utils/rule'

/**
 * The name of this rule.
 */
export const name = 'interface' as const

/**
 * The options this rule can take.
 */
export type RuleOptions = RuleOptionsGeneric<SortingParamsOptions>

const sortingParamsOptionSchema: JSONSchema4 = {
  type: 'object',
  properties: {
    caseSensitive: {
      type: 'boolean',
    },
    natural: {
      type: 'boolean',
    },
    requiredFirst: {
      type: 'boolean',
    },
  },
  additionalProperties: false,
}

/**
 * The schema for the rule options.
 */
const schema: readonly JSONSchema4[] = [
  sortingOrderOptionSchema,
  sortingParamsOptionSchema,
]

/**
 * The default options for the rule.
 */
const defaultOptions: RuleOptions = [
  SortingOrder.Ascending,
  { caseSensitive: true, natural: false, requiredFirst: false },
]

/**
 * The possible error messages.
 */
const errorMessages = {
  invalidOrderBody: ErrorMessage.InterfaceInvalidOrder,
  invalidOrderParent: ErrorMessage.InterfaceParentInvalidOrder,
} as const
type errorMessageKeys = keyof typeof errorMessages

/**
 * The meta data for this rule.
 */
const meta: RuleMetaData<errorMessageKeys> = {
  type: 'layout',
  docs: {
    description: 'require interface keys to be sorted',
    recommended: 'stylistic',
  },
  messages: errorMessages,
  fixable: 'code',
  schema,
}

/**
 * Create the rule.
 */
export const rule = createRule<errorMessageKeys, RuleOptions>({
  name,
  meta,
  defaultOptions,

  create(context) {
    const compareNodeListAndReport = createReporter({
      context,
      createReportPropertiesObject: ({ loc }: TSESTree.Node) => ({
        loc,
        messageId: 'invalidOrderBody' as any,
      }),
      createReportParentObject: ({ loc }: TSESTree.Node) => ({
        loc,
        messageId: 'invalidOrderParent' as any,
      }),
    })

    return {
      TSInterfaceDeclaration(node: TSESTree.TSInterfaceDeclaration) {
        const body = getObjectBody(node)
        return compareNodeListAndReport(node, body)
      },

      TSTypeLiteral(node: TSESTree.TSTypeLiteral) {
        const body = getObjectBody(node)
        return compareNodeListAndReport(node, body)
      },
    }
  },
})
