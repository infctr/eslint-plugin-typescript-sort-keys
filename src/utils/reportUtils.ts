import { PLUGIN_NAME } from 'config/constants'
import { name as enumRuleName } from 'rules/enum'
import { name as enumRuleNameDeprecated } from 'rules/string-enum'
import { NodePositionInfo, TSType } from 'types'

import { getRuleDocsUrl } from './rule'

/**
 * Check if the node is locally sorted or not.
 *
 * Example: c, a, b can skip reporting that 'a' should be
 *  before 'b' even though they're both positioned wrongly.
 */
export function shouldReportUnsorted(
  sortedBody: TSType[],
  unsortedBody: TSType[],
  nodeInfo: NodePositionInfo,
) {
  const { initialIndex, finalIndex } = nodeInfo
  const isLastSorted = finalIndex === sortedBody.length - 1
  // Node moved and next sorted node isn't the same neighbor as unsorted
  return (
    initialIndex !== finalIndex &&
    (isLastSorted || sortedBody[finalIndex + 1] !== unsortedBody[initialIndex + 1])
  )
}

// Helpful metadata on nodes to report/skip reporting
export function getUnsortedInfo(
  sortedBody: TSType[],
  unsortedBody: TSType[],
  nodePositions: Map<TSType, NodePositionInfo>,
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
    case enumRuleNameDeprecated:
      return `DEPRECATED: see [${PLUGIN_NAME}/${enumRuleName}](${getRuleDocsUrl(enumRuleName)})`
    default:
      return ''
  }
}
