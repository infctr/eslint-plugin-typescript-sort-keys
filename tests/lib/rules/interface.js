'use strict';

const { RuleTester } = require('eslint');

const rule = require('../../../lib/rules/interface');

const ruleTester = new RuleTester({
  parser: 'typescript-eslint-parser',
});

ruleTester.run('interface', rule, {
  valid: [
    // default (asc)
    { code: 'interface I {_:T; a:T; b:T;}' },
    { code: 'interface I {a:T; b:T; c:T;}' },
    { code: 'interface I {a:T; b:T; b_:T;}' },
    { code: 'interface I {C:T; b_:T; c:T;}' },
    { code: 'interface I {$:T; A:T; _:T; a:T;}' },
    { code: "interface I {1:T; '11':T; 2:T; A:T;}" },
    { code: "interface I {'#':T; 'Z':T; À:T; è:T;}" },

    // methods (asc)
    { code: 'interface I {_:T; a():T; b:T;}' },
    { code: 'interface I {a():T; b:T; c:T;}' },
  ],
  invalid: [
    // default (asc)
    {
      code: 'interface I {a:T; _:T; b:T;}',
      errors: ["Expected interface keys to be in ascending order. '_' should be before 'a'."],
    },
    {
      code: 'interface I {a:T; c:T; b:T;}',
      errors: ["Expected interface keys to be in ascending order. 'b' should be before 'c'."],
    },
    {
      code: 'interface I {b_:T; a:T; b:T;}',
      errors: ["Expected interface keys to be in ascending order. 'a' should be before 'b_'."],
    },
    {
      code: 'interface I {b_:T; c:T; C:T;}',
      errors: ["Expected interface keys to be in ascending order. 'C' should be before 'c'."],
    },
    {
      code: 'interface I {$:T; _:T; A:T; a:T;}',
      errors: ["Expected interface keys to be in ascending order. 'A' should be before '_'."],
    },
    {
      code: "interface I {1:T; 2:T; A:T; '11':T;}",
      errors: ["Expected interface keys to be in ascending order. '11' should be before 'A'."],
    },
    {
      code: "interface I {'#':T; À:T; 'Z':T; è:T;}",
      errors: ["Expected interface keys to be in ascending order. 'Z' should be before 'À'."],
    },

    // methods
    {
      code: "interface I {1:T; 2:T; A():T; '11':T;}",
      errors: ["Expected interface keys to be in ascending order. '11' should be before 'A'."],
    },
    {
      code: "interface I {'#'():T; À():T; 'Z':T; è:T;}",
      errors: ["Expected interface keys to be in ascending order. 'Z' should be before 'À'."],
    },
  ],
});
