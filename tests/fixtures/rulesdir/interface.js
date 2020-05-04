const { rule } = require('../source/interface')

/**
 * Wrapper for `eslint --rulesdir` interop in autofix tests
 * @see https://github.com/eslint/eslint/issues/13232
 */
module.exports = rule
