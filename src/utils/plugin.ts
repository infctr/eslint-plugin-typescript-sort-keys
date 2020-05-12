import { TSESTree, AST_TOKEN_TYPES } from '@typescript-eslint/experimental-utils';
import {
  RuleContext as UtilRuleContext,
  RuleFixer,
  RuleFix,
  SourceCode,
} from '@typescript-eslint/experimental-utils/dist/ts-eslint';
import assert from 'assert';

import { RuleOptions, SortingOrder } from 'common/options';
import { getPropertyName } from './ast';
import { compareFunctions } from './compare';

type TSType = TSESTree.TypeElement | TSESTree.TSEnumMember;

function createNodeSwapper(context: UtilRuleContext<string, RuleOptions>) {
  const sourceCode = context.getSourceCode() as SourceCode & {
    lineStartIndices: number[];
  };

  /**
   * Returns the indent range of a node if it's the first on its line.
   * Otherwise, returns a range starting immediately after the previous sibling.
   */
  function getIndentRange(node: TSESTree.Node | TSESTree.Comment): TSESTree.Range {
    const prevSibling = sourceCode.getTokenBefore(node);
    const end = node.range[0];
    const start =
      prevSibling.loc.start.line === node.loc.start.line
        ? prevSibling.range[1] + 1
        : node.range[0] - node.loc.start.column;

    return [start, end];
  }

  function getRangeWithIndent(node: TSESTree.Comment) {
    return [getIndentRange(node)[0], node.range[1]];
  }

  /**
   * Returns the range for the entire line, including EOL, if node is the only
   * token on its lines. Otherwise, returns the node range.
   */
  function getLineRange(node: TSESTree.Comment): TSESTree.Range {
    const [start] = getRangeWithIndent(node);
    const index = sourceCode.lineStartIndices.findIndex(n => start === n);

    if (index < 0) {
      // Node is not at the beginning of the line
      return node.range;
    }

    const lines = 1 + node.loc.end.line - node.loc.start.line;

    return [
      sourceCode.lineStartIndices[index],
      sourceCode.lineStartIndices[index + lines],
    ];
  }

  function getIndentText(node: TSESTree.Node) {
    return sourceCode.text.slice(...getIndentRange(node));
  }

  function getNodePunctuator(node: TSESTree.Node) {
    const punctuator = sourceCode.getTokenAfter(node, {
      filter: n => n.type === AST_TOKEN_TYPES.Punctuator && n.value !== ':',
      includeComments: false,
    });

    // Check the punctuator value outside of filter because we
    // want to stop traversal on any terminating punctuator
    return punctuator && /^[,;]$/.test(punctuator.value) ? punctuator : undefined;
  }

  return (
    fixer: RuleFixer,
    nodePositions: Map<TSType, { initial: number; final: number }>,
    currentNode: TSType,
    replaceNode: TSType,
  ) =>
    [currentNode, replaceNode].reduce<RuleFix[]>((acc, node) => {
      const otherNode = node === currentNode ? replaceNode : currentNode;
      const comments = sourceCode.getCommentsBefore(node);
      const nextSibling = sourceCode.getTokenAfter(node);
      const isLastReplacingLast =
        nodePositions.get(node).final === nodePositions.size - 1 &&
        nodePositions.get(node).final === nodePositions.get(otherNode).initial;

      let text = [
        comments.length ? getIndentText(node) : '',
        sourceCode.getText(node),
      ].join('');

      // If nextSibling is the node punctuator, remove it
      if (nextSibling === getNodePunctuator(node)) {
        acc.push(fixer.remove(nextSibling));
      }

      if (!/[,;]$/.test(text)) {
        // Add a punctuator if the node doesn't already have one
        text += ',';
      }

      if (isLastReplacingLast) {
        // If we're moving the last node to its final destination, we can remove the punctuator
        text = text.replace(/,$/, '');
      }

      if (comments.length) {
        // Insert leading comments above the other node
        acc.push(
          fixer.insertTextBefore(
            otherNode,
            comments
              .map(comment => sourceCode.getText(comment as any))
              .concat('')
              .join('\n'),
          ),
        );
      }

      acc.push(
        // Insert the node before the other node
        fixer.insertTextBefore(otherNode, text),
        // Remove the original instance of node
        fixer.remove(node),
        // Remove the original instances of node comments
        ...comments.map(n => fixer.removeRange(getLineRange(n))),
      );

      return acc;
    }, []);
}

export function createReporter<MessageIds extends string>(
  context: UtilRuleContext<MessageIds, RuleOptions>,
  createReportObject: (
    node: TSESTree.Node,
  ) => { readonly loc: TSESTree.SourceLocation; readonly messageId: MessageIds },
) {
  // Parse options.
  const order = context.options[0] || SortingOrder.Ascending;
  const options = context.options[1];
  const insensitive = (options && options.caseSensitive) === false;
  const natural = Boolean(options && options.natural);
  const computedOrder = [order, insensitive && 'I', natural && 'N']
    .filter(Boolean)
    .join('');

  const compareFn = compareFunctions[computedOrder];
  const swapNodes = createNodeSwapper(context);

  return (body: TSType[]) => {
    const sortedBody = [...body].sort((a, b) => {
      return compareFn(getPropertyName(a), getPropertyName(b));
    });

    const nodePositions = new Map(
      body.map(n => [n, { initial: body.indexOf(n), final: sortedBody.indexOf(n) }]),
    );

    for (let i = 1; i < body.length; i += 1) {
      const prevNode = body[i - 1];
      const currentNode = body[i];
      const prevNodeName = getPropertyName(prevNode);
      const currentNodeName = getPropertyName(currentNode);

      if (compareFn(prevNodeName, currentNodeName) > 0) {
        const targetPosition = sortedBody.indexOf(currentNode);
        const replaceNode = body[targetPosition];
        const { loc, messageId } = createReportObject(currentNode);

        // Sanity check
        assert(loc, 'createReportObject return value must include a node location');
        assert(
          messageId,
          'createReportObject return value must include a problem message',
        );

        context.report({
          loc,
          messageId,
          node: currentNode,
          data: {
            thisName: currentNodeName,
            prevName: prevNodeName,
            order,
            insensitive: insensitive ? 'insensitive ' : '',
            natural: natural ? 'natural ' : '',
          },

          fix: fixer => {
            if (currentNode !== replaceNode) {
              return swapNodes(fixer, nodePositions, currentNode, replaceNode);
            }

            return undefined;
          },
        });
      }
    }
  };
}
