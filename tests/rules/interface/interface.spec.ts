import { Rule, RuleTester } from 'eslint'

import { name, rule } from '../../../src/rules/interface'
import {
  PreInvalidTestCaseObject,
  PreValidTestCaseObject,
  processInvalidTestCase,
  processValidTestCase,
  runCases,
} from '../../helpers/cases'
import { typescriptConfig } from '../../helpers/configs'
import { CaseCategory } from '../../helpers/strings'

const valid: PreValidTestCaseObject = {
  /**
   * ascending, caseSensitive (default)
   */
  ascendingSensitive: [
    'interface U {a:T;}',
    'interface U {a:T; b:T;}',
    'interface U {_:T; a:T; b:T;}',
    'interface U {a:T; b:T; c:T;}',
    'interface U {a:T; b:T; b_:T;}',
    'interface U {C:T; b_:T; c:T;}',
    'interface U {$:T; A:T; _:T; a:T;}',
    "interface U {1:T; '11':T; 2:T; A:T;}",
    "interface U {'#':T; 'Z':T; À:T; è:T;}",
    /**
     * computed
     */
    'interface U {a:T; ["ab"]:T; b:T; c:T;}',
    /**
     * nested
     */
    'interface U {a:T; b:{x:T; y:T;}; c:T;}',
    'interface U {a:T; b:{x:T; y:T; z:{i:T; j:T;};}; c:T;}',
    'type U = {a:T; b:{x:T; y:T;}; c:T;}',
    'type U = {a:T; b:{x:T; y:T; z:{i:T; j:T;};}; c:T;}',
  ],
  /**
   * ascending, insensitive
   */
  ascendingInsensitive: [
    'interface U {_:T;}',
    'interface U {_:T; a:T; b:T;}',
    'interface U {a:T; b:T; c:T;}',
    'interface U {a:T; b:T; b_:T;}',
    'interface U {b_:T; C:T; c:T;}',
    'interface U {b_:T; c:T; C:T;}',
    'interface U {$:T; _:T; A:T; a:T;}',
    "interface U {1:T; '11':T; 2:T; A:T;}",
  ],
  ascendingNatural: ["interface U {'#':T; 'Z':T; À:T; è:T;}"],
  /**
   * ascending, natural, insensitive
   */
  ascendingInsensitiveNatural: [
    'interface U {_:T; a:T; b:T;}',
    'interface U {a:T; b:T; c:T;}',
    'interface U {a:T; b:T; b_:T;}',
    'interface U {b_:T; C:T; c:T;}',
    'interface U {b_:T; c:T; C:T;}',
    'interface U {$:T; _:T; A:T; a:T;}',
    "interface U {1:T; 2:T; '11':T; A:T;}",
    "interface U {'#':T; 'Z':T; À:T; è:T;}",
  ],
  /**
   * ascending, natural, insensitive, required first
   */
  ascendingInsensitiveNaturalRequired: [
    'interface U {_:T; b:T; a?:T;}',
    'interface U {a:T; c:T; b?:T;}',
    'interface U {b:T; b_:T; a?:T;}',
    'interface U {C:T; c:T; b_?:T;}',
    'interface U {c:T; C:T; b_?:T;}',
    'interface U {$:T; _:T; A?:T; a?:T;}',
    "interface U {1:T; '11':T; A:T; 2?:T;}",
    "interface U {'Z':T; À:T; è:T; '#'?:T;}",
  ],
  /**
   * ascending, required first
   */
  ascendingRequired: [
    'interface U {_:T; b:T; a?:T;}',
    'interface U {a:T; c:T; b?:T;}',
    'interface U {b:T; b_:T; a?:T;}',
    'interface U {C:T; c:T; b_?:T;}',
    'interface U {1:T; 11:T; 9:T; 111?:T;}',
    'interface U {$:T; _:T; A?:T; a?:T;}',
    "interface U {10:T; '11':T; 1?:T; 12?:T; 2?:T;}",
    "interface U {'Z':T; À:T; è:T; '#'?:T;}",
  ],
  /**
   * ascending, natural, insensitive, not-required first
   */
  ascendingInsensitiveNaturalNotRequired: [
    'interface U {_:T; a?:T; b:T;}',
    'interface U {a:T; b?:T; c:T;}',
    'interface U {a?:T; b:T; b_:T;}',
    'interface U {b_?:T; C:T; c:T;}',
    'interface U {b_?:T; c:T; C:T;}',
    'interface U {$:T; _:T; A?:T; a?:T;}',
    "interface U {1:T;  2?:T; '11':T; A:T;}",
    "interface U {'#'?:T; 'Z':T; À:T; è:T;}",
  ],
  /**
   * descending
   */
  descending: [
    'interface U {b:T; a:T; _:T;}',
    'interface U {c:T; b:T; a:T;}',
    'interface U {b_:T; b:T; a:T;}',
    'interface U {c:T; b_:T; C:T;}',
    'interface U {a:T; _:T; A:T; $:T;}',
    "interface U {A:T; 2:T; '11':T; 1:T;}",
    "interface U {è:T; À:T; 'Z':T; '#':T;}",
  ],
  /**
   * descending, insensitive, non-natural
   */
  descendingInsensitiveNonNatural: [
    'interface U {b:T; a:T; _:T;}',
    'interface U {c:T; b:T; a:T;}',
    'interface U {b_:T; b:T; a:T;}',
    'interface U {c:T; C:T; b_:T;}',
    'interface U {C:T; c:T; b_:T;}',
    'interface U {a:T; A:T; _:T; $:T;}',
    "interface U {A:T; 2:T; '11':T; 1:T;}",
    "interface U {è:T; À:T; 'Z':T; '#':T;}",
  ],
  /**
   * descending, case-sensitive, natural
   */
  descendingSensitiveNatural: [
    'interface U {b:T; a:T; _:T;}',
    'interface U {_:T;}',
    'interface U {c:T; b:T; a:T;}',
    'interface U {b_:T; b:T; a:T;}',
    'interface U {c:T; b_:T; C:T;}',
    'interface U {a:T; A:T; _:T; $:T;}',
    "interface U {A:T; '11':T; 2:T; 1:T;}",
    "interface U {è:T; À:T; 'Z':T; '#':T;}",
  ],
  /**
   * descending, natural, insensitive
   */
  descendingInsensitiveNatural: [
    'interface U {b:T; a:T; _:T;}',
    'interface U {c:T; b:T; a:T;}',
    'interface U {b_:T; b:T; a:T;}',
    'interface U {c:T; C:T; b_:T;}',
    'interface U {C:T; c:T; b_:T;}',
    'interface U {a:T; A:T; _:T; $:T;}',
    "interface U {A:T; '11':T; 2:T; 1:T;}",
    "interface U {è:T; À:T; 'Z':T; '#':T;}",
  ],
  /**
   * descending, natural, insensitive, required first
   */
  descendingInsensitiveNaturalRequired: [
    'interface U {b:T; _:T; a?:T;}',
    'interface U {c:T; a:T; b?:T;}',
    'interface U {b_:T; b:T; a?:T;}',
    'interface U {c:T; C:T; b_?:T;}',
    'interface U {C:T; c:T; b_?:T;}',
    'interface U {_:T; $:T; a?:T; A?:T;}',
    "interface U { A:T; '11':T; 1:T; 2?:T;}",
    "interface U {è:T; 'Z':T; À?:T; '#'?:T;}",
  ],
  /**
   * descending, required first
   */
  descendingRequired: [
    'interface U {b:T; _:T; a?:T;}',
    'interface U {c:T; a:T; b?:T;}',
    'interface U {b_:T; b:T; a?:T;}',
    'interface U {c:T; C:T; b_?:T;}',
    'interface U {9:T; 11:T; 1:T; 111?:T;}',
    'interface U {_:T; $:T; a?:T; A?:T;}',
    "interface U {'11':T; 10:T; 2?:T; 12?:T; 1?:T;}",
    "interface U {è:T; À:T; 'Z':T; '#'?:T;}",
  ],
  /**
   * descending, natural, insensitive, not-required first
   */
  descendingInsensitiveNaturalNotRequired: [
    'interface U {b:T; a?:T; _:T;}',
    'interface U {c:T; b?:T; a:T;}',
    'interface U {b_:T; b:T; a?:T;}',
    'interface U {c:T; C:T; b_?:T;}',
    'interface U {C:T; c:T; b_?:T;}',
    'interface U {a?:T; A?:T; _:T; $:T;}',
    "interface U {A:T; '11':T; 2?:T; 1:T;}",
    "interface U {è:T; À:T; 'Z':T; '#'?:T;}",
  ],
  /**
   * index signatures
   */
  ascendingOnly: [
    `interface U<T> { [nkey: number]: T; [skey: string]: T; $: T; A: T; _: T; a: T; }`,
  ],
  descendingOnly: [
    `interface U<T> { a: T; _: T; A: T; $: T; [skey: string]: T; [nkey: number]: T; }`,
  ],
}

