import { getOptions } from './common/options'
import { getFixerFunction } from './fixer'
import { reportBodyNodes, reportParentNode } from './report'
import {
  AllRuleOptions,
  CreateReporterArgs,
  Declaration,
  NodeOrToken,
  NodePositionInfo,
} from './types'
import { getPropertyIsOptional, getPropertyName } from './utils/ast'
import { compareFn } from './utils/compare'
import { memoize } from './utils/memo'
import { getUnsortedInfo } from './utils/reportUtils'

/**
 * Returns the body sorted according to the options and sorting function.
 */
function getSortedBody(
  body: NodeOrToken[],
  isRequiredFirst: boolean,
  sortFunction: (a: NodeOrToken, b: NodeOrToken) => number,
) {
  return isRequiredFirst
    ? [
        // Split into required and optional properties, sort each group, then merge
        ...body
          .slice(0)
          .filter(node => !getPropertyIsOptional(node))
          .sort(sortFunction),
        ...body
          .slice(0)
          .filter(node => getPropertyIsOptional(node))
          .sort(sortFunction),
      ]
    : body.slice(0).sort(sortFunction)
}

export function createReporter(
  createReporterArgs: CreateReporterArgs<string, AllRuleOptions>,
) {
  const { isAscending, isInsensitive, isNatural, isRequiredFirst } = getOptions(
    createReporterArgs.context,
  )
  const compare = compareFn(isAscending, isInsensitive, isNatural)
  const sortFunction = (a: NodeOrToken, b: NodeOrToken) =>
    compare(getPropertyName(a), getPropertyName(b))

  // Reporter function
  return (bodyParent: Declaration, body: NodeOrToken[]) => {
    if (body.length < 2) {
      return
    }

    const sourceCode = createReporterArgs.context.sourceCode
    // Create a key for memoizing results based on plugin context & input
    const baseMemoKey = JSON.stringify({
      body: sourceCode.getText(bodyParent), // Disambiguator when body has code embedded in body
      options: { isAscending, isInsensitive, isNatural, isRequiredFirst },
      source: sourceCode.getText(), // Disambiguator when same body on both a type and interface
    })

    const sortedBody = memoize(`sortedBody_${baseMemoKey}`, () =>
      getSortedBody(body, isRequiredFirst, sortFunction),
    )
    const nodePositions: Map<NodeOrToken, NodePositionInfo> = memoize(
      `nodePositions_${baseMemoKey}`,
      () =>
        new Map<NodeOrToken, NodePositionInfo>(
          body.map((n, index) => [
            n,
            { initialIndex: index, finalIndex: sortedBody.indexOf(n) },
          ]),
        ),
    )

    const { unsortedCount, finalIndicesToReport } = memoize(
      `getUnsortedInfo_${baseMemoKey}`,
      () => getUnsortedInfo(sortedBody, body, nodePositions),
    )

    if (unsortedCount > 0) {
      const fixerFunction = memoize(`fixerFunction_${baseMemoKey}`, () =>
        getFixerFunction(baseMemoKey, createReporterArgs, body, sortedBody),
      )

      reportParentNode(createReporterArgs, bodyParent.loc, unsortedCount, fixerFunction)
      reportBodyNodes(createReporterArgs, nodePositions, sortedBody, finalIndicesToReport)
    }
  }
}
