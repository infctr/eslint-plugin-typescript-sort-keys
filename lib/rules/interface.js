'use strict';

const astUtils = require('../utils/ast');
const { validOrders } = require('../utils/isValidOrders');

/**
 * Gets the property name of the given `Property` node.
 *
 * - If the property's key is an `Identifier` node, this returns the key's name
 *   whether it's a computed property or not.
 * - If the property has a static name, this returns the static name.
 * - Otherwise, this returns null.
 *
 * @param {ASTNode} node - The `Property` node to get.
 * @returns {string|null} The property name or null.
 * @private
 */
function getPropertyName(node) {
  return astUtils.getStaticPropertyName(node) || node.key.name || null;
}

module.exports = {
  meta: {
    type: 'suggestion',

    docs: {
      description: 'require interface keys to be sorted',
      category: 'Stylistic Issues',
      recommended: false,
      url: 'https://eslint.org/docs/rules/sort-keys', // TODO
    },
    // fixable: 'code',

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
