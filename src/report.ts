import assert from 'assert'

import { TSESTree } from '@typescript-eslint/utils'
import { ReportFixFunction } from '@typescript-eslint/utils/ts-eslint'

import { getOptions } from './common/options'
import { AllRuleOptions, CreateReporterArgs, NodePositionInfo, TSType } from './types'
import { getPropertyName } from './utils/ast'
import { getDeprecationMessage } from './utils/reportUtils'

/**
 * Report the parent node if it has unsorted body nodes.
 */
export function reportParentNode(
  createReporterArgs: Omit<
    CreateReporterArgs<string, AllRuleOptions>,
    'createReportPropertiesObject'
  >,
  bodyParent: TSESTree.Node,
  unsortedCount: number,
  fixerFunction: ReportFixFunction,
) {
  const { context, createReportParentObject } = createReporterArgs
  const { loc, messageId } = createReportParentObject(bodyParent)
  context.report({
    loc,
    messageId,
    node: bodyParent,
    data: {
      unsortedCount,
      notice: getDeprecationMessage(context.id),
    },
    fix: fixerFunction,
  })
}

/**
 * Report the body nodes if they're unsorted.
 */
export function reportBodyNodes(
  createReporterArgs: Omit<
    CreateReporterArgs<string, AllRuleOptions>,
    'createReportParentObject'
  >,
  nodePositions: Map<TSType, NodePositionInfo>,
  sortedBody: TSType[],
  finalIndicesToReport: boolean[],
  fixerFunction: ReportFixFunction,
) {
  const { context, createReportPropertiesObject } = createReporterArgs
  const { isInsensitive, isNatural, isRequiredFirst, order } = getOptions(
    createReporterArgs.context,
  )
  for (const [node, { finalIndex }] of nodePositions.entries()) {
    // If the node is not in the correct position, report it
    if (finalIndicesToReport[finalIndex]) {
      const { loc, messageId } = createReportPropertiesObject(node)

      // Sanity check
      assert(loc, 'createReportObject return value must include a node location')
      assert(messageId, 'createReportObject return value must include a problem message')

      let optionsString = [
        isRequiredFirst && 'required-first',
        isInsensitive && 'insensitive',
        isNatural && 'natural',
      ]
        .filter(Boolean)
        .join(', ')
      if (optionsString) optionsString += ' '

      context.report({
        loc,
        messageId,
        node,
        data: {
          nodeName: getPropertyName(node),
          messageShouldBeWhere:
            finalIndex + 1 < sortedBody.length
              ? `before '${getPropertyName(sortedBody[finalIndex + 1])}'`
              : 'at the end',
          order,
          options: optionsString,
          notice: getDeprecationMessage(context.id),
        },
        fix: fixerFunction,
      })
    }
  }
}