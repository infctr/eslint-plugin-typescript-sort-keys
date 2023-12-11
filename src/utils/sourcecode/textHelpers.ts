import { Node, SourceCode } from 'types'

/**
 * Returns text between the node and previous (previous may be a comment).
 * Empty result if no previous node.
 */
export function getTextBetweenNodeAndPrevious(sourceCode: SourceCode, node: Node) {
  const prevNode = sourceCode.getTokenBefore(node, { includeComments: true })
  if (!prevNode) return ''

  return getTextBetween(sourceCode, prevNode, node)
}

/**
 * Returns text between the node and next (next may be a comment).
 * Empty result if no next node.
 */
export function getTextBetweenNodeAndNext(sourceCode: SourceCode, node: Node) {
  const nextNode = sourceCode.getTokenAfter(node, { includeComments: true })
  if (!nextNode) return ''

  return getTextBetween(sourceCode, node, nextNode)
}

/**
 * Returns the node with proper punctuation.
 */
export function getProcessedText(sourceCode: SourceCode, node: Node) {
  const nodeText = sourceCode.getText(node)

  if (/[,;]$/.test(nodeText)) {
    return nodeText.substring(0, nodeText.length - 1)
  }

  return nodeText
}

/**
 * Returns the text between two nodes, excluding comments between them.
 * Range of start/end is from the comments between the nodes, if any. If a
 * given node is a comment, the respective range is from the comment itself.
 */
export function getTextBetween(sourceCode: SourceCode, startNode: Node, endNode: Node) {
  const startNodeEnd = startNode.range[1]
  const endNodeStart = endNode.range[0]

  return sourceCode.text.slice(startNodeEnd, endNodeStart)
}
