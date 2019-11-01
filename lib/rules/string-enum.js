const { getPropertyName } = require('../utils/ast');
const { validOrders } = require('../utils/isValidOrders');

module.exports = {
  meta: {
    type: 'suggestion',

    docs: {
      description: 'require string enum members to be sorted',
      category: 'Stylistic Issues',
      recommended: true,
      url:
        'https://github.com/infctr/eslint-plugin-typescript-sort-keys/blob/master/docs/rules/string-enum.md',
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

    let currentEnum = null;
    let prevKeyName = null;

    const visitor = node => {
      const prevName = prevKeyName;
      const thisName = getPropertyName(node);

      prevKeyName = thisName || prevName;

      if (!prevName || !thisName || !currentEnum) {
        return;
      }

      if (!isValidOrder(prevName, thisName)) {
        context.report({
          node,
          loc: node.loc,
          message:
            "Expected string enum members to be in {{natural}}{{insensitive}}{{order}}ending order. '{{thisName}}' should be before '{{prevName}}'.",
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
      TSEnumDeclaration(node) {
        const isStringEnum =
          node.members &&
          node.members.every(
            member =>
              member.initializer &&
              member.initializer.type === 'Literal' &&
              typeof member.initializer.value === 'string',
          );

        if (isStringEnum) {
          currentEnum = node;
        }

        prevKeyName = null;
      },
      'TSEnumDeclaration:exit'() {
        currentEnum = null;
        prevKeyName = null;
      },
      TSEnumMember(node) {
        return visitor(node);
      },
    };
  },
};
