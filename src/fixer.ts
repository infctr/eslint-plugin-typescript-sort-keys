import { TSESLint } from '@typescript-eslint/utils'
import { ReportFixFunction } from '@typescript-eslint/utils/ts-eslint'

import { AllRuleOptions, CreateReporterArgs, Node, SourceCode, TSType } from './types'
import { getMemoized, memoize } from './utils/memo'
import { getBodyRange, getFixedBodyText } from './utils/sourcecode'

export const getFixerFunction = (
  baseMemoKey: string,
  createReporterArgs: Pick<CreateReporterArgs<string, AllRuleOptions>, 'context'>,
  body: TSType[],
  sortedBody: TSType[],
): ReportFixFunction =>
  function* (fixer: TSESLint.RuleFixer) {
    const sourceCode = createReporterArgs.context.sourceCode as SourceCode

    const bodyRange = memoize(`bodyRange_${baseMemoKey}`, () =>
      getBodyRange(sourceCode, body as unknown as Node[]),
    )

    const fixedBodyTextMemoKey = `fixedBodyText_${baseMemoKey}`
    // Replace the entire body with the sorted body
    const fixedBodyText =
      getMemoized(fixedBodyTextMemoKey) ??
      memoize(fixedBodyTextMemoKey, () =>
        getFixedBodyText(
          sourceCode,
          sortedBody as unknown as Node[],
          body as unknown as Node[],
        ),
      )

    yield fixer.replaceTextRange(bodyRange, fixedBodyText)
  }