const invalid: PreInvalidTestCaseObject = {
  /**
   * index signatures
   */
  ascendingOnly: [
    {
      code: 'interface U<T> { A: T; [skey: string]: T; _: T; }',
      output: 'interface U<T> { [skey: string]: T; A: T; _: T; }',
      errors: [
        ['A', '_'],
        ['[index: skey]', 'A'],
      ],
    },
  ],
  /**
   * ascending sensitive (default)
   */
  ascendingSensitive: [
    {
      code: 'interface U {b:T; a:T;}',
      output: 'interface U {a:T; b:T;}',
      errors: [['b'], ['a', 'b']],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      output: 'interface U {a:T; b:T; b_:T;}',
      errors: [['b_'], ['b', 'b_']],
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      output: 'interface U {C:T; b_:T; c:T;}',
      errors: [['c'], ['C', 'b_']],
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      output: "interface U {1:T; '11':T; 2:T; A:T;}",
      errors: [['A'], ['11', '2']],
    },
    {
      code: 'interface U {a:T; _:T; b:T;}',
      output: 'interface U {_:T; a:T; b:T;}',
      errors: [
        ['a', 'b'],
        ['_', 'a'],
      ],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      output: 'interface U {a:T; b:T; c:T;}',
      errors: [['c'], ['b', 'c']],
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      output: 'interface U {$:T; A:T; _:T; a:T;}',
      errors: [
        ['_', 'a'],
        ['A', '_'],
      ],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      output: "interface U {'#':T; 'Z':T; À:T; è:T;}",
      errors: [
        ['À', 'è'],
        ['Z', 'À'],
      ],
    },
    /**
     * methods
     */
    {
      code: "interface U {1:T; 2:T; A():T; '11':T;}",
      output: "interface U {1:T; '11':T; 2:T; A():T;}",
      errors: [['A'], ['11', '2']],
    },
    {
      code: "interface U {'#'():T; À():T; 'Z':T; è:T;}",
      output: "interface U {'#'():T; 'Z':T; À():T; è:T;}",
      errors: [
        ['À', 'è'],
        ['Z', 'À'],
      ],
    },
    /**
     * not ignore simple computed properties.
     */
    {
      code: 'interface U {a:T; b:T; ["a"]:T; c:T;}',
      output: 'interface U {a:T; ["a"]:T; b:T; c:T;}',
      errors: [
        ['b', 'c'],
        ['a', 'b'],
      ],
    },
    /**
     * nested
     */
    // TODO sorted nested interface getting overwritten by value of node from parent sort
    {
      code: 'interface U {a:T; c:{y:T; x:T;}, b:T;}',
      output: 'interface U {a:T; b:T; c:{y:T; x:T;};}',
      errors: [2, ['c'], 2, ['y'], ['x', 'y'], ['b', 'c']],
      omitInferredErrorCount: true,
    },
    {
      code: 'type U = {a:T; c:{y:T; x:T;}, b:T;}',
      output: 'type U = {a:T; b:T; c:{y:T; x:T;};}',
      errors: [2, ['c'], 2, ['y'], ['x', 'y'], ['b', 'c']],
      omitInferredErrorCount: true,
    },
  ],
  /**
   * ascending, insensitive
   */
  ascendingInsensitive: [
    {
      code: 'interface U {a:T; _:T; b:T;}',
      output: 'interface U {_:T; a:T; b:T;}',
      errors: [
        ['a', 'b'],
        ['_', 'a'],
      ],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      output: 'interface U {a:T; b:T; c:T;}',
      errors: [['c'], ['b', 'c']],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      output: 'interface U {a:T; b:T; b_:T;}',
      errors: [['b_'], ['b', 'b_']],
    },
    {
      code: 'interface U {$:T; A:T; _:T; a:T;}',
      output: 'interface U {$:T; _:T; A:T; a:T;}',
      errors: [
        ['A', 'a'],
        ['_', 'A'],
      ],
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      output: "interface U {1:T; '11':T; 2:T; A:T;}",
      errors: [['A'], ['11', '2']],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      output: "interface U {'#':T; 'Z':T; À:T; è:T;}",
      errors: [
        ['À', 'è'],
        ['Z', 'À'],
      ],
    },
  ],
  // /**
  //  * ascending, natural
  //  */
  ascendingNatural: [
    {
      code: 'interface U {a:T; _:T; b:T;}',
      output: 'interface U {_:T; a:T; b:T;}',
      errors: [
        ['a', 'b'],
        ['_', 'a'],
      ],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      output: 'interface U {a:T; b:T; c:T;}',
      errors: [['c'], ['b', 'c']],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      output: 'interface U {a:T; b:T; b_:T;}',
      errors: [['b_'], ['b', 'b_']],
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      output: 'interface U {C:T; b_:T; c:T;}',
      errors: [['c'], ['C', 'b_']],
    },
    {
      code: 'interface U {$:T; A:T; _:T; a:T;}',
      output: 'interface U {$:T; _:T; A:T; a:T;}',
      errors: [
        ['A', 'a'],
        ['_', 'A'],
      ],
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      output: "interface U {1:T; 2:T; '11':T; A:T;}",
      errors: [['A'], ['11', 'A']],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      output: "interface U {'#':T; 'Z':T; À:T; è:T;}",
      errors: [
        ['À', 'è'],
        ['Z', 'À'],
      ],
    },
  ],
  /**
   * ascending, natural, insensitive
   */
  ascendingInsensitiveNatural: [
    {
      code: 'interface U {a:T; _:T; b:T;}',
      output: 'interface U {_:T; a:T; b:T;}',
      errors: [
        ['a', 'b'],
        ['_', 'a'],
      ],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      output: 'interface U {a:T; b:T; c:T;}',
      errors: [['c'], ['b', 'c']],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      output: 'interface U {a:T; b:T; b_:T;}',
      errors: [['b_'], ['b', 'b_']],
    },
    {
      code: 'interface U {$:T; A:T; _:T; a:T;}',
      output: 'interface U {$:T; _:T; A:T; a:T;}',
      errors: [
        ['A', 'a'],
        ['_', 'A'],
      ],
    },
    {
      code: "interface U {1:T; '11':T; 2:T; A:T;}",
      output: "interface U {1:T; 2:T; '11':T; A:T;}",
      errors: [
        ['11', 'A'],
        ['2', '11'],
      ],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      output: "interface U {'#':T; 'Z':T; À:T; è:T;}",
      errors: [
        ['À', 'è'],
        ['Z', 'À'],
      ],
    },
  ],
  /**
   * ascending, natural, insensitive, required first
   */
  ascendingInsensitiveNaturalRequired: [
    {
      code: 'interface U {_:T; a?:T; b:T;}',
      output: 'interface U {_:T; b:T; a?:T;}',
      errors: [['a'], ['b', 'a']],
    },
    {
      code: 'interface U {a:T; b?:T; c:T;}',
      output: 'interface U {a:T; c:T; b?:T;}',
      errors: [['b'], ['c', 'b']],
    },
    {
      code: 'interface U {b:T; a?:T; b_:T;}',
      output: 'interface U {b:T; b_:T; a?:T;}',
      errors: [['a'], ['b_', 'a']],
    },
    {
      code: 'interface U {C:T; b_?:T; c:T;}',
      output: 'interface U {C:T; c:T; b_?:T;}',
      errors: [['b_'], ['c', 'b_']],
    },
    {
      code: 'interface U {$:T; A?:T; _:T; a?:T;}',
      output: 'interface U {$:T; _:T; A?:T; a?:T;}',
      errors: [
        ['A', 'a'],
        ['_', 'A'],
      ],
    },
    {
      code: "interface U {1:T; '11':T; 2?:T; A:T;}",
      output: "interface U {1:T; '11':T; A:T; 2?:T;}",
      errors: [['2'], ['A', '2']],
    },
    {
      code: "interface U {'Z':T; À:T; '#'?:T; è:T;}",
      output: "interface U {'Z':T; À:T; è:T; '#'?:T;}",
      errors: [['#'], ['è', '#']],
    },
  ],
  /**
   * ascending, natural, insensitive, not-required first
   */
  ascendingInsensitiveNaturalNotRequired: [
    {
      code: 'interface U {_:T; b:T; a?:T;}',
      output: 'interface U {_:T; a?:T; b:T;}',
      errors: [['b'], ['a', 'b']],
    },
    {
      code: 'interface U {b?:T; a:T; c:T;}',
      output: 'interface U {a:T; b?:T; c:T;}',
      errors: [
        ['b', 'c'],
        ['a', 'b'],
      ],
    },
    {
      code: 'interface U {b:T; a?:T; b_:T;}',
      output: 'interface U {a?:T; b:T; b_:T;}',
      errors: [
        ['b', 'b_'],
        ['a', 'b'],
      ],
    },
    {
      code: 'interface U {C:T; b_?:T; c:T;}',
      output: 'interface U {b_?:T; C:T; c:T;}',
      errors: [
        ['C', 'c'],
        ['b_', 'C'],
      ],
    },
    {
      code: 'interface U {$:T; A?:T; _:T; a?:T;}',
      output: 'interface U {$:T; _:T; A?:T; a?:T;}',
      errors: [
        ['A', 'a'],
        ['_', 'A'],
      ],
    },
    {
      code: "interface U {1:T; '11':T; 2?:T; A:T;}",
      output: "interface U {1:T; 2?:T; '11':T; A:T;}",
      errors: [
        ['11', 'A'],
        ['2', '11'],
      ],
    },
    {
      code: "interface U {'Z':T; À:T; '#'?:T; è:T;}",
      output: "interface U {'#'?:T; 'Z':T; À:T; è:T;}",
      errors: [
        ['À', 'è'],
        ['#', 'Z'],
      ],
    },
  ],
  /**
   * descending
   */
  descendingOnly: [
    {
      code: 'interface U {a:T; _:T; b:T;}',
      output: 'interface U {b:T; a:T; _:T;}',
      errors: [['_'], ['b', 'a']],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      output: 'interface U {c:T; b:T; a:T;}',
      errors: [['a'], ['b', 'a']],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      output: 'interface U {b_:T; b:T; a:T;}',
      errors: [['a'], ['b', 'a']],
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      output: 'interface U {c:T; b_:T; C:T;}',
      errors: [
        ['b_', 'C'],
        ['c', 'b_'],
      ],
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      output: 'interface U {a:T; _:T; A:T; $:T;}',
      errors: [['$'], ['a', '_']],
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      output: "interface U {A:T; 2:T; '11':T; 1:T;}",
      errors: [['1'], ['A', '2'], ['11', '1']],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      output: "interface U {è:T; À:T; 'Z':T; '#':T;}",
      errors: [['#'], ['è', 'À']],
    },
    {
      code: 'interface U<T> { _: T; [skey: string]: T; A: T; }',
      output: 'interface U<T> { _: T; A: T; [skey: string]: T; }',
      errors: [['[index: skey]'], ['A', '[index: skey]']],
    },
  ],
  /**
   * descending, insensitive
   */
  descendingInsensitive: [
    {
      code: 'interface U {a:T; _:T; b:T;}',
      output: 'interface U {b:T; a:T; _:T;}',
      errors: [['_'], ['b', 'a']],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      output: 'interface U {c:T; b:T; a:T;}',
      errors: [['a'], ['b', 'a']],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      output: 'interface U {b_:T; b:T; a:T;}',
      errors: [['a'], ['b', 'a']],
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      output: 'interface U {c:T; C:T; b_:T;}',
      errors: [['b_'], ['C', 'b_']],
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      output: 'interface U {A:T; a:T; _:T; $:T;}',
      errors: [['$'], ['_', '$'], ['a', '_']],
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      output: "interface U {A:T; 2:T; '11':T; 1:T;}",
      errors: [['1'], ['A', '2'], ['11', '1']],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      output: "interface U {è:T; À:T; 'Z':T; '#':T;}",
      errors: [['#'], ['è', 'À']],
    },
  ],
  /**
   * descending, natural
   */
  descendingNatural: [
    {
      code: 'interface U {a:T; _:T; b:T;}',
      output: 'interface U {b:T; a:T; _:T;}',
      errors: [['_'], ['b', 'a']],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      output: 'interface U {c:T; b:T; a:T;}',
      errors: [['a'], ['b', 'a']],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      output: 'interface U {b_:T; b:T; a:T;}',
      errors: [['a'], ['b', 'a']],
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      output: 'interface U {c:T; b_:T; C:T;}',
      errors: [
        ['b_', 'C'],
        ['c', 'b_'],
      ],
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      output: 'interface U {a:T; A:T; _:T; $:T;}',
      errors: [['$'], ['_', '$'], ['A', '_'], ['a', 'A']],
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      output: "interface U {A:T; '11':T; 2:T; 1:T;}",
      errors: [['1'], ['2', '1'], ['11', '2']],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      output: "interface U {è:T; À:T; 'Z':T; '#':T;}",
      errors: [['#'], ['è', 'À']],
    },
  ],
  // /**
  //  * descending, natural, insensitive
  //  */
  descendingInsensitiveNatural: [
    {
      code: 'interface U {a:T; _:T; b:T;}',
      output: 'interface U {b:T; a:T; _:T;}',
      errors: [['_'], ['b', 'a']],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      output: 'interface U {c:T; b:T; a:T;}',
      errors: [['a'], ['b', 'a']],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      output: 'interface U {b_:T; b:T; a:T;}',
      errors: [['a'], ['b', 'a']],
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      output: 'interface U {c:T; C:T; b_:T;}',
      errors: [['b_'], ['C', 'b_']],
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      output: 'interface U {A:T; a:T; _:T; $:T;}',
      errors: [['$'], ['_', '$'], ['a', '_']],
    },
    {
      code: "interface U {1:T; 2:T; '11':T; A:T;}",
      output: "interface U {A:T; '11':T; 2:T; 1:T;}",
      errors: [['1'], ['2', '1'], ['11', '2'], ['A', '11']],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      output: "interface U {è:T; À:T; 'Z':T; '#':T;}",
      errors: [['#'], ['è', 'À']],
    },
  ],
  /**
   * descending, natural, insensitive, required first
   */
  descendingInsensitiveNaturalRequired: [
    {
      code: 'interface U {_:T; a?:T; b:T;}',
      output: 'interface U {b:T; _:T; a?:T;}',
      errors: [['a'], ['b', '_']],
    },
    {
      code: 'interface U {b:T; a?:T; _:T;}',
      output: 'interface U {b:T; _:T; a?:T;}',
      errors: [['a'], ['_', 'a']],
    },
    {
      code: 'interface U {b:T; b_:T; a?:T;}',
      output: 'interface U {b_:T; b:T; a?:T;}',
      errors: [
        ['b', 'a'],
        ['b_', 'b'],
      ],
    },
    {
      code: 'interface U {c:T; b_?:T; C:T;}',
      output: 'interface U {c:T; C:T; b_?:T;}',
      errors: [['b_'], ['C', 'b_']],
    },
    {
      code: 'interface U {b_?:T; C:T; c:T;}',
      output: 'interface U {C:T; c:T; b_?:T;}',
      errors: [['b_'], ['c', 'b_']],
    },
    {
      code: 'interface U {_:T; a?:T; $:T; A?:T;}',
      output: 'interface U {_:T; $:T; a?:T; A?:T;}',
      errors: [
        ['a', 'A'],
        ['$', 'a'],
      ],
    },
    {
      code: "interface U {2?:T; A:T; 1:T; '11':T;}",
      output: "interface U {A:T; '11':T; 1:T; 2?:T;}",
      errors: [['2'], ['A', '11'], ['11', '1']],
    },
    {
      code: "interface U {è:T; 'Z':T; '#'?:T; À?:T;}",
      output: "interface U {è:T; 'Z':T; À?:T; '#'?:T;}",
      errors: [['#'], ['À', '#']],
    },
    {
      code: "interface U {À?:T; 'Z':T; '#'?:T; è:T;}",
      output: "interface U {è:T; 'Z':T; À?:T; '#'?:T;}",
      errors: [['À', '#'], ['#'], ['è', 'Z']],
    },
  ],
  /**
   * descending, natural, insensitive, not-required first
   */
  descendingInsensitiveNaturalNotRequired: [
    {
      code: 'interface U {_:T; a?:T; b:T;}',
      output: 'interface U {b:T; a?:T; _:T;}',
      errors: [['_'], ['b', 'a']],
    },
    {
      code: 'interface U {a?:T; b:T; _:T;}',
      output: 'interface U {b:T; a?:T; _:T;}',
      errors: [
        ['a', '_'],
        ['b', 'a'],
      ],
    },
    {
      code: 'interface U {b:T; b_:T; a?:T;}',
      output: 'interface U {b_:T; b:T; a?:T;}',
      errors: [
        ['b', 'a'],
        ['b_', 'b'],
      ],
    },
    {
      code: 'interface U {c:T; b_?:T; C:T;}',
      output: 'interface U {c:T; C:T; b_?:T;}',
      errors: [['b_'], ['C', 'b_']],
    },
    {
      code: 'interface U {b_?:T; C:T; c:T;}',
      output: 'interface U {C:T; c:T; b_?:T;}',
      errors: [['b_'], ['c', 'b_']],
    },
    {
      code: 'interface U {_:T; a?:T; $:T; A?:T;}',
      output: 'interface U {a?:T; A?:T; _:T; $:T;}',
      errors: [['_', '$'], ['a', 'A'], ['$'], ['A', '_']],
    },
    {
      code: "interface U {2?:T; A:T; 1:T; '11':T;}",
      output: "interface U {A:T; '11':T; 2?:T; 1:T;}",
      errors: [['2', '1'], ['A', '11'], ['1'], ['11', '2']],
    },
    {
      code: "interface U {è:T; 'Z':T; '#'?:T; À?:T;}",
      output: "interface U {è:T; À?:T; 'Z':T; '#'?:T;}",
      errors: [['#'], ['À', 'Z']],
    },
    {
      code: "interface U {À?:T; 'Z':T; '#'?:T; è:T;}",
      output: "interface U {è:T; À?:T; 'Z':T; '#'?:T;}",
      errors: [['#'], ['è', 'À']],
    },
  ],
}

describe('TypeScript', () => {
  const ruleTester = new RuleTester(typescriptConfig)

  ruleTester.run(name, rule as unknown as Rule.RuleModule, {
    valid: processValidTestCase(valid, true),
    invalid: processInvalidTestCase(invalid, CaseCategory.Interface, true),
  })
})

runCases({ name, rule: rule as unknown as Rule.RuleModule, typescriptConfig }, valid, invalid, {
  category: CaseCategory.Interface,
  withRequiredFirstOption: true,
})
