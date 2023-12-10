import { Node, SourceCode } from 'types'
import { getCommentsBefore } from './commentHelpers'
import { getEarliestNode } from './nodeHelpers'
import { getTextBetweenNodeAndPrevious } from './textHelpers'

/**
 * Returns a map from index of source code to indentation string.
 */
export function getIndentationMap(sourceCode: SourceCode, body: Node[]) {
  return new Map<number, string>(
    body.map((node, nodeIndex) => {
      // Special case: block comment in between two nodes
      const commentsBefore = getCommentsBefore(sourceCode, node)
      const earliestNode = getEarliestNode([...commentsBefore, node])
      const indent = getTextBetweenNodeAndPrevious(sourceCode, earliestNode)

      return [nodeIndex, indent]
    }),
  )
}
