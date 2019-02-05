'use strict';

const { getPropertyName } = require('../utils/ast');
const { validOrders } = require('../utils/isValidOrders');

module.exports = {
  meta: {
    type: 'suggestion',

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
      const { prevName } = stack;
      const thisName = getPropertyName(node);

      stack.prevName = thisName || prevName;

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
        });
      }
    };

    return {
      TSInterfaceDeclaration() {
        stack = {
          upper: stack,
          prevName: null,
        };
      },

      'TSInterfaceDeclaration:exit'() {
        stack = stack.upper;
      },

      TSTypeLiteral() {
        stack = {
          upper: stack,
          prevName: null,
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
