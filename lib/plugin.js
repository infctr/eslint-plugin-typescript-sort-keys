const assert = require('assert');

const { getPropertyName, REQUIRED } = require('./utils/ast');
const { compareFunctions } = require('./utils/compareFunctions');

function createNodeSwapper(context) {
  const sourceCode = context.getSourceCode();

  /**
   * Returns the indent range of a node if it's the first on its line.
   * Otherwise, returns a range starting immediately after the previous sibling.
   */
  function getIndentRange(node) {
    const prevSibling = sourceCode.getTokenBefore(node);
    const end = node.range[0];
    let start;

    if (prevSibling.loc.start.line === node.loc.start.line) {
      start = prevSibling.range[1] + 1;
    } else {
      start = node.range[0] - node.loc.start.column;
    }

    return [start, end];
  }

  function getRangeWithIndent(node) {
    return [getIndentRange(node)[0], node.range[1]];
  }

  /**
   * Returns the range for the entire line, including EOL, if node is the only
   * token on its lines. Otherwise, returns the node range.
   */
  function getLineRange(node) {
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

  function getIndentText(node) {
    return sourceCode.text.slice(...getIndentRange(node));
  }

  function getNodePunctuator(node) {
    let punctuator;

    if (node.type === 'Punctuator') {
      punctuator = node;
    } else {
      punctuator = sourceCode.getTokenAfter(node, {
        filter: n => n.type === 'Punctuator' && n.value !== ':',
        includeComments: false,
      });
    }
    // Check the punctuator value outside of filter because we
    // want to stop traversal on any terminating punctuator
    return punctuator && /^[,;]$/.test(punctuator.value)
      ? punctuator
      : undefined;
  }

  return (fixer, nodePositions, currentNode, replaceNode) =>
    [currentNode, replaceNode].reduce((acc, node) => {
      const otherNode = node === currentNode ? replaceNode : currentNode;
      const comments = sourceCode.getCommentsBefore(node);
      const nextSibling = sourceCode.getTokenAfter(node);
      const isLastReplacingLast =
        nodePositions.get(node).final === nodePositions.size - 1 &&
        nodePositions.get(node).final === nodePositions.get(otherNode).initial;

      let text = `${
        comments.length ? getIndentText(node) : ''
      }${sourceCode.getText(node)}`;

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
              .map(c => sourceCode.getText(c))
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

function stripIsRequiredString(nodeName) {
  if (typeof nodeName === 'string' && nodeName.startsWith(REQUIRED)) {
    return nodeName.substring(REQUIRED.length);
  }
  return nodeName;
}

module.exports = function createReporter(context, createReportObject) {
  // Parse options.
  const order = context.options[0] || 'asc';
  const options = context.options[1];
  const insensitive = (options && options.caseSensitive) === false;
  const natural = Boolean(options && options.natural);
  const requiredFirst = (options && options.requiredFirst) === true;
  const computedOrder = [order, insensitive && 'I', natural && 'N']
    .filter(Boolean)
    .join('');

  const compareFn = compareFunctions[computedOrder];
  const swapNodes = createNodeSwapper(context);

  return body => {
    const sortedBody = [...body].sort((a, b) => {
      return compareFn(
        getPropertyName(requiredFirst, a),
        getPropertyName(requiredFirst, b),
      );
    });

    const nodePositions = new Map(
      body.map(n => [
        n,
        { initial: body.indexOf(n), final: sortedBody.indexOf(n) },
      ]),
    );

    for (let i = 1; i < body.length; i += 1) {
      const prevNode = body[i - 1];
      const currentNode = body[i];
      const prevNodeName = getPropertyName(requiredFirst, prevNode);
      const currentNodeName = getPropertyName(requiredFirst, currentNode);

      if (compareFn(prevNodeName, currentNodeName) > 0) {
        const targetPosition = sortedBody.indexOf(currentNode);
        const replaceNode = body[targetPosition];
        const { data, ...rest } = createReportObject(currentNode, replaceNode);

        // Sanity check
        assert(
          rest.loc,
          'createReportObject return value must include a node location',
        );
        assert(
          rest.message,
          'createReportObject return value must include a problem message',
        );

        context.report({
          node: currentNode,
          data: {
            thisName: stripIsRequiredString(currentNodeName),
            prevName: stripIsRequiredString(prevNodeName),
            order,
            insensitive: insensitive ? 'insensitive ' : '',
            natural: natural ? 'natural ' : '',
            requiredFirst: requiredFirst ? 'required first ' : '',
            ...data,
          },
          fix: fixer => {
            if (currentNode !== replaceNode) {
              return swapNodes(fixer, nodePositions, currentNode, replaceNode);
            }
            return undefined;
          },
          ...rest,
        });
      }
    }
  };
};
