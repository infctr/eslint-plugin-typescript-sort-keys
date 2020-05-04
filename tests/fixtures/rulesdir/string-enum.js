const { rule } = require('../source/string-enum')

/**
 * Wrapper for `eslint --rulesdir` interop in autofix tests
 * @see https://github.com/eslint/eslint/issues/13232
 */
module.exports = rule
