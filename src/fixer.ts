import { TSESLint } from '@typescript-eslint/utils'
import { ReportFixFunction } from '@typescript-eslint/utils/ts-eslint'

import { AllRuleOptions, CreateReporterArgs, NodeOrToken, SourceCode } from './types'
import { getMemoized, memoize } from './utils/memo'
import { getBodyRange, getFixedBodyText } from './utils/sourcecode'

export const getFixerFunction = (
  baseMemoKey: string,
  createReporterArgs: Pick<CreateReporterArgs<string, AllRuleOptions>, 'context'>,
  body: NodeOrToken[],
  sortedBody: NodeOrToken[],
): ReportFixFunction =>
  function* (fixer: TSESLint.RuleFixer) {
    const sourceCode = createReporterArgs.context.sourceCode as SourceCode

    const bodyRange = memoize(`bodyRange_${baseMemoKey}`, () =>
      getBodyRange(sourceCode, body),
    )

    const fixedBodyTextMemoKey = `fixedBodyText_${baseMemoKey}`
    // Replace the entire body with the sorted body
    const fixedBodyText =
      getMemoized(fixedBodyTextMemoKey) ??
      memoize(fixedBodyTextMemoKey, () => getFixedBodyText(sourceCode, sortedBody, body))

    yield fixer.replaceTextRange(bodyRange, fixedBodyText)
  }
