const { RuleTester } = require('eslint');

const rule = require('../../../lib/rules/interface');

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('interface', rule, {
  valid: [
    // default (asc)
    { code: 'interface U {_:T; a:T; b:T;} // default (asc)' },
    { code: 'interface U {a:T; b:T; c:T;}' },
    { code: 'interface U {a:T; b:T; b_:T;}' },
    { code: 'interface U {C:T; b_:T; c:T;}' },
    { code: 'interface U {$:T; A:T; _:T; a:T;}' },
    { code: "interface U {1:T; '11':T; 2:T; A:T;}" },
    { code: "interface U {'#':T; 'Z':T; À:T; è:T;}" },

    { code: 'interface U {a:T; ["ab"]:T; b:T; c:T;}' },

    // nested
    { code: 'interface U {a:T; b:{x:T; y:T;}; c:T;} // nested' },
    { code: 'interface U {a:T; b:{x:T; y:T; z:{i:T; j:T;};}; c:T;}' },
    { code: 'type U = {a:T; b:{x:T; y:T;}; c:T;}' },
    { code: 'type U = {a:T; b:{x:T; y:T; z:{i:T; j:T;};}; c:T;}' },

    // asc
    { code: 'interface U {_:T; a:T; b:T;} // asc', options: ['asc'] },
    { code: 'interface U {a:T; b:T; c:T;}', options: ['asc'] },
    { code: 'interface U {a:T; b:T; b_:T;}', options: ['asc'] },
    { code: 'interface U {C:T; b_:T; c:T;}', options: ['asc'] },
    { code: 'interface U {$:T; A:T; _:T; a:T;}', options: ['asc'] },
    { code: "interface U {1:T; '11':T; 2:T; A:T;}", options: ['asc'] },
    { code: "interface U {'#':T; 'Z':T; À:T; è:T;}", options: ['asc'] },

    // asc, insensitive
    { code: 'interface U {_:T; a:T; b:T;} // asc, insensitive', options: ['asc', { caseSensitive: false }] },
    { code: 'interface U {a:T; b:T; c:T;}', options: ['asc', { caseSensitive: false }] },
    { code: 'interface U {a:T; b:T; b_:T;}', options: ['asc', { caseSensitive: false }] },
    { code: 'interface U {b_:T; C:T; c:T;}', options: ['asc', { caseSensitive: false }] },
    { code: 'interface U {b_:T; c:T; C:T;}', options: ['asc', { caseSensitive: false }] },
    { code: 'interface U {$:T; _:T; A:T; a:T;}', options: ['asc', { caseSensitive: false }] },
    { code: "interface U {1:T; '11':T; 2:T; A:T;}", options: ['asc', { caseSensitive: false }] },
    { code: "interface U {'#':T; 'Z':T; À:T; è:T;}", options: ['asc', { natural: true }] },

    // asc, natural, insensitive
    { code: 'interface U {_:T; a:T; b:T;} // asc, natural, insensitive', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {a:T; b:T; c:T;}', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {a:T; b:T; b_:T;}', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {b_:T; C:T; c:T;}', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {b_:T; c:T; C:T;}', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {$:T; _:T; A:T; a:T;}', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: "interface U {1:T; 2:T; '11':T; A:T;}", options: ['asc', { natural: true, caseSensitive: false }] },
    { code: "interface U {'#':T; 'Z':T; À:T; è:T;}", options: ['asc', { natural: true, caseSensitive: false }] },

    // asc, natural, insensitive, required
    { code: 'interface U {_:T; b:T; a?:T;} // asc, natural, insensitive, required', options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }] },
    { code: 'interface U {a:T; c:T; b?:T;}', options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }] },
    { code: 'interface U {b:T; b_:T; a?:T;}', options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }] },
    { code: 'interface U {C:T; c:T; b_?:T;}', options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }] },
    { code: 'interface U {c:T; C:T; b_?:T;}', options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }] },
    { code: 'interface U {$:T; _:T; A?:T; a?:T;}', options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }] },
    { code: "interface U {1:T; '11':T; A:T; 2?:T;}", options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }] },
    { code: "interface U {'Z':T; À:T; è:T; '#'?:T;}", options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }] },

    // desc
    { code: 'interface U {b:T; a:T; _:T;} // desc', options: ['desc'] },
    { code: 'interface U {c:T; b:T; a:T;}', options: ['desc'] },
    { code: 'interface U {b_:T; b:T; a:T;}', options: ['desc'] },
    { code: 'interface U {c:T; b_:T; C:T;}', options: ['desc'] },
    { code: 'interface U {a:T; _:T; A:T; $:T;}', options: ['desc'] },
    { code: "interface U {A:T; 2:T; '11':T; 1:T;}", options: ['desc'] },
    { code: "interface U {è:T; À:T; 'Z':T; '#':T;}", options: ['desc'] },

    // desc, insensitive
    { code: 'interface U {b:T; a:T; _:T;} // desc, insensitive', options: ['desc', { caseSensitive: false }] },
    { code: 'interface U {c:T; b:T; a:T;}', options: ['desc', { caseSensitive: false }] },
    { code: 'interface U {b_:T; b:T; a:T;}', options: ['desc', { caseSensitive: false }] },
    { code: 'interface U {c:T; C:T; b_:T;}', options: ['desc', { caseSensitive: false }] },
    { code: 'interface U {C:T; c:T; b_:T;}', options: ['desc', { caseSensitive: false }] },
    { code: 'interface U {a:T; A:T; _:T; $:T;}', options: ['desc', { caseSensitive: false }] },
    { code: "interface U {A:T; 2:T; '11':T; 1:T;}", options: ['desc', { caseSensitive: false }] },
    { code: "interface U {è:T; À:T; 'Z':T; '#':T;}", options: ['desc', { caseSensitive: false }] },

    // desc, natural
    { code: 'interface U {b:T; a:T; _:T;} // desc, natural', options: ['desc', { natural: true }] },
    { code: 'interface U {c:T; b:T; a:T;}', options: ['desc', { natural: true }] },
    { code: 'interface U {b_:T; b:T; a:T;}', options: ['desc', { natural: true }] },
    { code: 'interface U {c:T; b_:T; C:T;}', options: ['desc', { natural: true }] },
    { code: 'interface U {a:T; A:T; _:T; $:T;}', options: ['desc', { natural: true }] },
    { code: "interface U {A:T; '11':T; 2:T; 1:T;}", options: ['desc', { natural: true }] },
    { code: "interface U {è:T; À:T; 'Z':T; '#':T;}", options: ['desc', { natural: true }] },

    // desc, natural, insensitive
    { code: 'interface U {b:T; a:T; _:T;} // desc, natural, insensitive', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {c:T; b:T; a:T;}', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {b_:T; b:T; a:T;}', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {c:T; C:T; b_:T;}', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {C:T; c:T; b_:T;}', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {a:T; A:T; _:T; $:T;}', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: "interface U {A:T; '11':T; 2:T; 1:T;}", options: ['desc', { natural: true, caseSensitive: false }] },
    { code: "interface U {è:T; À:T; 'Z':T; '#':T;}", options: ['desc', { natural: true, caseSensitive: false }] },

    // desc, natural, insensitive, required
    { code: 'interface U {b:T; _:T; a?:T;} // desc, natural, insensitive, required', options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }] },
    { code: 'interface U {c:T; a:T; b?:T;}', options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }] },
    { code: 'interface U {b_:T; b:T; a?:T;}', options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }] },
    { code: 'interface U {c:T; C:T; b_?:T;}', options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }] },
    { code: 'interface U {C:T; c:T; b_?:T;}', options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }] },
    { code: 'interface U {_:T; $:T; a?:T; A?:T;}', options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }] },
    { code: "interface U { A:T; '11':T; 1:T; 2?:T;}", options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }] },
    { code: "interface U {è:T; 'Z':T; À?:T; '#'?:T;}", options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }] },

    // index signatures
    { code: 'interface U<T> { [nkey: number]: T; [skey: string]: T; $: T; A: T; _: T; a: T; }', options: ['asc'] },
    { code: 'interface U<T> { a: T; _: T; A: T; $: T; [skey: string]: T; [nkey: number]: T; }', options: ['desc'] },
  ],

  invalid: [
    // default (asc)
    {
      code: 'interface U {a:T; _:T; b:T;}',
      errors: ["Expected interface keys to be in ascending order. '_' should be before 'a'."],
      output: 'interface U {_:T; a:T; b:T;}',
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      errors: ["Expected interface keys to be in ascending order. 'b' should be before 'c'."],
      output: 'interface U {a:T; b:T; c:T;}',
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      errors: ["Expected interface keys to be in ascending order. 'a' should be before 'b_'."],
      output: 'interface U {a:T; b_:T; b:T;}',
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      errors: ["Expected interface keys to be in ascending order. 'C' should be before 'c'."],
      output: 'interface U {C:T; c:T; b_:T;}',
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      errors: ["Expected interface keys to be in ascending order. 'A' should be before '_'."],
      output: 'interface U {$:T; A:T; _:T; a:T;}',
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      errors: ["Expected interface keys to be in ascending order. '11' should be before 'A'."],
      output: "interface U {1:T; '11':T; A:T; 2:T;}",
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      errors: ["Expected interface keys to be in ascending order. 'Z' should be before 'À'."],
      output: "interface U {'#':T; 'Z':T; À:T; è:T;}",
    },

    // methods
    {
      code: "interface U {1:T; 2:T; A():T; '11':T;}",
      errors: ["Expected interface keys to be in ascending order. '11' should be before 'A'."],
      output: "interface U {1:T; '11':T; A():T; 2:T;}",
    },
    {
      code: "interface U {'#'():T; À():T; 'Z':T; è:T;}",
      errors: ["Expected interface keys to be in ascending order. 'Z' should be before 'À'."],
      output: "interface U {'#'():T; 'Z':T; À():T; è:T;}",
    },

    // not ignore simple computed properties.
    {
      code: 'interface U {a:T; b:T; ["a"]:T; c:T;}',
      errors: ["Expected interface keys to be in ascending order. 'a' should be before 'b'."],
      output: 'interface U {a:T; ["a"]:T; b:T; c:T;}',
    },

    // nested
    {
      code: 'interface U {a:T; c:{y:T; x:T;}, b:T;}',
      errors: ["Expected interface keys to be in ascending order. 'x' should be before 'y'.", "Expected interface keys to be in ascending order. 'b' should be before 'c'."],
      output: 'interface U {a:T; b:T; c:{y:T; x:T;}}',
    },
    {
      code: 'type U = {a:T; c:{y:T; x:T;}, b:T;}',
      errors: ["Expected interface keys to be in ascending order. 'x' should be before 'y'.", "Expected interface keys to be in ascending order. 'b' should be before 'c'."],
      output: 'type U = {a:T; b:T; c:{y:T; x:T;}}',
    },

    // asc
    {
      code: 'interface U {a:T; _:T; b:T;} // asc',
      options: ['asc'],
      errors: ["Expected interface keys to be in ascending order. '_' should be before 'a'."],
      output: 'interface U {_:T; a:T; b:T;} // asc',
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['asc'],
      errors: ["Expected interface keys to be in ascending order. 'b' should be before 'c'."],
      output: 'interface U {a:T; b:T; c:T;}',
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['asc'],
      errors: ["Expected interface keys to be in ascending order. 'a' should be before 'b_'."],
      output: 'interface U {a:T; b_:T; b:T;}',
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      options: ['asc'],
      errors: ["Expected interface keys to be in ascending order. 'C' should be before 'c'."],
      output: 'interface U {C:T; c:T; b_:T;}',
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      options: ['asc'],
      errors: ["Expected interface keys to be in ascending order. 'A' should be before '_'."],
      output: 'interface U {$:T; A:T; _:T; a:T;}',
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      options: ['asc'],
      errors: ["Expected interface keys to be in ascending order. '11' should be before 'A'."],
      output: "interface U {1:T; '11':T; A:T; 2:T;}",
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['asc'],
      errors: ["Expected interface keys to be in ascending order. 'Z' should be before 'À'."],
      output: "interface U {'#':T; 'Z':T; À:T; è:T;}",
    },

    // asc, insensitive
    {
      code: 'interface U {a:T; _:T; b:T;} // asc, insensitive',
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive ascending order. '_' should be before 'a'."],
      output: 'interface U {_:T; a:T; b:T;} // asc, insensitive',
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive ascending order. 'b' should be before 'c'."],
      output: 'interface U {a:T; b:T; c:T;}',
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive ascending order. 'a' should be before 'b_'."],
      output: 'interface U {a:T; b_:T; b:T;}',
    },
    {
      code: 'interface U {$:T; A:T; _:T; a:T;}',
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive ascending order. '_' should be before 'A'."],
      output: 'interface U {$:T; _:T; A:T; a:T;}',
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive ascending order. '11' should be before 'A'."],
      output: "interface U {1:T; '11':T; A:T; 2:T;}",
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive ascending order. 'Z' should be before 'À'."],
      output: "interface U {'#':T; 'Z':T; À:T; è:T;}",
    },

    // asc, natural
    {
      code: 'interface U {a:T; _:T; b:T;} // asc, natural',
      options: ['asc', { natural: true }],
      errors: ["Expected interface keys to be in natural ascending order. '_' should be before 'a'."],
      output: 'interface U {_:T; a:T; b:T;} // asc, natural',
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['asc', { natural: true }],
      errors: ["Expected interface keys to be in natural ascending order. 'b' should be before 'c'."],
      output: 'interface U {a:T; b:T; c:T;}',
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['asc', { natural: true }],
      errors: ["Expected interface keys to be in natural ascending order. 'a' should be before 'b_'."],
      output: 'interface U {a:T; b_:T; b:T;}',
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      options: ['asc', { natural: true }],
      errors: ["Expected interface keys to be in natural ascending order. 'C' should be before 'c'."],
      output: 'interface U {C:T; c:T; b_:T;}',
    },
    {
      code: 'interface U {$:T; A:T; _:T; a:T;}',
      options: ['asc', { natural: true }],
      errors: ["Expected interface keys to be in natural ascending order. '_' should be before 'A'."],
      output: 'interface U {$:T; _:T; A:T; a:T;}',
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      options: ['asc', { natural: true }],
      errors: ["Expected interface keys to be in natural ascending order. '11' should be before 'A'."],
      output: "interface U {1:T; 2:T; '11':T; A:T;}",
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['asc', { natural: true }],
      errors: ["Expected interface keys to be in natural ascending order. 'Z' should be before 'À'."],
      output: "interface U {'#':T; 'Z':T; À:T; è:T;}",
    },

    // asc, natural, insensitive
    {
      code: 'interface U {a:T; _:T; b:T;} // asc, natural, insensitive',
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive ascending order. '_' should be before 'a'."],
      output: 'interface U {_:T; a:T; b:T;} // asc, natural, insensitive',
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive ascending order. 'b' should be before 'c'."],
      output: 'interface U {a:T; b:T; c:T;}',
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive ascending order. 'a' should be before 'b_'."],
      output: 'interface U {a:T; b_:T; b:T;}',
    },
    {
      code: 'interface U {$:T; A:T; _:T; a:T;}',
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive ascending order. '_' should be before 'A'."],
      output: 'interface U {$:T; _:T; A:T; a:T;}',
    },
    {
      code: "interface U {1:T; '11':T; 2:T; A:T;}",
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive ascending order. '2' should be before '11'."],
      output: "interface U {1:T; 2:T; '11':T; A:T;}",
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive ascending order. 'Z' should be before 'À'."],
      output: "interface U {'#':T; 'Z':T; À:T; è:T;}",
    },

    // asc, natural, insensitive, required
    {
      code: 'interface U {_:T; a?:T; b:T;} // asc, natural, insensitive, required',
      options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: ["Expected interface keys to be in required first natural insensitive ascending order. 'b' should be before 'a'."],
      output: 'interface U {_:T; b:T; a?:T;} // asc, natural, insensitive, required',
    },
    {
      code: 'interface U {a:T; b?:T; c:T;}',
      options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: ["Expected interface keys to be in required first natural insensitive ascending order. 'c' should be before 'b'."],
      output: 'interface U {a:T; c:T; b?:T;}',
    },
    {
      code: 'interface U {b:T; a?:T; b_:T;}',
      options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: ["Expected interface keys to be in required first natural insensitive ascending order. 'b_' should be before 'a'."],
      output: 'interface U {b:T; b_:T; a?:T;}',
    },
    {
      code: 'interface U {C:T; b_?:T; c:T;}',
      options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: ["Expected interface keys to be in required first natural insensitive ascending order. 'c' should be before 'b_'."],
      output: 'interface U {C:T; c:T; b_?:T;}',
    },
    {
      code: 'interface U {C:T; b_?:T; c:T;}',
      options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: ["Expected interface keys to be in required first natural insensitive ascending order. 'c' should be before 'b_'."],
      output: 'interface U {C:T; c:T; b_?:T;}',
    },
    {
      code: 'interface U {$:T; A?:T; _:T; a?:T;}',
      options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: ["Expected interface keys to be in required first natural insensitive ascending order. '_' should be before 'A'."],
      output: 'interface U {$:T; _:T; A?:T; a?:T;}',
    },
    {
      code: "interface U {1:T; '11':T; 2?:T; A:T;}",
      options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: ["Expected interface keys to be in required first natural insensitive ascending order. 'A' should be before '2'."],
      output: "interface U {1:T; '11':T; A:T; 2?:T;}",
    },
    {
      code: "interface U {'Z':T; À:T; '#'?:T; è:T;}",
      options: ['asc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: ["Expected interface keys to be in required first natural insensitive ascending order. 'è' should be before '#'."],
      output: "interface U {'Z':T; À:T; è:T; '#'?:T;}",
    },

    // desc
    {
      code: 'interface U {a:T; _:T; b:T;} // desc',
      options: ['desc'],
      errors: ["Expected interface keys to be in descending order. 'b' should be before '_'."],
      output: 'interface U {b:T; _:T; a:T;} // desc',
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['desc'],
      errors: ["Expected interface keys to be in descending order. 'c' should be before 'a'."],
      output: 'interface U {c:T; a:T; b:T;}',
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['desc'],
      errors: ["Expected interface keys to be in descending order. 'b' should be before 'a'."],
      output: 'interface U {b_:T; b:T; a:T;}',
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      options: ['desc'],
      errors: ["Expected interface keys to be in descending order. 'c' should be before 'b_'."],
      output: 'interface U {c:T; b_:T; C:T;}',
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      options: ['desc'],
      errors: ["Expected interface keys to be in descending order. '_' should be before '$'.", "Expected interface keys to be in descending order. 'a' should be before 'A'."],
      output: 'interface U {a:T; _:T; A:T; $:T;}',
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      options: ['desc'],
      errors: ["Expected interface keys to be in descending order. '2' should be before '1'.", "Expected interface keys to be in descending order. 'A' should be before '2'."],
      output: "interface U {A:T; 2:T; 1:T; '11':T;}",
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['desc'],
      errors: ["Expected interface keys to be in descending order. 'À' should be before '#'.", "Expected interface keys to be in descending order. 'è' should be before 'Z'."],
      output: "interface U {è:T; À:T; 'Z':T; '#':T;}",
    },

    // desc, insensitive
    {
      code: 'interface U {a:T; _:T; b:T;} // desc, insensitive',
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive descending order. 'b' should be before '_'."],
      output: 'interface U {b:T; _:T; a:T;} // desc, insensitive',
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive descending order. 'c' should be before 'a'."],
      output: 'interface U {c:T; a:T; b:T;}',
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive descending order. 'b' should be before 'a'."],
      output: 'interface U {b_:T; b:T; a:T;}',
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive descending order. 'c' should be before 'b_'."],
      output: 'interface U {c:T; b_:T; C:T;}',
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive descending order. '_' should be before '$'.", "Expected interface keys to be in insensitive descending order. 'A' should be before '_'."],
      output: 'interface U {A:T; _:T; $:T; a:T;}',
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive descending order. '2' should be before '1'.", "Expected interface keys to be in insensitive descending order. 'A' should be before '2'."],
      output: "interface U {A:T; 2:T; 1:T; '11':T;}",
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive descending order. 'À' should be before '#'.", "Expected interface keys to be in insensitive descending order. 'è' should be before 'Z'."],
      output: "interface U {è:T; À:T; 'Z':T; '#':T;}",
    },

    // desc, natural
    {
      code: 'interface U {a:T; _:T; b:T;} // desc, natural',
      options: ['desc', { natural: true }],
      errors: ["Expected interface keys to be in natural descending order. 'b' should be before '_'."],
      output: 'interface U {b:T; _:T; a:T;} // desc, natural',
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['desc', { natural: true }],
      errors: ["Expected interface keys to be in natural descending order. 'c' should be before 'a'."],
      output: 'interface U {c:T; a:T; b:T;}',
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['desc', { natural: true }],
      errors: ["Expected interface keys to be in natural descending order. 'b' should be before 'a'."],
      output: 'interface U {b_:T; b:T; a:T;}',
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      options: ['desc', { natural: true }],
      errors: ["Expected interface keys to be in natural descending order. 'c' should be before 'b_'."],
      output: 'interface U {c:T; b_:T; C:T;}',
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      options: ['desc', { natural: true }],
      errors: [
        "Expected interface keys to be in natural descending order. '_' should be before '$'.",
        "Expected interface keys to be in natural descending order. 'A' should be before '_'.",
        "Expected interface keys to be in natural descending order. 'a' should be before 'A'.",
      ],
      output: 'interface U {a:T; _:T; A:T; $:T;}',
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      options: ['desc', { natural: true }],
      errors: ["Expected interface keys to be in natural descending order. '2' should be before '1'.", "Expected interface keys to be in natural descending order. 'A' should be before '2'."],
      output: "interface U {A:T; 2:T; 1:T; '11':T;}",
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['desc', { natural: true }],
      errors: ["Expected interface keys to be in natural descending order. 'À' should be before '#'.", "Expected interface keys to be in natural descending order. 'è' should be before 'Z'."],
      output: "interface U {è:T; À:T; 'Z':T; '#':T;}",
    },

    // desc, natural, insensitive
    {
      code: 'interface U {a:T; _:T; b:T;} // desc, natural, insensitive',
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive descending order. 'b' should be before '_'."],
      output: 'interface U {b:T; _:T; a:T;} // desc, natural, insensitive',
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive descending order. 'c' should be before 'a'."],
      output: 'interface U {c:T; a:T; b:T;}',
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive descending order. 'b' should be before 'a'."],
      output: 'interface U {b_:T; b:T; a:T;}',
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive descending order. 'c' should be before 'b_'."],
      output: 'interface U {c:T; b_:T; C:T;}',
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: [
        "Expected interface keys to be in natural insensitive descending order. '_' should be before '$'.",
        "Expected interface keys to be in natural insensitive descending order. 'A' should be before '_'.",
      ],
      output: 'interface U {A:T; _:T; $:T; a:T;}',
    },
    {
      code: "interface U {1:T; 2:T; '11':T; A:T;}",
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: [
        "Expected interface keys to be in natural insensitive descending order. '2' should be before '1'.",
        "Expected interface keys to be in natural insensitive descending order. '11' should be before '2'.",
        "Expected interface keys to be in natural insensitive descending order. 'A' should be before '11'.",
      ],
      output: "interface U {A:T; 2:T; '11':T; 1:T;}",
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: [
        "Expected interface keys to be in natural insensitive descending order. 'À' should be before '#'.",
        "Expected interface keys to be in natural insensitive descending order. 'è' should be before 'Z'.",
      ],
      output: "interface U {è:T; À:T; 'Z':T; '#':T;}",
    },

    // desc, natural, insensitive, required
    {
      code: 'interface U {_:T; a?:T; b:T;} // desc, natural, insensitive, required',
      options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: ["Expected interface keys to be in required first natural insensitive descending order. 'b' should be before 'a'."],
      output: 'interface U {b:T; a?:T; _:T;} // desc, natural, insensitive, required',
    },
    {
      code: 'interface U {b:T; a?:T; _:T;}',
      options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: ["Expected interface keys to be in required first natural insensitive descending order. '_' should be before 'a'."],
      output: 'interface U {b:T; _:T; a?:T;}',
    },
    {
      code: 'interface U {b:T; b_:T; a?:T;}',
      options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: ["Expected interface keys to be in required first natural insensitive descending order. 'b_' should be before 'b'."],
      output: 'interface U {b_:T; b:T; a?:T;}',
    },
    {
      code: 'interface U {c:T; b_?:T; C:T;}',
      options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: ["Expected interface keys to be in required first natural insensitive descending order. 'C' should be before 'b_'."],
      output: 'interface U {c:T; C:T; b_?:T;}',
    },
    {
      code: 'interface U {b_?:T; C:T; c:T;}',
      options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: ["Expected interface keys to be in required first natural insensitive descending order. 'C' should be before 'b_'."],
      output: 'interface U {C:T; b_?:T; c:T;}',
    },
    {
      code: 'interface U {_:T; a?:T; $:T; A?:T;}',
      options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: ["Expected interface keys to be in required first natural insensitive descending order. '$' should be before 'a'."],
      output: 'interface U {_:T; $:T; a?:T; A?:T;}',
    },
    {
      code: "interface U {2?:T; A:T; 1:T; '11':T;}",
      options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: [
        "Expected interface keys to be in required first natural insensitive descending order. 'A' should be before '2'.",
        "Expected interface keys to be in required first natural insensitive descending order. '11' should be before '1'.",
      ],
      output: "interface U {A:T; 2?:T; 1:T; '11':T;}",
    },
    {
      code: "interface U {è:T; 'Z':T; '#'?:T; À?:T;}",
      options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: ["Expected interface keys to be in required first natural insensitive descending order. 'À' should be before '#'."],
      output: "interface U {è:T; 'Z':T; À?:T; '#'?:T;}",
    },
    {
      code: "interface U {À?:T; 'Z':T; '#'?:T; è:T;}",
      options: ['desc', { natural: true, caseSensitive: false, requiredFirst: true }],
      errors: [
        "Expected interface keys to be in required first natural insensitive descending order. 'Z' should be before 'À'.",
        "Expected interface keys to be in required first natural insensitive descending order. 'è' should be before '#'.",
      ],
      output: "interface U {è:T; 'Z':T; '#'?:T; À?:T;}",
    },

    // index signatures
    {
      code: 'interface U<T> { A: T; [skey: string]: T; _: T; }',
      options: ['asc'],
      errors: ["Expected interface keys to be in ascending order. '[index: skey]' should be before 'A'."],
      output: 'interface U<T> { [skey: string]: T; A: T; _: T; }',
    },
    {
      code: 'interface U<T> { _: T; [skey: string]: T; A: T; }',
      options: ['desc'],
      errors: ["Expected interface keys to be in descending order. 'A' should be before '[index: skey]'."],
      output: 'interface U<T> { _: T; A: T; [skey: string]: T; }',
    },
  ],
});
