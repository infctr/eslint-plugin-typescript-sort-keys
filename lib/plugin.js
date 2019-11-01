const assert = require('assert');

const { getPropertyName } = require('./utils/ast');
const { compareFunctions } = require('./utils/compareFunctions');

function createNodeSwapper(sourceCode) {
  return (fixer, currentNode, replaceNode) => {
    // console.debug(
    //   `"${sourceCode.getText(currentNode)}" <=> "${sourceCode.getText(
    //     replaceNode,
    //   )}"`,
    // );
    const currentNodeComments = sourceCode.getCommentsBefore(currentNode);
    const replaceNodeComments = sourceCode.getCommentsBefore(replaceNode);

    // console.log(
    //   currentNodeComments.length &&
    //     sourceCode.isSpaceBetweenTokens(
    //       currentNodeComments[currentNodeComments.length - 1],
    //       currentNode,
    //     ),
    // );

    // console.log(
    //   replaceNodeComments.length &&
    //     sourceCode.isSpaceBetweenTokens(
    //       replaceNodeComments[replaceNodeComments.length - 1],
    //       replaceNode,
    //     ),
    // );

    return [
      /**
       * Insert the current node above the node being replaced
       */
      currentNodeComments.length &&
        fixer.insertTextBefore(
          replaceNode,
          currentNodeComments
            .map(c => sourceCode.getText(c))
            .concat('')
            .join('\n'),
        ),
      fixer.insertTextBefore(replaceNode, sourceCode.getText(currentNode)),

      /**
       * Insert the replaced above the original location of the current node
       */
      replaceNodeComments.length &&
        fixer.insertTextBefore(
          currentNode,
          replaceNodeComments
            .map(c => sourceCode.getText(c))
            .concat('')
            .join('\n'),
        ),
      fixer.insertTextBefore(currentNode, sourceCode.getText(replaceNode)),

      /**
       * Remove the original instances of both nodes
       */
      fixer.remove(currentNode),
      fixer.remove(replaceNode),
      ...[]
        .concat(currentNodeComments, replaceNodeComments)
        .map(c => fixer.remove(c)),
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
