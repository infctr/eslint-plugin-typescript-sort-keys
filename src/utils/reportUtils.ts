import { PLUGIN_NAME, RuleNames } from '../config/constants'
import { NodeOrToken, NodePositionInfo } from '../types'

/**
 * Check if the node is locally sorted or not.
 *
 * Example: c, a, b can skip reporting that 'a' should be
 *  before 'b' even though they're both positioned wrongly.
 */
export function shouldReportUnsorted(
  sortedBody: NodeOrToken[],
  unsortedBody: NodeOrToken[],
  nodeInfo: NodePositionInfo,
) {
  const { initialIndex: unsortedIndex, finalIndex: sortedIndex } = nodeInfo
  const isLastInSorted = sortedIndex === sortedBody.length - 1
  const nextSortedNode = sortedBody[sortedIndex + 1]
  const nextUnsortedNode = unsortedBody[unsortedIndex + 1]
  // is sorted directly with a neighbor or partially sorted (e.g. a B D F E only 2 out of order)
  const isPartiallySorted =
    nextSortedNode === nextUnsortedNode ||
    unsortedBody.indexOf(nextSortedNode) > unsortedIndex

  return unsortedIndex !== sortedIndex && (isLastInSorted || !isPartiallySorted)
}

// Helpful metadata on nodes to report/skip reporting
export function getUnsortedInfo(
  sortedBody: NodeOrToken[],
  unsortedBody: NodeOrToken[],
  nodePositions: Map<NodeOrToken, NodePositionInfo>,
) {
  const finalIndicesToReport = new Array(sortedBody.length).fill(false)
  const unsortedCount = Array.from(nodePositions.entries()).reduce(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (count, [_, info]) => {
      if (shouldReportUnsorted(sortedBody, unsortedBody, info)) {
        finalIndicesToReport[info.finalIndex] = true
        return count + 1
      }
      return count
    },
    0,
  )
  return { unsortedCount, finalIndicesToReport }
}

// Return string with url to notify of rule deprecations
export function getDeprecationMessage(name: string) {
  switch (name) {
    case RuleNames.StringEnum:
      return `\nThis rule is deprecated. Use \`${PLUGIN_NAME}/${RuleNames.Enum}\` instead.`
    default:
      return ''
  }
}
