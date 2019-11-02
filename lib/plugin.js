const assert = require('assert');

const { getPropertyName } = require('./utils/ast');
const { compareFunctions } = require('./utils/compareFunctions');

function createNodeSwapper(sourceCode) {
  /**
   * Returns the indent range of a node if it's the first on its line.
   * Otherwise, returns a range starting immediately after the previous sibling.
   */
  function getIndentRange(node) {
    const prevSibling = sourceCode.getTokenBefore(node);
    return [
      prevSibling.loc.start.line === node.loc.start.line
        ? prevSibling.loc.end.column + 1
        : node.range[0] - node.loc.start.column,
      node.range[0],
    ];
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

  function getTextWithIndent(node) {
    return `${getIndentText(node)}${sourceCode.getText(node)}`;
  }

  return (fixer, currentNode, replaceNode) => {
    const currentNodeComments = sourceCode.getCommentsBefore(currentNode);
    const replaceNodeComments = sourceCode.getCommentsBefore(replaceNode);

    return [
      /**
       * Insert the current node and any leading comments above the node being replaced
       */
      currentNodeComments.length &&
        fixer.insertTextBefore(
          replaceNode,
          currentNodeComments
            .map(c => sourceCode.getText(c))
            .concat('')
            .join('\n'),
        ),
      fixer.insertTextBefore(replaceNode, getTextWithIndent(currentNode)),

      /**
       * Insert the replaced and any leading comments above the original location of the current node
       */
      replaceNodeComments.length &&
        fixer.insertTextBefore(
          currentNode,
          replaceNodeComments
            .map(c => sourceCode.getText(c))
            .concat('')
            .join('\n'),
        ),
      fixer.insertTextBefore(currentNode, getTextWithIndent(replaceNode)),

      /**
       * Remove the original instances of both nodes
       */
      fixer.remove(currentNode),
      fixer.remove(replaceNode),

      /**
       * Remove original comment nodes
       */
      ...[]
        .concat(currentNodeComments, replaceNodeComments)
        .map(c => fixer.removeRange(getLineRange(c))),
    ].filter(Boolean);
  };
}

module.exports = function createReporter(context, createReportObject) {
  // Parse options.
  const order = context.options[0] || 'asc';
  const options = context.options[1];
  const insensitive = (options && options.caseSensitive) === false;
  const natural = Boolean(options && options.natural);
  const computedOrder = [order, insensitive && 'I', natural && 'N']
    .filter(Boolean)
    .join('');

  const compareFn = compareFunctions[computedOrder];
  const swapNodes = createNodeSwapper(context.getSourceCode());

  return nodeList => {
    const sortedBody = [...nodeList].sort((a, b) => {
      return compareFn(getPropertyName(a), getPropertyName(b));
    });

    for (let i = 1; i < nodeList.length; i += 1) {
      const prevNode = nodeList[i - 1];
      const currentNode = nodeList[i];
      const prevNodeName = getPropertyName(prevNode);
      const currentNodeName = getPropertyName(currentNode);

      if (compareFn(prevNodeName, currentNodeName) > 0) {
        const targetPosition = sortedBody.indexOf(currentNode);
        const replaceNode = nodeList[targetPosition];
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
            thisName: currentNodeName,
            prevName: prevNodeName,
            order,
            insensitive: insensitive ? 'insensitive ' : '',
            natural: natural ? 'natural ' : '',
            ...data,
          },
          fix: fixer => {
            if (currentNode !== replaceNode) {
              return swapNodes(fixer, currentNode, replaceNode);
            }
            return undefined;
          },
          ...rest,
        });
      }
    }
  };
};
