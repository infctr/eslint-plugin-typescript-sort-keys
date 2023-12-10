import { Node, SourceCode } from 'types'

/**
 * Returns the node with the highest range in the list
 */
export function getLatestNode(body: Node[]) {
  return body.reduce((acc, node) => {
    return node.range[1] >= acc.range[1] ? node : acc
  }, body[0])
}

/**
 * Returns the node with the lowest range in the list
 */
export function getEarliestNode(body: Node[]) {
  return body.reduce((acc, node) => {
    return node.range[1] <= acc.range[0] ? node : acc
  }, body[0])
}

export function getNextNonCommentNode(sourceCode: SourceCode, node: Node) {
  const nextNode = sourceCode.getTokenAfter(node, { includeComments: false })
  return nextNode ?? undefined
}
export function getPreviousNonCommentNode(sourceCode: SourceCode, node: Node) {
  const nextNode = sourceCode.getTokenBefore(node, { includeComments: false })
  return nextNode ?? undefined
}
