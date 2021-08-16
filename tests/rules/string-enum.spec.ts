import { Rule, RuleTester } from 'eslint'

import { rule, name, Options } from 'rules/string-enum'
import { SortingOrder } from 'common/options'
import { typescript } from '../helpers/configs'
import {
  InvalidTestCase,
  processInvalidTestCase,
  processValidTestCase,
  ValidTestCase,
} from '../helpers/util'

const valid: readonly ValidTestCase<Options>[] = [
  /**
   * ignores
   */
  { code: 'enum U {c, b, a}', optionsSet: [[]] },
  { code: 'enum U {c=a(), b, a}', optionsSet: [[]] },
  { code: 'enum U {c=0, b, a}', optionsSet: [[]] },
  { code: 'enum U {c=3, b, a}', optionsSet: [[]] },
  { code: 'enum U {c=1<<1, b, a}', optionsSet: [[]] },
  { code: 'enum U {c=M|N, b, a}', optionsSet: [[]] },
  { code: 'enum U {c="123".length, b, a}', optionsSet: [[]] },
  { code: 'enum U {c=0, b="b", a}', optionsSet: [[]] },
  { code: 'const enum U {A=1, B=A*2}', optionsSet: [[]] },

  /**
   * default (asc)
   */
  {
    code: 'enum U {_="a", a="b", b="c"}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {a="a", b="b", c="c"}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {a="a", b="b", b_="c"}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {C="a", b_="b", c="c"}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {$="a", A="b", _="c", a="d"}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: "enum U {'#'='a', 'Z'='b', À='c', è='d'}",
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },

  {
    code: 'enum U {_="T", a="T", b="T"}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {a="T", b="T", c="T"}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {a="T", b="T", b_="T"}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {C="T", b_="T", c="T"}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {$="T", A="T", _="T", a="T"}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },

  /**
   * computed
   */
  {
    code: '{a="T", ["aa"]="T", b="T", c="T"}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },

  /**
   * asc, insensitive
   */
  {
    code: 'enum U {_="T", a="T", b="T"}',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {a="T", b="T", c="T"}',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {a="T", b="T", b_="T"}',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {b_="T", C="T", c="T"}',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {b_="T", c="T", C="T"}',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {$="T", _="T", A="T", a="T"}',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },

  /**
   * asc, natural, insensitive
   */
  {
    code: 'enum U {_="T", a="T", b="T"}',
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {a="T", b="T", c="T"}',
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {a="T", b="T", b_="T"}',
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {b_="T", C="T", c="T"}',
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {b_="T", c="T", C="T"}',
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {$="T", _="T", A="T", a="T"}',
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },

  /**
   * desc
   */
  { code: 'enum U {b="T", a="T", _="T"}', optionsSet: [[SortingOrder.Descending]] },
  { code: 'enum U {c="T", b="T", a="T"}', optionsSet: [[SortingOrder.Descending]] },
  { code: 'enum U {b_="T", b="T", a="T"}', optionsSet: [[SortingOrder.Descending]] },
  { code: 'enum U {c="T", b_="T", C="T"}', optionsSet: [[SortingOrder.Descending]] },
  { code: 'enum U {a="T", _="T", A="T", $="T"}', optionsSet: [[SortingOrder.Descending]] },
  { code: "enum U {è='T', À='T', 'Z'='T', '#'='T'}", optionsSet: [[SortingOrder.Descending]] },

  /**
   * desc, insensitive
   */
  {
    code: 'enum U {b="T", a="T", _="T"}',
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {c="T", b="T", a="T"}',
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {b_="T", b="T", a="T"}',
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {c="T", C="T", b_="T"}',
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {C="T", c="T", b_="T"}',
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {a="T", A="T", _="T", $="T"}',
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },

  /**
   * desc, natural
   */
  {
    code: 'enum U {b="T", a="T", _="T"}',
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'enum U {c="T", b="T", a="T"}',
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'enum U {b_="T", b="T", a="T"}',
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'enum U {c="T", b_="T", C="T"}',
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'enum U {a="T", A="T", _="T", $="T"}',
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },

  /**
   * desc, natural, insensitive
   */
  {
    code: 'enum U {b="T", a="T", _="T"}',
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {c="T", b="T", a="T"}',
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {b_="T", b="T", a="T"}',
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {c="T", C="T", b_="T"}',
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {C="T", c="T", b_="T"}',
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {a="T", A="T", _="T", $="T"}',
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
]

const invalid: readonly InvalidTestCase<Options>[] = [
  /**
   * default (asc)
   */
  {
    code: 'enum U {a="a", _="b", b="c"}',
    output: 'enum U {_="b", a="a", b="c"}',
    errors: ["Expected string enum members to be in ascending order. '_' should be before 'a'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {a="T", c="T", b="T"}',
    output: 'enum U {a="T", b="T", c="T"}',
    errors: ["Expected string enum members to be in ascending order. 'b' should be before 'c'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {b_="T", a="T", b="T"}',
    output: 'enum U {a="T", b_="T", b="T"}',
    errors: ["Expected string enum members to be in ascending order. 'a' should be before 'b_'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {b_="T", c="T", C="T"}',
    output: 'enum U {C="T", c="T", b_="T",}',
    errors: ["Expected string enum members to be in ascending order. 'C' should be before 'c'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {$="T", _="T", A="T", a="T"}',
    output: 'enum U {$="T", A="T", _="T", a="T"}',
    errors: ["Expected string enum members to be in ascending order. 'A' should be before '_'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
    output: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
    errors: ["Expected string enum members to be in ascending order. 'Z' should be before 'À'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },

  /**
   * not ignore simple computed properties.
   */
  {
    code: 'enum U {a="T", b="T", ["aa"]="T", c="T"}',
    output: 'enum U {a="T", ["aa"]="T", b="T", c="T"}',
    errors: ["Expected string enum members to be in ascending order. 'aa' should be before 'b'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },

  /**
   * asc
   */
  {
    code: 'enum U {a="T", _="T", b="T"}',
    output: 'enum U {_="T", a="T", b="T"}',
    errors: ["Expected string enum members to be in ascending order. '_' should be before 'a'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {a="T", c="T", b="T"}',
    output: 'enum U {a="T", b="T", c="T"}',
    errors: ["Expected string enum members to be in ascending order. 'b' should be before 'c'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {b_="T", a="T", b="T"}',
    output: 'enum U {a="T", b_="T", b="T"}',
    errors: ["Expected string enum members to be in ascending order. 'a' should be before 'b_'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {b_="T", c="T", C="T"}',
    output: 'enum U {C="T", c="T", b_="T",}',
    errors: ["Expected string enum members to be in ascending order. 'C' should be before 'c'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'enum U {$="T", _="T", A="T", a="T"}',
    output: 'enum U {$="T", A="T", _="T", a="T"}',
    errors: ["Expected string enum members to be in ascending order. 'A' should be before '_'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
    output: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
    errors: ["Expected string enum members to be in ascending order. 'Z' should be before 'À'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },

  /**
   * asc, insensitive
   */
  {
    code: 'enum U {a="T", _="T", b="T"}',
    output: 'enum U {_="T", a="T", b="T"}',
    errors: [
      "Expected string enum members to be in insensitive ascending order. '_' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {a="T", c="T", b="T"}',
    output: 'enum U {a="T", b="T", c="T"}',
    errors: [
      "Expected string enum members to be in insensitive ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {b_="T", a="T", b="T"}',
    output: 'enum U {a="T", b_="T", b="T"}',
    errors: [
      "Expected string enum members to be in insensitive ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {$="T", A="T", _="T", a="T"}',
    output: 'enum U {$="T", _="T", A="T", a="T"}',
    errors: [
      "Expected string enum members to be in insensitive ascending order. '_' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
    output: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
    errors: [
      "Expected string enum members to be in insensitive ascending order. 'Z' should be before 'À'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },

  /**
   * asc, natural
   */
  {
    code: 'enum U {a="T", _="T", b="T"}',
    output: 'enum U {_="T", a="T", b="T"}',
    errors: [
      "Expected string enum members to be in natural ascending order. '_' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: 'enum U {a="T", c="T", b="T"}',
    output: 'enum U {a="T", b="T", c="T"}',
    errors: [
      "Expected string enum members to be in natural ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: 'enum U {b_="T", a="T", b="T"}',
    output: 'enum U {a="T", b_="T", b="T"}',
    errors: [
      "Expected string enum members to be in natural ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: 'enum U {b_="T", c="T", C="T"}',
    output: 'enum U {C="T", c="T", b_="T",}',
    errors: [
      "Expected string enum members to be in natural ascending order. 'C' should be before 'c'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: 'enum U {$="T", A="T", _="T", a="T"}',
    output: 'enum U {$="T", _="T", A="T", a="T"}',
    errors: [
      "Expected string enum members to be in natural ascending order. '_' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
    output: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
    errors: [
      "Expected string enum members to be in natural ascending order. 'Z' should be before 'À'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },

  /**
   * asc, natural, insensitive
   */
  {
    code: 'enum U {a="T", _="T", b="T"}',
    output: 'enum U {_="T", a="T", b="T"}',
    errors: [
      "Expected string enum members to be in natural insensitive ascending order. '_' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {a="T", c="T", b="T"}',
    output: 'enum U {a="T", b="T", c="T"}',
    errors: [
      "Expected string enum members to be in natural insensitive ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {b_="T", a="T", b="T"}',
    output: 'enum U {a="T", b_="T", b="T"}',
    errors: [
      "Expected string enum members to be in natural insensitive ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {$="T", A="T", _="T", a="T"}',
    output: 'enum U {$="T", _="T", A="T", a="T"}',
    errors: [
      "Expected string enum members to be in natural insensitive ascending order. '_' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
    output: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
    errors: [
      "Expected string enum members to be in natural insensitive ascending order. 'Z' should be before 'À'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },

  /**
   * desc
   */
  {
    code: 'enum U {a="T", _="T", b="T"}',
    output: 'enum U {b="T", _="T", a="T",}',
    errors: ["Expected string enum members to be in descending order. 'b' should be before '_'."],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'enum U {a="T", c="T", b="T"}',
    output: 'enum U {c="T", a="T", b="T"}',
    errors: ["Expected string enum members to be in descending order. 'c' should be before 'a'."],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'enum U {b_="T", a="T", b="T"}',
    output: 'enum U {b_="T", b="T", a="T"}',
    errors: ["Expected string enum members to be in descending order. 'b' should be before 'a'."],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'enum U {b_="T", c="T", C="T"}',
    output: 'enum U {c="T", b_="T", C="T"}',
    errors: ["Expected string enum members to be in descending order. 'c' should be before 'b_'."],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'enum U {$="T", _="T", A="T", a="T"}',
    output: 'enum U {a="T", _="T", A="T", $="T"}',
    errors: [
      "Expected string enum members to be in descending order. '_' should be before '$'.",
      "Expected string enum members to be in descending order. 'a' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
    output: "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
    errors: [
      "Expected string enum members to be in descending order. 'À' should be before '#'.",
      "Expected string enum members to be in descending order. 'è' should be before 'Z'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },

  /**
   * desc, insensitive
   */
  {
    code: 'enum U {a="T", _="T", b="T"}',
    output: 'enum U {b="T", _="T", a="T",}',
    errors: [
      "Expected string enum members to be in insensitive descending order. 'b' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {a="T", c="T", b="T"}',
    output: 'enum U {c="T", a="T", b="T"}',
    errors: [
      "Expected string enum members to be in insensitive descending order. 'c' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {b_="T", a="T", b="T"}',
    output: 'enum U {b_="T", b="T", a="T"}',
    errors: [
      "Expected string enum members to be in insensitive descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {b_="T", c="T", C="T"}',
    output: 'enum U {c="T", b_="T", C="T"}',
    errors: [
      "Expected string enum members to be in insensitive descending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'enum U {$="T", _="T", A="T", a="T"}',
    output: 'enum U {A="T", _="T", $="T", a="T"}',
    errors: [
      "Expected string enum members to be in insensitive descending order. '_' should be before '$'.",
      "Expected string enum members to be in insensitive descending order. 'A' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
    output: "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
    errors: [
      "Expected string enum members to be in insensitive descending order. 'À' should be before '#'.",
      "Expected string enum members to be in insensitive descending order. 'è' should be before 'Z'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },

  /**
   * desc, natural
   */
  {
    code: 'enum U {a="T", _="T", b="T"}',
    output: 'enum U {b="T", _="T", a="T",}',
    errors: [
      "Expected string enum members to be in natural descending order. 'b' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'enum U {a="T", c="T", b="T"}',
    output: 'enum U {c="T", a="T", b="T"}',
    errors: [
      "Expected string enum members to be in natural descending order. 'c' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'enum U {b_="T", a="T", b="T"}',
    output: 'enum U {b_="T", b="T", a="T"}',
    errors: [
      "Expected string enum members to be in natural descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'enum U {b_="T", c="T", C="T"}',
    output: 'enum U {c="T", b_="T", C="T"}',
    errors: [
      "Expected string enum members to be in natural descending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'enum U {$="T", _="T", A="T", a="T"}',
    output: 'enum U {a="T", _="T", A="T", $="T"}',
    errors: [
      "Expected string enum members to be in natural descending order. '_' should be before '$'.",
      "Expected string enum members to be in natural descending order. 'A' should be before '_'.",
      "Expected string enum members to be in natural descending order. 'a' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
    output: "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
    errors: [
      "Expected string enum members to be in natural descending order. 'À' should be before '#'.",
      "Expected string enum members to be in natural descending order. 'è' should be before 'Z'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },

  /**
   * desc, natural, insensitive
   */
  {
    code: 'enum U {a="T", _="T", b="T"}',
    output: 'enum U {b="T", _="T", a="T",}',
    errors: [
      "Expected string enum members to be in natural insensitive descending order. 'b' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {a="T", c="T", b="T"}',
    output: 'enum U {c="T", a="T", b="T"}',
    errors: [
      "Expected string enum members to be in natural insensitive descending order. 'c' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {b_="T", a="T", b="T"}',
    output: 'enum U {b_="T", b="T", a="T"}',
    errors: [
      "Expected string enum members to be in natural insensitive descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {b_="T", c="T", C="T"}',
    output: 'enum U {c="T", b_="T", C="T"}',
    errors: [
      "Expected string enum members to be in natural insensitive descending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'enum U {$="T", _="T", A="T", a="T"}',
    output: 'enum U {A="T", _="T", $="T", a="T"}',
    errors: [
      "Expected string enum members to be in natural insensitive descending order. '_' should be before '$'.",
      "Expected string enum members to be in natural insensitive descending order. 'A' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
    output: "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
    errors: [
      "Expected string enum members to be in natural insensitive descending order. 'À' should be before '#'.",
      "Expected string enum members to be in natural insensitive descending order. 'è' should be before 'Z'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
]

describe('TypeScript', () => {
  const ruleTester = new RuleTester(typescript)

  ruleTester.run(name, rule as unknown as Rule.RuleModule, {
    valid: processValidTestCase(valid),
    invalid: processInvalidTestCase(invalid),
  })
})
