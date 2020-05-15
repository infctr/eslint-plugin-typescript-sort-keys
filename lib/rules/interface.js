const { getObjectBody } = require('../utils/ast');
const createReporter = require('../plugin');

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
          requiredFirst: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const compareNodeListAndReport = createReporter(context, currentNode => ({
      loc: currentNode.key ? currentNode.key.loc : currentNode.loc,
      message:
        'Expected interface keys to be in {{ requiredFirst }}{{ natural }}{{ insensitive }}{{ order }}ending order. ' +
        `'{{ thisName }}' should be before '{{ prevName }}'.`,
    }));
    return {
      TSInterfaceDeclaration(node) {
        const body = getObjectBody(node);
        return compareNodeListAndReport(body);
      },

      TSTypeLiteral(node) {
        const body = getObjectBody(node);
        return compareNodeListAndReport(body);
      },
    };
  },
};
