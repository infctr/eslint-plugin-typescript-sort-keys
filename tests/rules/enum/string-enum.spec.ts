import { Rule } from 'eslint'

import { name, rule } from '../../../src/rules/string-enum'
import { PreInvalidTestCaseObject, PreValidTestCaseObject, runCases } from '../../helpers/cases'
import { typescriptConfig } from '../../helpers/configs'
import { CaseCategory } from '../../helpers/strings'

const valid: PreValidTestCaseObject = {
  /**
   * ignores
   */
  noOptions: [
    'enum U {c, b, a}',
    'enum U {c=a(), b, a}',
    'enum U {c=0, b, a}',
    'enum U {c=3, b, a}',
    'enum U {c=1<<1, b, a}',
    'enum U {c=M|N, b, a}',
    'enum U {c="123".length, b, a}',
    'enum U {c=0, b="b", a}',
    'const enum U {A=1, B=A*2}',
  ],
  ascendingWithDefaults: [
    'enum U {a="b", }',
    'enum U {a="b", b="c"}',
    'enum U {_="a", a="b", b="c"}',
    'enum U {a="a", b="b", c="c"}',
    'enum U {a="a", b="b", b_="c"}',
    'enum U {C="a", b_="b", c="c"}',
    'enum U {$="a", A="b", _="c", a="d"}',
    "enum U {'#'='a', 'Z'='b', À='c', è='d'}",
    'enum U {_="T", a="T", b="T"}',
    'enum U {a="T", b="T", c="T"}',
    'enum U {a="T", b="T", b_="T"}',
    'enum U {C="T", b_="T", c="T"}',
    'enum U {$="T", A="T", _="T", a="T"}',
    "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
    /**
     * computed
     */
    '{a="T", ["aa"]="T", b="T", c="T"}',
  ],
  ascendingSensitiveNonNaturalNotRequired: [
    'enum U {a="b", }',
    'enum U {a="b", b="c"}',
    'enum U {_="a", a="b", b="c"}',
    'enum U {a="a", b="b", c="c"}',
    'enum U {a="a", b="b", b_="c"}',
    'enum U {C="a", b_="b", c="c"}',
    'enum U {$="a", A="b", _="c", a="d"}',
    "enum U {'#'='a', 'Z'='b', À='c', è='d'}",
    'enum U {_="T", a="T", b="T"}',
    'enum U {a="T", b="T", c="T"}',
    'enum U {a="T", b="T", b_="T"}',
    'enum U {C="T", b_="T", c="T"}',
    'enum U {$="T", A="T", _="T", a="T"}',
    "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
    /**
     * computed
     */
    '{a="T", ["aa"]="T", b="T", c="T"}',
  ],
  ascendingSensitiveNaturalNotRequired: [
    'enum U {_="T", a="T", b="T"}',
    'enum U {a="T", b="T", c="T"}',
    'enum U {a="T", b="T", b_="T"}',
    'enum U {C="T", b_="T", c="T"}',
    'enum U {$="T", _="T", A="T", a="T"}',
    "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
  ],
  ascendingInsensitiveNaturalNotRequired: [
    'enum U {_="T", a="T", b="T"}',
    'enum U {a="T", b="T", c="T"}',
    'enum U {a="T", b="T", b_="T"}',
    'enum U {b_="T", C="T", c="T"}',
    'enum U {b_="T", c="T", C="T"}',
    'enum U {$="T", _="T", A="T", a="T"}',
    "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
  ],
  descendingWithDefaults: [
    'enum U {b="T", a="T", _="T"}',
    'enum U {c="T", b="T", a="T"}',
    'enum U {b_="T", b="T", a="T"}',
    'enum U {c="T", b_="T", C="T"}',
    'enum U {a="T", _="T", A="T", $="T"}',
    "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
  ],
  descendingInsensitiveNonNaturalNotRequired: [
    'enum U {b="T", a="T", _="T"}',
    'enum U {c="T", b="T", a="T"}',
    'enum U {b_="T", b="T", a="T"}',
    'enum U {c="T", C="T", b_="T"}',
    'enum U {C="T", c="T", b_="T"}',
    'enum U {a="T", A="T", _="T", $="T"}',
    "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
  ],
  descendingInsensitiveNaturalNotRequired: [
    'enum U {b="T", a="T", _="T"}',
    'enum U {c="T", b="T", a="T"}',
    'enum U {b_="T", b="T", a="T"}',
    'enum U {a="T", A="T", _="T", $="T"}',
    "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
    'enum U {c="T", C="T", b_="T"}',
    'enum U {C="T", c="T", b_="T"}',
  ],
  descendingSensitiveNaturalNotRequired: [
    'enum U {b="T", a="T", _="T"}',
    'enum U {c="T", b="T", a="T"}',
    'enum U {b_="T", b="T", a="T"}',
    'enum U {c="T", b_="T", C="T"}',
    'enum U {a="T", A="T", _="T", $="T"}',
    "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
  ],
}

