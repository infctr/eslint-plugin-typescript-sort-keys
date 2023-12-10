import { AST_NODE_TYPES, AST_TOKEN_TYPES } from '@typescript-eslint/utils'
import assert from 'assert'
import { Node, SourceCode } from 'types'
import {
  getEarliestNode,
  getLatestNode,
  getNextNonCommentNode,
  getPreviousNonCommentNode,
} from './nodeHelpers'

/**
 * Returns the node's following punctuation node, if any. Does not return comments.
 */
export function getNodePunctuator(
  sourceCode: SourceCode,
  node: Node,
  punctuators = ',;',
) {
  // interface/type member nodes contain their own punctuation
  if (new RegExp(`[${punctuators}]$`).test(sourceCode.getText(node))) {
    return sourceCode.getTokenByRangeStart(node.range[1] - 1)
  }

  const punctuator = sourceCode.getTokenAfter(node, {
    filter: (n: Node) => {
      return (
        n.type === AST_TOKEN_TYPES.Punctuator &&
        new RegExp(`^[${punctuators}]$`).test(n.value)
      )
    },
    includeComments: false,
  })
  // Ensure we don't go beyond the parent into the source code
  return punctuator && punctuator.range[1] <= (node.parent?.range[1] || Infinity)
    ? punctuator
    : undefined
}

/**
 * Returns the non-comment node following the given node's punctuation node, if any.
 * Ex: For `foo: T, bar: T`, returns `bar: T` node given `foo: T,` node.
 */
export function getNodeFollowingPunctuator(sourceCode: SourceCode, node: Node) {
  const punctuator = getNodePunctuator(sourceCode, node)
  if (!punctuator) return undefined
  return getNextNonCommentNode(sourceCode, punctuator)
}

/**
 * Returns the nodes for outer bracket punctuators of an interface or enum declaration.
 * Asserts that the punctuators exist due to use of non-null operator.
 */
export function getDeclarationPunctuators(sourceCode: SourceCode, body: Node[]) {
  const startNode = getEarliestNode(body)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const declarationStartPunctuator = getPreviousNonCommentNode(sourceCode, startNode)!
  assert(
    !!declarationStartPunctuator,
    `Expected declaration end punctuator after ${sourceCode.getText(startNode)}`,
  )

  const endNode = getLatestNode(body) // Sometimes this is a comma
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const declarationEndPunctuator = getNodePunctuator(sourceCode, endNode, '}')!
  assert(
    !!declarationStartPunctuator,
    `Expected declaration end punctuator after ${sourceCode.getText(endNode)}`,
  )

  return { declarationStartPunctuator, declarationEndPunctuator }
}

// Returns a string containing the node's punctuation, if any.
export function getPunctuation(node: Node) {
  return node.type === AST_NODE_TYPES.TSEnumMember ? ',' : ';'
}

export function getBodyRange(sourceCode: SourceCode, body: Node[]): [number, number] {
  const { declarationStartPunctuator, declarationEndPunctuator } =
    getDeclarationPunctuators(sourceCode, body)
  // Adjust start range ahead of the punctuator
  const start = declarationStartPunctuator.range[0] + 1
  const end = declarationEndPunctuator.range[0]

  return [start, end]
}
