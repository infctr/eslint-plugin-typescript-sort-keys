'use strict';

const { getPropertyName } = require('../utils/ast');
const { validOrders } = require('../utils/isValidOrders');

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'require interface keys to be sorted',
      category: 'Stylistic Issues',
      recommended: true,
      url:
        'https://github.com/infctr/eslint-plugin-typescript-sort-keys/blob/master/docs/rules/interface.md',
    },

    schema: [
      {
        enum: ['asc', 'desc'],
      },
      {
        type: 'object',
        properties: {
          caseSensitive: {
            type: 'boolean',
          },
          natural: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function create(context) {
    // Parse options.
    const order = context.options[0] || 'asc';
    const options = context.options[1];
    const insensitive = (options && options.caseSensitive) === false;
    const natural = Boolean(options && options.natural);
    const computedOrder = [order, insensitive && 'I', natural && 'N']
      .filter(Boolean)
      .join('');
    const isValidOrder = validOrders[computedOrder];

    // The stack to save the previous property's name for each object literals.
    let stack = null;

    const visitor = node => {
      const { prevName, prevNode } = stack;
      const thisName = getPropertyName(node);

      stack.prevName = thisName || prevName;
      stack.prevNode = node || prevNode;

      if (!prevName || !thisName) {
        return;
      }

      if (!isValidOrder(prevName, thisName)) {
        context.report({
          node,
          loc: node.key.loc,
          message:
            "Expected interface keys to be in {{natural}}{{insensitive}}{{order}}ending order. '{{thisName}}' should be before '{{prevName}}'.",
          data: {
            thisName,
            prevName,
            order,
            insensitive: insensitive ? 'insensitive ' : '',
            natural: natural ? 'natural ' : '',
          },
          fix(fixer) {
            const sourceCode = context.getSourceCode();
            const thisText = sourceCode.getText(node);
            const prevText = sourceCode.getText(prevNode);
            return [
              fixer.replaceText(node, prevText),
              fixer.replaceText(prevNode, thisText),
            ];
          },
        });
      }
    };

    return {
      TSInterfaceDeclaration() {
        stack = {
          upper: stack,
          prevName: null,
          prevNode: null,
        };
      },

      'TSInterfaceDeclaration:exit'() {
        stack = stack.upper;
      },

      TSTypeLiteral() {
        stack = {
          upper: stack,
          prevName: null,
          prevNode: null,
        };
      },

      'TSTypeLiteral:exit'() {
        stack = stack.upper;
      },

      TSPropertySignature(node) {
        return visitor(node);
      },

      TSMethodSignature(node) {
        return visitor(node);
      },
    };
  },
};
