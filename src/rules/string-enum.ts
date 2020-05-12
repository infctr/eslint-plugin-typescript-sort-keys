import { JSONSchema4 } from 'json-schema';
import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/experimental-utils';

import { getObjectBody } from 'utils/ast';
import { createReporter } from 'utils/plugin';
import { createRule, RuleMetaData } from 'utils/rule';
import {
  sortingOrderOptionSchema,
  sortingParamsOptionSchema,
  SortingOrder,
  ErrorMessage,
  RuleOptions,
} from 'common/options';

/**
 * The name of this rule.
 */
export const name = 'string-enum' as const;

/**
 * The options this rule can take.
 */
export type Options = RuleOptions;

/**
 * The schema for the rule options.
 */
const schema: JSONSchema4 = [sortingOrderOptionSchema, sortingParamsOptionSchema];

/**
 * The default options for the rule.
 */
const defaultOptions: Options = [
  SortingOrder.Ascending,
  { caseSensitive: true, natural: false },
];

/**
 * The possible error messages.
 */
const errorMessages = {
  invalidOrder: ErrorMessage.StringEnumInvalidOrder,
} as const;

/**
 * The meta data for this rule.
 */
const meta: RuleMetaData<keyof typeof errorMessages> = {
  type: 'suggestion',
  docs: {
    description: 'require string enum members to be sorted',
    category: 'Stylistic Issues',
    recommended: 'warn',
  },
  messages: errorMessages,
  fixable: 'code',
  schema,
};

/**
 * Create the rule.
 */
export const rule = createRule<keyof typeof errorMessages, Options>({
  name,
  meta,
  defaultOptions,

  create(context) {
    const compareNodeListAndReport = createReporter(context, ({ loc }) => ({
      loc,
      messageId: 'invalidOrder',
    }));

    return {
      TSEnumDeclaration(node) {
        const body = getObjectBody(node) as TSESTree.TSEnumMember[];
        const isStringEnum = body.every(
          (member: TSESTree.TSEnumMember) =>
            member.initializer &&
            member.initializer.type === AST_NODE_TYPES.Literal &&
            typeof member.initializer.value === 'string',
        );

        if (isStringEnum) {
          compareNodeListAndReport(body);
        }
      },
    };
  },
});
