import { TSESTree } from '@typescript-eslint/utils'
import {
  SourceCode as Lib_SourceCode,
  RuleContext as UtilRuleContext,
} from '@typescript-eslint/utils/ts-eslint'

export type SourceCode = Lib_SourceCode & {
  lineStartIndices: number[]
}

export type ReportObjectCreator = <MessageIds extends string>(
  node: TSESTree.Node,
) => {
  readonly loc: TSESTree.SourceLocation
  readonly messageId: MessageIds
}

export type CreateReporterArgs<
  MessageIds extends string,
  R extends readonly unknown[],
> = {
  context: UtilRuleContext<MessageIds, R>
  createReportPropertiesObject: ReportObjectCreator
  createReportParentObject: ReportObjectCreator
}
