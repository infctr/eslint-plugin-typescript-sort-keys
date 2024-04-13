import { ESLintUtils } from '@typescript-eslint/utils'
import {
  ReportDescriptor,
  RuleListener,
  RuleModule,
  RuleContext as UtilRuleContext,
  RuleMetaData as UtilRuleMetaData,
  RuleMetaDataDocs as UtilRuleMetaDataDocs,
} from '@typescript-eslint/utils/ts-eslint'

export type BaseOptions = readonly unknown[]

// "url" will be set automatically.
export type RuleMetaDataDocs = Omit<UtilRuleMetaDataDocs, 'url'>

// "docs.url" will be set automatically.
export type RuleMetaData<MessageIds extends string> = {
  readonly docs: RuleMetaDataDocs
} & Omit<UtilRuleMetaData<MessageIds>, 'docs'>

export type RuleResult<MessageIds extends string, Options extends BaseOptions> = {
  readonly context: UtilRuleContext<MessageIds, Options>
  readonly descriptors: readonly ReportDescriptor<MessageIds>[]
}

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

/**
 * Create a rule.
 */
export function createRule<MessageIds extends string, Options extends BaseOptions>(data: {
  readonly name: string
  readonly meta: RuleMetaData<MessageIds>
  readonly defaultOptions: Options
  readonly create: (
    context: UtilRuleContext<MessageIds, Options>,
    optionsWithDefault: Mutable<Options>,
  ) => RuleListener
}): RuleModule<MessageIds, Options, RuleListener> {
  return ESLintUtils.RuleCreator(getRuleDocsUrl)<Options, MessageIds>(data)
}

// Return a link to the docs based on the given name.
export const getRuleDocsUrl = (name: string) =>
  `https://github.com/infctr/eslint-plugin-typescript-sort-keys/blob/master/docs/rules/${name}.md`
