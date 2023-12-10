import { AST_NODE_TYPES, AST_TOKEN_TYPES } from '@typescript-eslint/utils'
import { Node, SourceCode } from 'types'
import {
  getCommentsTextAfter,
  getCommentsTextBefore,
  getLastCommentText,
} from './commentHelpers'
import { getIndentationMap } from './indentHelpers'
import { getPunctuation } from './punctuationHelpers'
import { getProcessedText } from './textHelpers'

/**
 * Returns the text of the entire body, rebuilt from the source code in order given.
 */
export function getFixedBodyText(
  sourceCode: SourceCode,
  bodyToEmit: Node[],
  originalBody: Node[],
) {
  // Indents from original body
  const indentations = getIndentationMap(sourceCode, originalBody)
  // Capture any trailing comments + whitespace
  const lastCommentsText = getLastCommentText(sourceCode, originalBody)
  return (
    bodyToEmit
      .map((node, index) => {
        const isLast = index === bodyToEmit.length - 1
        const shouldHavePunctuation = !isLast || node.type !== AST_NODE_TYPES.TSEnumMember
        const resultNodeText =
          indentations.get(index) +
          [
            getCommentsTextBefore(sourceCode, node),
            getProcessedText(sourceCode, node),
            getCommentsTextAfter(sourceCode, node, AST_TOKEN_TYPES.Block),
            shouldHavePunctuation && getPunctuation(node),
            getCommentsTextAfter(
              sourceCode,
              node,
              AST_TOKEN_TYPES.Line,
              indentations.get(index + 1) ?? lastCommentsText,
            ),
          ]
            .filter(Boolean)
            .join('')
            .trimStart()

        return resultNodeText
      })
      .join('') + lastCommentsText
  )
}

export * from './commentHelpers'
export * from './indentHelpers'
export * from './nodeHelpers'
export * from './punctuationHelpers'
export * from './textHelpers'