const invalid: PreInvalidTestCaseObject = {
  ascendingWithDefaults: [
    {
      code: 'enum U {b="c", a="a"}',
      output: 'enum U {a="a", b="c"}',
      errors: 3,
    },
    {
      code: 'enum U {a="a", _="b", b="c"}',
      output: 'enum U {_="b", a="a", b="c"}',
      errors: 3,
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      output: 'enum U {a="T", b="T", c="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      output: 'enum U {a="T", b="T", b_="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", c="T", C="T"}',
      output: 'enum U {C="T", b_="T", c="T"}',
      errors: 3,
    },
    {
      code: 'enum U {$="T", _="T", A="T", a="T"}',
      output: 'enum U {$="T", A="T", _="T", a="T"}',
      errors: 3,
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      output: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
      errors: 3,
    },
    {
      code: 'enum U {a="T", _="T", b="T"}',
      output: 'enum U {_="T", a="T", b="T"}',
      errors: 3,
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      output: 'enum U {a="T", b="T", c="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      output: 'enum U {a="T", b="T", b_="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", c="T", C="T"}',
      output: 'enum U {C="T", b_="T", c="T"}',
      errors: 3,
    },
    {
      code: 'enum U {$="T", _="T", A="T", a="T"}',
      output: 'enum U {$="T", A="T", _="T", a="T"}',
      errors: 3,
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      output: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
      errors: 3,
    },
    /**
     * not ignore simple computed properties.
     */
    {
      code: 'enum U {a="T", b="T", ["aa"]="T", c="T"}',
      output: 'enum U {a="T", ["aa"]="T", b="T", c="T"}',
      errors: 3,
    },
  ],
  ascendingInsensitiveNonNaturalNotRequired: [
    {
      code: 'enum U {a="T", _="T", b="T"}',
      output: 'enum U {_="T", a="T", b="T"}',
      errors: 3,
    },
    {
      code: 'enum U {c="T", a="T", b="T"}',
      output: 'enum U {a="T", b="T", c="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      output: 'enum U {a="T", b="T", b_="T"}',
      errors: 3,
    },
    {
      code: 'enum U {$="T", A="T", _="T", a="T"}',
      output: 'enum U {$="T", _="T", A="T", a="T"}',
      errors: 3,
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      output: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
      errors: 3,
    },
  ],
  ascendingSensitiveNaturalNotRequired: [
    {
      code: 'enum U {a="T", _="T", b="T"}',
      output: 'enum U {_="T", a="T", b="T"}',
      errors: 3,
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      output: 'enum U {a="T", b="T", c="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      output: 'enum U {a="T", b="T", b_="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", c="T", C="T"}',
      output: 'enum U {C="T", b_="T", c="T"}',
      errors: 3,
    },
    {
      code: 'enum U {$="T", A="T", _="T", a="T"}',
      output: 'enum U {$="T", _="T", A="T", a="T"}',
      errors: 3,
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      output: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
      errors: 3,
    },
  ],
  ascendingInsensitiveNaturalNotRequired: [
    {
      code: 'enum U {a="T", _="T", b="T"}',
      output: 'enum U {_="T", a="T", b="T"}',
      errors: 3,
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      output: 'enum U {a="T", b="T", c="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      output: 'enum U {a="T", b="T", b_="T"}',
      errors: 3,
    },
    {
      code: 'enum U {$="T", A="T", _="T", a="T"}',
      output: 'enum U {$="T", _="T", A="T", a="T"}',
      errors: 3,
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      output: "enum U {'#'='T', 'Z'='T', À='T', è='T'}",
      errors: 3,
    },
  ],
  descendingWithDefaults: [
    {
      code: 'enum U {a="T", _="T", b="T"}',
      output: 'enum U {b="T", a="T", _="T"}',
      errors: 3,
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      output: 'enum U {c="T", b="T", a="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      output: 'enum U {b_="T", b="T", a="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", c="T", C="T"}',
      output: 'enum U {c="T", b_="T", C="T"}',
      errors: 3,
    },
    {
      code: 'enum U {$="T", _="T", A="T", a="T"}',
      output: 'enum U {a="T", _="T", A="T", $="T"}',
      errors: 3,
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      output: "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
      errors: 3,
    },
  ],
  descendingInsensitiveNonNaturalNotRequired: [
    {
      code: 'enum U {a="T", _="T", b="T"}',
      output: 'enum U {b="T", a="T", _="T"}',
      errors: 3,
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      output: 'enum U {c="T", b="T", a="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      output: 'enum U {b_="T", b="T", a="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", c="T", C="T"}',
      output: 'enum U {c="T", C="T", b_="T"}',
      errors: 3,
    },
    {
      code: 'enum U {$="T", _="T", A="T", a="T"}',
      output: 'enum U {A="T", a="T", _="T", $="T"}',
      errors: 4,
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      output: "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
      errors: 3,
    },
  ],
  descendingSensitiveNaturalNotRequired: [
    {
      code: 'enum U {a="T", _="T", b="T"}',
      output: 'enum U {b="T", a="T", _="T"}',
      errors: 3,
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      output: 'enum U {c="T", b="T", a="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      output: 'enum U {b_="T", b="T", a="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", c="T", C="T"}',
      output: 'enum U {c="T", b_="T", C="T"}',
      errors: 3,
    },
    {
      code: 'enum U {$="T", _="T", A="T", a="T"}',
      output: 'enum U {a="T", A="T", _="T", $="T"}',
      errors: 5,
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      output: "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
      errors: 3,
    },
  ],
  descendingInsensitiveNaturalNotRequired: [
    {
      code: 'enum U {a="T", _="T", b="T"}',
      output: 'enum U {b="T", a="T", _="T"}',
      errors: 3,
    },
    {
      code: 'enum U {a="T", c="T", b="T"}',
      output: 'enum U {c="T", b="T", a="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", a="T", b="T"}',
      output: 'enum U {b_="T", b="T", a="T"}',
      errors: 3,
    },
    {
      code: 'enum U {b_="T", c="T", C="T"}',
      output: 'enum U {c="T", C="T", b_="T"}',
      errors: 3,
    },
    {
      code: 'enum U {$="T", _="T", A="T", a="T"}',
      output: 'enum U {A="T", a="T", _="T", $="T"}',
      errors: 4,
    },
    {
      code: "enum U {'#'='T', À='T', 'Z'='T', è='T'}",
      output: "enum U {è='T', À='T', 'Z'='T', '#'='T'}",
      errors: 3,
    },
  ],
}

runCases({ name, rule: rule as unknown as Rule.RuleModule, typescriptConfig }, valid, invalid, {
  category: CaseCategory.Enum,
  withRequiredFirstOption: false,
})
