const { RuleTester } = require('eslint');

const rule = require('../../../lib/rules/string-enum');

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('string-enum', rule, {
  valid: [
    // ignores
    { code: 'enum U {c, b, a} // ignores' },
    { code: 'enum U {c=a(), b, a}' },
    { code: 'enum U {c=0, b, a}' },
    { code: 'enum U {c=3, b, a}' },
    { code: 'enum U {c=1<<1, b, a}' },
    { code: 'enum U {c=M|N, b, a}' },
    { code: 'enum U {c="123".length, b, a}' },
    { code: 'enum U {c=0, b="b", a}' },
    { code: 'const enum U {A=1, B=A*2}' },

    // default (asc)
    { code: 'enum U {_="a", a="b", b="c"} // default (asc)' },
    { code: 'enum U {a="a", b="b", c="c"}' },
    { code: 'enum U {a="a", b="b", b_="c"}' },
    { code: 'enum U {C="a", b_="b", c="c"}' },
    { code: 'enum U {$="a", A="b", _="c", a="d"}' },
    { code: "enum U {'#'='a', 'Z'='b', À='c', è='d'}" },

    // computed
    { code: '{a="T", ["aa"]="T", b="T", c="T"}' },

    // asc
    { code: 'enum U {_="T", a="T", b="T"} // asc', options: ['asc'] },
    { code: 'enum U {a="T", b="T", c="T"}', options: ['asc'] },
    { code: 'enum U {a="T", b="T", b_="T"}', options: ['asc'] },
    { code: 'enum U {C="T", b_="T", c="T"}', options: ['asc'] },
    { code: 'enum U {$="T", A="T", _="T", a="T"}', options: ['asc'] },
    { code: "enum U {'#'='T', 'Z'='T', À='T', è='T'}", options: ['asc'] },

    // asc, insensitive
    { code: 'enum U {_="T", a="T", b="T"} // asc, insensitive', options: ['asc', { caseSensitive: false }] },
    { code: 'enum U {a="T", b="T", c="T"}', options: ['asc', { caseSensitive: false }] },
    { code: 'enum U {a="T", b="T", b_="T"}', options: ['asc', { caseSensitive: false }] },
    { code: 'enum U {b_="T", C="T", c="T"}', options: ['asc', { caseSensitive: false }] },
    { code: 'enum U {b_="T", c="T", C="T"}', options: ['asc', { caseSensitive: false }] },
    { code: 'enum U {$="T", _="T", A="T", a="T"}', options: ['asc', { caseSensitive: false }] },
    { code: "enum U {'#'='T', 'Z'='T', À='T', è='T'}", options: ['asc', { natural: true }] },

    // asc, natural, insensitive
    { code: 'enum U {_="T", a="T", b="T"} // asc, natural, insensitive', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: 'enum U {a="T", b="T", c="T"}', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: 'enum U {a="T", b="T", b_="T"}', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: 'enum U {b_="T", C="T", c="T"}', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: 'enum U {b_="T", c="T", C="T"}', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: 'enum U {$="T", _="T", A="T", a="T"}', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: "enum U {'#'='T', 'Z'='T', À='T', è='T'}", options: ['asc', { natural: true, caseSensitive: false }] },

    // desc
    { code: 'enum U {b="T", a="T", _="T"} // desc', options: ['desc'] },
    { code: 'enum U {c="T", b="T", a="T"}', options: ['desc'] },
    { code: 'enum U {b_="T", b="T", a="T"}', options: ['desc'] },
    { code: 'enum U {c="T", b_="T", C="T"}', options: ['desc'] },
    { code: 'enum U {a="T", _="T", A="T", $="T"}', options: ['desc'] },
    { code: "enum U {è='T', À='T', 'Z'='T', '#'='T'}", options: ['desc'] },

    // desc, insensitive
    { code: 'enum U {b="T", a="T", _="T"} // desc, insensitive', options: ['desc', { caseSensitive: false }] },
    { code: 'enum U {c="T", b="T", a="T"}', options: ['desc', { caseSensitive: false }] },
    { code: 'enum U {b_="T", b="T", a="T"}', options: ['desc', { caseSensitive: false }] },
    { code: 'enum U {c="T", C="T", b_="T"}', options: ['desc', { caseSensitive: false }] },
    { code: 'enum U {C="T", c="T", b_="T"}', options: ['desc', { caseSensitive: false }] },
    { code: 'enum U {a="T", A="T", _="T", $="T"}', options: ['desc', { caseSensitive: false }] },
    { code: "enum U {è='T', À='T', 'Z'='T', '#'='T'}", options: ['desc', { caseSensitive: false }] },

    // desc, natural
    { code: 'enum U {b="T", a="T", _="T"} // desc, natural', options: ['desc', { natural: true }] },
    { code: 'enum U {c="T", b="T", a="T"}', options: ['desc', { natural: true }] },
    { code: 'enum U {b_="T", b="T", a="T"}', options: ['desc', { natural: true }] },
    { code: 'enum U {c="T", b_="T", C="T"}', options: ['desc', { natural: true }] },
    { code: 'enum U {a="T", A="T", _="T", $="T"}', options: ['desc', { natural: true }] },
    { code: "enum U {è='T', À='T', 'Z'='T', '#'='T'}", options: ['desc', { natural: true }] },

    // desc, natural, insensitive
    { code: 'enum U {b="T", a="T", _="T"} // desc, natural, insensitive', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: 'enum U {c="T", b="T", a="T"}', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: 'enum U {b_="T", b="T", a="T"}', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: 'enum U {c="T", C="T", b_="T"}', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: 'enum U {C="T", c="T", b_="T"}', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: 'enum U {a="T", A="T", _="T", $="T"}', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: "enum U {è='T', À='T', 'Z'='T', '#'='T'}", options: ['desc', { natural: true, caseSensitive: false }] },
  ],

  invalid: [
    // default (asc)
    {
      code: 'enum U {a="a", _="b", b="c"}',
      errors: ["Expected string enum members to be in ascending order. '_' should be before 'a'."],
      output: 'enum U {_="b", a="a", b="c"}',
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      errors: ["Expected string enum members to be in ascending order. 'b' should be before 'c'."],
      output: 'enum U {a="T", b="T", c="T"}',
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      errors: ["Expected string enum members to be in ascending order. 'a' should be before 'b_'."],
      output: 'enum U {a="T", b_="T", b="T"}',
    },
    {
      code: 'enum U {b_="T", c="T", C="T"}',
      errors: ["Expected string enum members to be in ascending order. 'C' should be before 'c'."],
      output: 'enum U {C="T", c="T", b_="T",}',
    },
    {
      code: 'enum U {$="T", _="T", A="T", a="T"}',
      errors: ["Expected string enum members to be in ascending order. 'A' should be before '_'."],
      output: 'enum U {$="T", A="T", _="T", a="T"}',
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      errors: ["Expected string enum members to be in ascending order. 'Z' should be before 'À'."],
      output: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
    },

    // not ignore simple computed properties.
    {
      code: 'enum U {a="T", b="T", ["aa"]="T", c="T"}',
      errors: ["Expected string enum members to be in ascending order. 'aa' should be before 'b'."],
      output: 'enum U {a="T", ["aa"]="T", b="T", c="T"}',
    },

    // asc
    {
      code: 'enum U {a="T", _="T", b="T"} // asc',
      options: ['asc'],
      errors: ["Expected string enum members to be in ascending order. '_' should be before 'a'."],
      output: 'enum U {_="T", a="T", b="T"} // asc',
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      options: ['asc'],
      errors: ["Expected string enum members to be in ascending order. 'b' should be before 'c'."],
      output: 'enum U {a="T", b="T", c="T"}',
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      options: ['asc'],
      errors: ["Expected string enum members to be in ascending order. 'a' should be before 'b_'."],
      output: 'enum U {a="T", b_="T", b="T"}',
    },
    {
      code: 'enum U {b_="T", c="T", C="T"}',
      options: ['asc'],
      errors: ["Expected string enum members to be in ascending order. 'C' should be before 'c'."],
      output: 'enum U {C="T", c="T", b_="T",}',
    },
    {
      code: 'enum U {$="T", _="T", A="T", a="T"}',
      options: ['asc'],
      errors: ["Expected string enum members to be in ascending order. 'A' should be before '_'."],
      output: 'enum U {$="T", A="T", _="T", a="T"}',
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      options: ['asc'],
      errors: ["Expected string enum members to be in ascending order. 'Z' should be before 'À'."],
      output: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
    },

    // asc, insensitive
    {
      code: 'enum U {a="T", _="T", b="T"} // asc, insensitive',
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected string enum members to be in insensitive ascending order. '_' should be before 'a'."],
      output: 'enum U {_="T", a="T", b="T"} // asc, insensitive',
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected string enum members to be in insensitive ascending order. 'b' should be before 'c'."],
      output: 'enum U {a="T", b="T", c="T"}',
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected string enum members to be in insensitive ascending order. 'a' should be before 'b_'."],
      output: 'enum U {a="T", b_="T", b="T"}',
    },
    {
      code: 'enum U {$="T", A="T", _="T", a="T"}',
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected string enum members to be in insensitive ascending order. '_' should be before 'A'."],
      output: 'enum U {$="T", _="T", A="T", a="T"}',
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected string enum members to be in insensitive ascending order. 'Z' should be before 'À'."],
      output: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
    },

    // asc, natural
    {
      code: 'enum U {a="T", _="T", b="T"} // asc, natural',
      options: ['asc', { natural: true }],
      errors: ["Expected string enum members to be in natural ascending order. '_' should be before 'a'."],
      output: 'enum U {_="T", a="T", b="T"} // asc, natural',
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      options: ['asc', { natural: true }],
      errors: ["Expected string enum members to be in natural ascending order. 'b' should be before 'c'."],
      output: 'enum U {a="T", b="T", c="T"}',
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      options: ['asc', { natural: true }],
      errors: ["Expected string enum members to be in natural ascending order. 'a' should be before 'b_'."],
      output: 'enum U {a="T", b_="T", b="T"}',
    },
    {
      code: 'enum U {b_="T", c="T", C="T"}',
      options: ['asc', { natural: true }],
      errors: ["Expected string enum members to be in natural ascending order. 'C' should be before 'c'."],
      output: 'enum U {C="T", c="T", b_="T",}',
    },
    {
      code: 'enum U {$="T", A="T", _="T", a="T"}',
      options: ['asc', { natural: true }],
      errors: ["Expected string enum members to be in natural ascending order. '_' should be before 'A'."],
      output: 'enum U {$="T", _="T", A="T", a="T"}',
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      options: ['asc', { natural: true }],
      errors: ["Expected string enum members to be in natural ascending order. 'Z' should be before 'À'."],
      output: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
    },

    // asc, natural, insensitive
    {
      code: 'enum U {a="T", _="T", b="T"} // asc, natural, insensitive',
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected string enum members to be in natural insensitive ascending order. '_' should be before 'a'."],
      output: 'enum U {_="T", a="T", b="T"} // asc, natural, insensitive',
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected string enum members to be in natural insensitive ascending order. 'b' should be before 'c'."],
      output: 'enum U {a="T", b="T", c="T"}',
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected string enum members to be in natural insensitive ascending order. 'a' should be before 'b_'."],
      output: 'enum U {a="T", b_="T", b="T"}',
    },
    {
      code: 'enum U {$="T", A="T", _="T", a="T"}',
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected string enum members to be in natural insensitive ascending order. '_' should be before 'A'."],
      output: 'enum U {$="T", _="T", A="T", a="T"}',
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected string enum members to be in natural insensitive ascending order. 'Z' should be before 'À'."],
      output: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
    },

    // desc
    {
      code: 'enum U {a="T", _="T", b="T"} // desc',
      options: ['desc'],
      errors: ["Expected string enum members to be in descending order. 'b' should be before '_'."],
      output: 'enum U {b="T", _="T", a="T",} // desc',
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      options: ['desc'],
      errors: ["Expected string enum members to be in descending order. 'c' should be before 'a'."],
      output: 'enum U {c="T", a="T", b="T"}',
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      options: ['desc'],
      errors: ["Expected string enum members to be in descending order. 'b' should be before 'a'."],
      output: 'enum U {b_="T", b="T", a="T"}',
    },
    {
      code: 'enum U {b_="T", c="T", C="T"}',
      options: ['desc'],
      errors: ["Expected string enum members to be in descending order. 'c' should be before 'b_'."],
      output: 'enum U {c="T", b_="T", C="T"}',
    },
    {
      code: 'enum U {$="T", _="T", A="T", a="T"}',
      options: ['desc'],
      errors: ["Expected string enum members to be in descending order. '_' should be before '$'.", "Expected string enum members to be in descending order. 'a' should be before 'A'."],
      output: 'enum U {a="T", _="T", A="T", $="T"}',
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      options: ['desc'],
      errors: ["Expected string enum members to be in descending order. 'À' should be before '#'.", "Expected string enum members to be in descending order. 'è' should be before 'Z'."],
      output: "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
    },

    // desc, insensitive
    {
      code: 'enum U {a="T", _="T", b="T"} // desc, insensitive',
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected string enum members to be in insensitive descending order. 'b' should be before '_'."],
      output: 'enum U {b="T", _="T", a="T",} // desc, insensitive',
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected string enum members to be in insensitive descending order. 'c' should be before 'a'."],
      output: 'enum U {c="T", a="T", b="T"}',
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected string enum members to be in insensitive descending order. 'b' should be before 'a'."],
      output: 'enum U {b_="T", b="T", a="T"}',
    },
    {
      code: 'enum U {b_="T", c="T", C="T"}',
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected string enum members to be in insensitive descending order. 'c' should be before 'b_'."],
      output: 'enum U {c="T", b_="T", C="T"}',
    },
    {
      code: 'enum U {$="T", _="T", A="T", a="T"}',
      options: ['desc', { caseSensitive: false }],
      errors: [
        "Expected string enum members to be in insensitive descending order. '_' should be before '$'.",
        "Expected string enum members to be in insensitive descending order. 'A' should be before '_'.",
      ],
      output: 'enum U {A="T", _="T", $="T", a="T"}',
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      options: ['desc', { caseSensitive: false }],
      errors: [
        "Expected string enum members to be in insensitive descending order. 'À' should be before '#'.",
        "Expected string enum members to be in insensitive descending order. 'è' should be before 'Z'.",
      ],
      output: "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
    },

    // desc, natural
    {
      code: 'enum U {a="T", _="T", b="T"} // desc, natural',
      options: ['desc', { natural: true }],
      errors: ["Expected string enum members to be in natural descending order. 'b' should be before '_'."],
      output: 'enum U {b="T", _="T", a="T",} // desc, natural',
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      options: ['desc', { natural: true }],
      errors: ["Expected string enum members to be in natural descending order. 'c' should be before 'a'."],
      output: 'enum U {c="T", a="T", b="T"}',
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      options: ['desc', { natural: true }],
      errors: ["Expected string enum members to be in natural descending order. 'b' should be before 'a'."],
      output: 'enum U {b_="T", b="T", a="T"}',
    },
    {
      code: 'enum U {b_="T", c="T", C="T"}',
      options: ['desc', { natural: true }],
      errors: ["Expected string enum members to be in natural descending order. 'c' should be before 'b_'."],
      output: 'enum U {c="T", b_="T", C="T"}',
    },
    {
      code: 'enum U {$="T", _="T", A="T", a="T"}',
      options: ['desc', { natural: true }],
      errors: [
        "Expected string enum members to be in natural descending order. '_' should be before '$'.",
        "Expected string enum members to be in natural descending order. 'A' should be before '_'.",
        "Expected string enum members to be in natural descending order. 'a' should be before 'A'.",
      ],
      output: 'enum U {a="T", _="T", A="T", $="T"}',
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      options: ['desc', { natural: true }],
      errors: [
        "Expected string enum members to be in natural descending order. 'À' should be before '#'.",
        "Expected string enum members to be in natural descending order. 'è' should be before 'Z'.",
      ],
      output: "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
    },

    // desc, natural, insensitive
    {
      code: 'enum U {a="T", _="T", b="T"} // desc, natural, insensitive',
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: ["Expected string enum members to be in natural insensitive descending order. 'b' should be before '_'."],
      output: 'enum U {b="T", _="T", a="T",} // desc, natural, insensitive',
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: ["Expected string enum members to be in natural insensitive descending order. 'c' should be before 'a'."],
      output: 'enum U {c="T", a="T", b="T"}',
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: ["Expected string enum members to be in natural insensitive descending order. 'b' should be before 'a'."],
      output: 'enum U {b_="T", b="T", a="T"}',
    },
    {
      code: 'enum U {b_="T", c="T", C="T"}',
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: ["Expected string enum members to be in natural insensitive descending order. 'c' should be before 'b_'."],
      output: 'enum U {c="T", b_="T", C="T"}',
    },
    {
      code: 'enum U {$="T", _="T", A="T", a="T"}',
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: [
        "Expected string enum members to be in natural insensitive descending order. '_' should be before '$'.",
        "Expected string enum members to be in natural insensitive descending order. 'A' should be before '_'.",
      ],
      output: 'enum U {A="T", _="T", $="T", a="T"}',
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: [
        "Expected string enum members to be in natural insensitive descending order. 'À' should be before '#'.",
        "Expected string enum members to be in natural insensitive descending order. 'è' should be before 'Z'.",
      ],
      output: "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
    },
  ],
});
