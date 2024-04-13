import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils'
import { JSONSchema4 } from '@typescript-eslint/utils/json-schema'

import { createReporter } from '../plugin'
import {
  ErrorMessage,
  RuleOptionsGeneric,
  SortingOrder,
  sortingOrderOptionSchema,
  SortingParams,
} from '../types'
import { getObjectBody } from '../utils/ast'
import { createRule, RuleMetaData } from '../utils/rule'

/**
 * @deprecated
 * The name of this rule.
 */
export const name = 'string-enum' as const

/**
 * @deprecated
 * The options this rule can take.
 */
export type RuleOptions = RuleOptionsGeneric<Omit<SortingParams, 'requiredFirst'>>

const sortingParamsOptionSchema: JSONSchema4 = {
  type: 'object',
  properties: {
    caseSensitive: {
      type: 'boolean',
    },
    natural: {
      type: 'boolean',
    },
  },
  additionalProperties: false,
}

/**
 * @deprecated
 * The schema for the rule options.
 */
const schema: JSONSchema4[] = [sortingOrderOptionSchema, sortingParamsOptionSchema]

/**
 * The default options for the rule.
 */
const defaultOptions: RuleOptions = [
  SortingOrder.Ascending,
  { caseSensitive: true, natural: false },
]

/**
 * @deprecated
 * The possible error messages.
 */
const errorMessages = {
  invalidOrderBody: ErrorMessage.EnumInvalidOrder,
  invalidOrderParent: ErrorMessage.EnumParentInvalidOrder,
} as const
type errorMessageKeys = keyof typeof errorMessages

/**
 * @deprecated
 * The meta data for this rule.
 */
const meta: RuleMetaData<errorMessageKeys> = {
  type: 'suggestion',
  docs: {
    description: 'require string enum members to be sorted',
    recommended: 'stylistic',
  },
  messages: errorMessages,
  fixable: 'code',
  schema,
}

/**
 * @deprecated
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
      TSEnumDeclaration(node: TSESTree.TSEnumDeclaration) {
        const body = getObjectBody(node) as TSESTree.TSEnumMember[]
        const isStringEnum = body.every(
          (member: TSESTree.TSEnumMember) =>
            member.initializer?.type === AST_NODE_TYPES.Literal &&
            typeof member.initializer?.value === 'string',
        )

        if (isStringEnum) {
          compareNodeListAndReport(node, body)
        }
      },
    }
  },
})
