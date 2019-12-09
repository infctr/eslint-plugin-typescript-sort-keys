const { getObjectBody } = require('../utils/ast');
const createReporter = require('../plugin');

module.exports = {
  meta: {
    type: 'suggestion',

    fixable: 'code',

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

  create(context) {
    const compareNodeListAndReport = createReporter(context, currentNode => ({
      loc: currentNode.loc,
      message:
        'Expected string enum members to be in {{ natural }}{{ insensitive }}{{ order }}ending order. ' +
        `'{{ thisName }}' should be before '{{ prevName }}'.`,
    }));
    return {
      TSEnumDeclaration(node) {
        const body = getObjectBody(node);
        const isStringEnum = body.every(
          member =>
            member.initializer &&
            member.initializer.type === 'Literal' &&
            typeof member.initializer.value === 'string',
        );
        if (isStringEnum) {
          compareNodeListAndReport(body);
        }
      },
    };
  },
};
