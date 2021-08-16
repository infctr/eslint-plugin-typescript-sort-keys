import { Rule, RuleTester } from 'eslint'

import { rule, name, Options } from 'rules/interface'
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
   * default, asc, caseSensitive
   */
  {
    code: 'interface U {_:T; a:T; b:T;}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {a:T; b:T; c:T;}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {a:T; b:T; b_:T;}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {C:T; b_:T; c:T;}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {$:T; A:T; _:T; a:T;}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {1:T; '11':T; 2:T; A:T;}",
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {'#':T; 'Z':T; À:T; è:T;}",
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },

  /**
   * computed
   */
  {
    code: 'interface U {a:T; ["ab"]:T; b:T; c:T;}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },

  /**
   * nested
   */
  {
    code: 'interface U {a:T; b:{x:T; y:T;}; c:T;}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {a:T; b:{x:T; y:T; z:{i:T; j:T;};}; c:T;}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'type U = {a:T; b:{x:T; y:T;}; c:T;}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'type U = {a:T; b:{x:T; y:T; z:{i:T; j:T;};}; c:T;}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },

  /**
   * asc, insensitive
   */
  {
    code: 'interface U {_:T; a:T; b:T;}',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'interface U {a:T; b:T; c:T;}',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'interface U {a:T; b:T; b_:T;}',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'interface U {b_:T; C:T; c:T;}',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'interface U {b_:T; c:T; C:T;}',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'interface U {$:T; _:T; A:T; a:T;}',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: "interface U {1:T; '11':T; 2:T; A:T;}",
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },

  {
    code: "interface U {'#':T; 'Z':T; À:T; è:T;}",
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },

  /**
   * asc, natural, insensitive
   */
  {
    code: 'interface U {_:T; a:T; b:T;}',
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {a:T; b:T; c:T;}',
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {a:T; b:T; b_:T;}',
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {b_:T; C:T; c:T;}',
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {b_:T; c:T; C:T;}',
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {$:T; _:T; A:T; a:T;}',
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: "interface U {1:T; 2:T; '11':T; A:T;}",
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: "interface U {'#':T; 'Z':T; À:T; è:T;}",
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },

  /**
   * asc, natural, insensitive, required
   */
  {
    code: 'interface U {_:T; b:T; a?:T;}',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {a:T; c:T; b?:T;}',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {b:T; b_:T; a?:T;}',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {C:T; c:T; b_?:T;}',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {c:T; C:T; b_?:T;}',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {$:T; _:T; A?:T; a?:T;}',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: "interface U {1:T; '11':T; A:T; 2?:T;}",
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: "interface U {'Z':T; À:T; è:T; '#'?:T;}",
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },

  /**
   * asc, required
   */
  {
    code: 'interface U {_:T; b:T; a?:T;}',
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },
  {
    code: 'interface U {a:T; c:T; b?:T;}',
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },
  {
    code: 'interface U {b:T; b_:T; a?:T;}',
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },
  {
    code: 'interface U {C:T; c:T; b_?:T;}',
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },
  {
    code: 'interface U {1:T; 11:T; 9:T; 111?:T;}',
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },
  {
    code: 'interface U {$:T; _:T; A?:T; a?:T;}',
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },
  {
    code: "interface U {10:T; '11':T; 1?:T; 12?:T; 2?:T;}",
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },
  {
    code: "interface U {'Z':T; À:T; è:T; '#'?:T;}",
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },

  /**
   * asc, natural, insensitive, not-required
   */
  {
    code: 'interface U {_:T; a?:T; b:T;}',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {a:T; b?:T; c:T;}',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {a?:T; b:T; b_:T;}',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {b_?:T; C:T; c:T;}',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {b_?:T; c:T; C:T;}',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {$:T; _:T; A?:T; a?:T;}',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {1:T;  2?:T; '11':T; A:T;}",
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {'#'?:T; 'Z':T; À:T; è:T;}",
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },

  /**
   * desc
   */
  {
    code: 'interface U {b:T; a:T; _:T;}',
    optionsSet: [
      [SortingOrder.Descending],
      [SortingOrder.Descending, { caseSensitive: true }],
      [SortingOrder.Descending, { natural: false }],
      [SortingOrder.Descending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'interface U {c:T; b:T; a:T;}',
    optionsSet: [
      [SortingOrder.Descending],
      [SortingOrder.Descending, { caseSensitive: true }],
      [SortingOrder.Descending, { natural: false }],
      [SortingOrder.Descending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'interface U {b_:T; b:T; a:T;}',
    optionsSet: [
      [SortingOrder.Descending],
      [SortingOrder.Descending, { caseSensitive: true }],
      [SortingOrder.Descending, { natural: false }],
      [SortingOrder.Descending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'interface U {c:T; b_:T; C:T;}',
    optionsSet: [
      [SortingOrder.Descending],
      [SortingOrder.Descending, { caseSensitive: true }],
      [SortingOrder.Descending, { natural: false }],
      [SortingOrder.Descending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'interface U {a:T; _:T; A:T; $:T;}',
    optionsSet: [
      [SortingOrder.Descending],
      [SortingOrder.Descending, { caseSensitive: true }],
      [SortingOrder.Descending, { natural: false }],
      [SortingOrder.Descending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: "interface U {A:T; 2:T; '11':T; 1:T;}",
    optionsSet: [
      [SortingOrder.Descending],
      [SortingOrder.Descending, { caseSensitive: true }],
      [SortingOrder.Descending, { natural: false }],
      [SortingOrder.Descending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: "interface U {è:T; À:T; 'Z':T; '#':T;}",
    optionsSet: [
      [SortingOrder.Descending],
      [SortingOrder.Descending, { caseSensitive: true }],
      [SortingOrder.Descending, { natural: false }],
      [SortingOrder.Descending, { caseSensitive: true, natural: false }],
    ],
  },

  /**
   * desc, insensitive
   */
  {
    code: 'interface U {b:T; a:T; _:T;}',
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },
  {
    code: 'interface U {c:T; b:T; a:T;}',
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },
  {
    code: 'interface U {b_:T; b:T; a:T;}',
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },
  {
    code: 'interface U {c:T; C:T; b_:T;}',
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },
  {
    code: 'interface U {C:T; c:T; b_:T;}',
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },
  {
    code: 'interface U {a:T; A:T; _:T; $:T;}',
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },
  {
    code: "interface U {A:T; 2:T; '11':T; 1:T;}",
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },
  {
    code: "interface U {è:T; À:T; 'Z':T; '#':T;}",
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },

  /**
   * desc, natural
   */
  {
    code: 'interface U {b:T; a:T; _:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true }],
      [SortingOrder.Descending, { natural: true, caseSensitive: true }],
    ],
  },
  {
    code: 'interface U {c:T; b:T; a:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true }],
      [SortingOrder.Descending, { natural: true, caseSensitive: true }],
    ],
  },
  {
    code: 'interface U {b_:T; b:T; a:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true }],
      [SortingOrder.Descending, { natural: true, caseSensitive: true }],
    ],
  },
  {
    code: 'interface U {c:T; b_:T; C:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true }],
      [SortingOrder.Descending, { natural: true, caseSensitive: true }],
    ],
  },
  {
    code: 'interface U {a:T; A:T; _:T; $:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true }],
      [SortingOrder.Descending, { natural: true, caseSensitive: true }],
    ],
  },
  {
    code: "interface U {A:T; '11':T; 2:T; 1:T;}",
    optionsSet: [
      [SortingOrder.Descending, { natural: true }],
      [SortingOrder.Descending, { natural: true, caseSensitive: true }],
    ],
  },
  {
    code: "interface U {è:T; À:T; 'Z':T; '#':T;}",
    optionsSet: [
      [SortingOrder.Descending, { natural: true }],
      [SortingOrder.Descending, { natural: true, caseSensitive: true }],
    ],
  },

  /**
   * desc, natural, insensitive
   */
  {
    code: 'interface U {b:T; a:T; _:T;}',
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {c:T; b:T; a:T;}',
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {b_:T; b:T; a:T;}',
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {c:T; C:T; b_:T;}',
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {C:T; c:T; b_:T;}',
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {a:T; A:T; _:T; $:T;}',
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: "interface U {A:T; '11':T; 2:T; 1:T;}",
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: "interface U {è:T; À:T; 'Z':T; '#':T;}",
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },

  /**
   * desc, natural, insensitive, required
   */
  {
    code: 'interface U {b:T; _:T; a?:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {c:T; a:T; b?:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {b_:T; b:T; a?:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {c:T; C:T; b_?:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {C:T; c:T; b_?:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {_:T; $:T; a?:T; A?:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: "interface U { A:T; '11':T; 1:T; 2?:T;}",
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: "interface U {è:T; 'Z':T; À?:T; '#'?:T;}",
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },

  /**
   * desc, required
   */
  {
    code: 'interface U {b:T; _:T; a?:T;}',
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },
  {
    code: 'interface U {c:T; a:T; b?:T;}',
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },
  {
    code: 'interface U {b_:T; b:T; a?:T;}',
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },
  {
    code: 'interface U {c:T; C:T; b_?:T;}',
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },
  {
    code: 'interface U {9:T; 11:T; 1:T; 111?:T;}',
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },
  {
    code: 'interface U {_:T; $:T; a?:T; A?:T;}',
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },
  {
    code: "interface U {'11':T; 10:T; 2?:T; 12?:T; 1?:T;}",
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },
  {
    code: "interface U {è:T; À:T; 'Z':T; '#'?:T;}",
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },

  /**
   * desc, natural, insensitive, not-required
   */
  {
    code: 'interface U {b:T; a?:T; _:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {c:T; b?:T; a:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {b_:T; b:T; a?:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {c:T; C:T; b_?:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {C:T; c:T; b_?:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {a?:T; A?:T; _:T; $:T;}',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {A:T; '11':T; 2?:T; 1:T;}",
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {è:T; À:T; 'Z':T; '#'?:T;}",
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },

  /**
   * index signatures
   */
  {
    code: `interface U<T> { [nkey: number]: T; [skey: string]: T; $: T; A: T; _: T; a: T; }`,
    optionsSet: [[SortingOrder.Ascending]],
  },
  {
    code: `interface U<T> { a: T; _: T; A: T; $: T; [skey: string]: T; [nkey: number]: T; }`,
    optionsSet: [[SortingOrder.Descending]],
  },
]

const invalid: readonly InvalidTestCase<Options>[] = [
  /**
   * default (asc)
   */
  {
    code: 'interface U {a:T; _:T; b:T;}',
    output: 'interface U {_:T; a:T; b:T;}',
    errors: ["Expected interface keys to be in ascending order. '_' should be before 'a'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {a:T; c:T; b:T;}',
    output: 'interface U {a:T; b:T; c:T;}',
    errors: ["Expected interface keys to be in ascending order. 'b' should be before 'c'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {b_:T; a:T; b:T;}',
    output: 'interface U {a:T; b_:T; b:T;}',
    errors: ["Expected interface keys to be in ascending order. 'a' should be before 'b_'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {b_:T; c:T; C:T;}',
    output: 'interface U {C:T; c:T; b_:T;}',
    errors: ["Expected interface keys to be in ascending order. 'C' should be before 'c'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {$:T; _:T; A:T; a:T;}',
    output: 'interface U {$:T; A:T; _:T; a:T;}',
    errors: ["Expected interface keys to be in ascending order. 'A' should be before '_'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {1:T; 2:T; A:T; '11':T;}",
    output: "interface U {1:T; '11':T; A:T; 2:T;}",
    errors: ["Expected interface keys to be in ascending order. '11' should be before 'A'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
    output: "interface U {'#':T; 'Z':T; À:T; è:T;}",
    errors: ["Expected interface keys to be in ascending order. 'Z' should be before 'À'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },

  /**
   * methods
   */
  {
    code: "interface U {1:T; 2:T; A():T; '11':T;}",
    output: "interface U {1:T; '11':T; A():T; 2:T;}",
    errors: ["Expected interface keys to be in ascending order. '11' should be before 'A'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {'#'():T; À():T; 'Z':T; è:T;}",
    output: "interface U {'#'():T; 'Z':T; À():T; è:T;}",
    errors: ["Expected interface keys to be in ascending order. 'Z' should be before 'À'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },

  /**
   * not ignore simple computed properties.
   */
  {
    code: 'interface U {a:T; b:T; ["a"]:T; c:T;}',
    output: 'interface U {a:T; ["a"]:T; b:T; c:T;}',
    errors: ["Expected interface keys to be in ascending order. 'a' should be before 'b'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },

  /**
   * nested
   */
  {
    code: 'interface U {a:T; c:{y:T; x:T;}, b:T;}',
    output: 'interface U {a:T; b:T; c:{y:T; x:T;}}',
    errors: [
      "Expected interface keys to be in ascending order. 'x' should be before 'y'.",
      "Expected interface keys to be in ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'type U = {a:T; c:{y:T; x:T;}, b:T;}',
    output: 'type U = {a:T; b:T; c:{y:T; x:T;}}',
    errors: [
      "Expected interface keys to be in ascending order. 'x' should be before 'y'.",
      "Expected interface keys to be in ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },

  /**
   * asc
   */
  {
    code: 'interface U {a:T; _:T; b:T;}',
    output: 'interface U {_:T; a:T; b:T;}',
    errors: ["Expected interface keys to be in ascending order. '_' should be before 'a'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {a:T; c:T; b:T;}',
    output: 'interface U {a:T; b:T; c:T;}',
    errors: ["Expected interface keys to be in ascending order. 'b' should be before 'c'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {b_:T; a:T; b:T;}',
    output: 'interface U {a:T; b_:T; b:T;}',
    errors: ["Expected interface keys to be in ascending order. 'a' should be before 'b_'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {b_:T; c:T; C:T;}',
    output: 'interface U {C:T; c:T; b_:T;}',
    errors: ["Expected interface keys to be in ascending order. 'C' should be before 'c'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {$:T; _:T; A:T; a:T;}',
    output: 'interface U {$:T; A:T; _:T; a:T;}',
    errors: ["Expected interface keys to be in ascending order. 'A' should be before '_'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {1:T; 2:T; A:T; '11':T;}",
    output: "interface U {1:T; '11':T; A:T; 2:T;}",
    errors: ["Expected interface keys to be in ascending order. '11' should be before 'A'."],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
    output: "interface U {'#':T; 'Z':T; À:T; è:T;}",
    errors: ["Expected interface keys to be in ascending order. 'Z' should be before 'À'."],
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
    code: 'interface U {a:T; _:T; b:T;}',
    output: 'interface U {_:T; a:T; b:T;}',
    errors: [
      "Expected interface keys to be in insensitive ascending order. '_' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'interface U {a:T; c:T; b:T;}',
    output: 'interface U {a:T; b:T; c:T;}',
    errors: [
      "Expected interface keys to be in insensitive ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'interface U {b_:T; a:T; b:T;}',
    output: 'interface U {a:T; b_:T; b:T;}',
    errors: [
      "Expected interface keys to be in insensitive ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'interface U {$:T; A:T; _:T; a:T;}',
    output: 'interface U {$:T; _:T; A:T; a:T;}',
    errors: [
      "Expected interface keys to be in insensitive ascending order. '_' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: "interface U {1:T; 2:T; A:T; '11':T;}",
    output: "interface U {1:T; '11':T; A:T; 2:T;}",
    errors: [
      "Expected interface keys to be in insensitive ascending order. '11' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
    output: "interface U {'#':T; 'Z':T; À:T; è:T;}",
    errors: [
      "Expected interface keys to be in insensitive ascending order. 'Z' should be before 'À'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },

  /**
   * asc, natural
   */
  {
    code: 'interface U {a:T; _:T; b:T;}',
    output: 'interface U {_:T; a:T; b:T;}',
    errors: ["Expected interface keys to be in natural ascending order. '_' should be before 'a'."],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: 'interface U {a:T; c:T; b:T;}',
    output: 'interface U {a:T; b:T; c:T;}',
    errors: ["Expected interface keys to be in natural ascending order. 'b' should be before 'c'."],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: 'interface U {b_:T; a:T; b:T;}',
    output: 'interface U {a:T; b_:T; b:T;}',
    errors: [
      "Expected interface keys to be in natural ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: 'interface U {b_:T; c:T; C:T;}',
    output: 'interface U {C:T; c:T; b_:T;}',
    errors: ["Expected interface keys to be in natural ascending order. 'C' should be before 'c'."],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: 'interface U {$:T; A:T; _:T; a:T;}',
    output: 'interface U {$:T; _:T; A:T; a:T;}',
    errors: ["Expected interface keys to be in natural ascending order. '_' should be before 'A'."],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: "interface U {1:T; 2:T; A:T; '11':T;}",
    output: "interface U {1:T; 2:T; '11':T; A:T;}",
    errors: [
      "Expected interface keys to be in natural ascending order. '11' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
    output: "interface U {'#':T; 'Z':T; À:T; è:T;}",
    errors: ["Expected interface keys to be in natural ascending order. 'Z' should be before 'À'."],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },

  /**
   * asc, natural, insensitive
   */
  {
    code: 'interface U {a:T; _:T; b:T;}',
    output: 'interface U {_:T; a:T; b:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive ascending order. '_' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {a:T; c:T; b:T;}',
    output: 'interface U {a:T; b:T; c:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {b_:T; a:T; b:T;}',
    output: 'interface U {a:T; b_:T; b:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {$:T; A:T; _:T; a:T;}',
    output: 'interface U {$:T; _:T; A:T; a:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive ascending order. '_' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: "interface U {1:T; '11':T; 2:T; A:T;}",
    output: "interface U {1:T; 2:T; '11':T; A:T;}",
    errors: [
      "Expected interface keys to be in natural insensitive ascending order. '2' should be before '11'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },
  {
    code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
    output: "interface U {'#':T; 'Z':T; À:T; è:T;}",
    errors: [
      "Expected interface keys to be in natural insensitive ascending order. 'Z' should be before 'À'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true, caseSensitive: false }]],
  },

  /**
   * asc, natural, insensitive, required
   */
  {
    code: 'interface U {_:T; a?:T; b:T;}',
    output: 'interface U {_:T; b:T; a?:T;}',
    errors: [
      "Expected interface keys to be in required first natural insensitive ascending order. 'b' should be before 'a'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {a:T; b?:T; c:T;}',
    output: 'interface U {a:T; c:T; b?:T;}',
    errors: [
      "Expected interface keys to be in required first natural insensitive ascending order. 'c' should be before 'b'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {b:T; a?:T; b_:T;}',
    output: 'interface U {b:T; b_:T; a?:T;}',
    errors: [
      "Expected interface keys to be in required first natural insensitive ascending order. 'b_' should be before 'a'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {C:T; b_?:T; c:T;}',
    output: 'interface U {C:T; c:T; b_?:T;}',
    errors: [
      "Expected interface keys to be in required first natural insensitive ascending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {C:T; b_?:T; c:T;}',
    output: 'interface U {C:T; c:T; b_?:T;}',
    errors: [
      "Expected interface keys to be in required first natural insensitive ascending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {$:T; A?:T; _:T; a?:T;}',
    output: 'interface U {$:T; _:T; A?:T; a?:T;}',
    errors: [
      "Expected interface keys to be in required first natural insensitive ascending order. '_' should be before 'A'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: "interface U {1:T; '11':T; 2?:T; A:T;}",
    output: "interface U {1:T; '11':T; A:T; 2?:T;}",
    errors: [
      "Expected interface keys to be in required first natural insensitive ascending order. 'A' should be before '2'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: "interface U {'Z':T; À:T; '#'?:T; è:T;}",
    output: "interface U {'Z':T; À:T; è:T; '#'?:T;}",
    errors: [
      "Expected interface keys to be in required first natural insensitive ascending order. 'è' should be before '#'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },

  /**
   * asc, natural, insensitive, not-required
   */
  {
    code: 'interface U {_:T; b:T; a?:T;}',
    output: 'interface U {_:T; a?:T; b:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive ascending order. 'a' should be before 'b'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {b?:T; a:T; c:T;}',
    output: 'interface U {a:T; b?:T; c:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive ascending order. 'a' should be before 'b'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {b:T; a?:T; b_:T;}',
    output: 'interface U {a?:T; b:T; b_:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive ascending order. 'a' should be before 'b'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {C:T; c:T; b_?:T;}',
    output: 'interface U {b_?:T; c:T; C:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive ascending order. 'b_' should be before 'c'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {C:T; b_?:T; c:T;}',
    output: 'interface U {b_?:T; C:T; c:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive ascending order. 'b_' should be before 'C'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {$:T; A?:T; _:T; a?:T;}',
    output: 'interface U {$:T; _:T; A?:T; a?:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive ascending order. '_' should be before 'A'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {1:T; '11':T; 2?:T; A:T;}",
    output: "interface U {1:T; 2?:T; '11':T; A:T;}",
    errors: [
      "Expected interface keys to be in natural insensitive ascending order. '2' should be before '11'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {'Z':T; À:T; '#'?:T; è:T;}",
    output: "interface U {'#'?:T; À:T; 'Z':T; è:T;}",
    errors: [
      "Expected interface keys to be in natural insensitive ascending order. '#' should be before 'À'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },

  /**
   * desc
   */
  {
    code: 'interface U {a:T; _:T; b:T;}',
    output: 'interface U {b:T; _:T; a:T;}',
    errors: ["Expected interface keys to be in descending order. 'b' should be before '_'."],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'interface U {a:T; c:T; b:T;}',
    output: 'interface U {c:T; a:T; b:T;}',
    errors: ["Expected interface keys to be in descending order. 'c' should be before 'a'."],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'interface U {b_:T; a:T; b:T;}',
    output: 'interface U {b_:T; b:T; a:T;}',
    errors: ["Expected interface keys to be in descending order. 'b' should be before 'a'."],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'interface U {b_:T; c:T; C:T;}',
    output: 'interface U {c:T; b_:T; C:T;}',
    errors: ["Expected interface keys to be in descending order. 'c' should be before 'b_'."],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'interface U {$:T; _:T; A:T; a:T;}',
    output: 'interface U {a:T; _:T; A:T; $:T;}',
    errors: [
      "Expected interface keys to be in descending order. '_' should be before '$'.",
      "Expected interface keys to be in descending order. 'a' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: "interface U {1:T; 2:T; A:T; '11':T;}",
    output: "interface U {A:T; 2:T; 1:T; '11':T;}",
    errors: [
      "Expected interface keys to be in descending order. '2' should be before '1'.",
      "Expected interface keys to be in descending order. 'A' should be before '2'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
    output: "interface U {è:T; À:T; 'Z':T; '#':T;}",
    errors: [
      "Expected interface keys to be in descending order. 'À' should be before '#'.",
      "Expected interface keys to be in descending order. 'è' should be before 'Z'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },

  /**
   * desc, insensitive
   */
  {
    code: 'interface U {a:T; _:T; b:T;}',
    output: 'interface U {b:T; _:T; a:T;}',
    errors: [
      "Expected interface keys to be in insensitive descending order. 'b' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'interface U {a:T; c:T; b:T;}',
    output: 'interface U {c:T; a:T; b:T;}',
    errors: [
      "Expected interface keys to be in insensitive descending order. 'c' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'interface U {b_:T; a:T; b:T;}',
    output: 'interface U {b_:T; b:T; a:T;}',
    errors: [
      "Expected interface keys to be in insensitive descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'interface U {b_:T; c:T; C:T;}',
    output: 'interface U {c:T; b_:T; C:T;}',
    errors: [
      "Expected interface keys to be in insensitive descending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'interface U {$:T; _:T; A:T; a:T;}',
    output: 'interface U {A:T; _:T; $:T; a:T;}',
    errors: [
      "Expected interface keys to be in insensitive descending order. '_' should be before '$'.",
      "Expected interface keys to be in insensitive descending order. 'A' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: "interface U {1:T; 2:T; A:T; '11':T;}",
    output: "interface U {A:T; 2:T; 1:T; '11':T;}",
    errors: [
      "Expected interface keys to be in insensitive descending order. '2' should be before '1'.",
      "Expected interface keys to be in insensitive descending order. 'A' should be before '2'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
    output: "interface U {è:T; À:T; 'Z':T; '#':T;}",
    errors: [
      "Expected interface keys to be in insensitive descending order. 'À' should be before '#'.",
      "Expected interface keys to be in insensitive descending order. 'è' should be before 'Z'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },

  /**
   * desc, natural
   */
  {
    code: 'interface U {a:T; _:T; b:T;}',
    output: 'interface U {b:T; _:T; a:T;}',
    errors: [
      "Expected interface keys to be in natural descending order. 'b' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'interface U {a:T; c:T; b:T;}',
    output: 'interface U {c:T; a:T; b:T;}',
    errors: [
      "Expected interface keys to be in natural descending order. 'c' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'interface U {b_:T; a:T; b:T;}',
    output: 'interface U {b_:T; b:T; a:T;}',
    errors: [
      "Expected interface keys to be in natural descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'interface U {b_:T; c:T; C:T;}',
    output: 'interface U {c:T; b_:T; C:T;}',
    errors: [
      "Expected interface keys to be in natural descending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'interface U {$:T; _:T; A:T; a:T;}',
    output: 'interface U {a:T; _:T; A:T; $:T;}',
    errors: [
      "Expected interface keys to be in natural descending order. '_' should be before '$'.",
      "Expected interface keys to be in natural descending order. 'A' should be before '_'.",
      "Expected interface keys to be in natural descending order. 'a' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: "interface U {1:T; 2:T; A:T; '11':T;}",
    output: "interface U {A:T; 2:T; 1:T; '11':T;}",
    errors: [
      "Expected interface keys to be in natural descending order. '2' should be before '1'.",
      "Expected interface keys to be in natural descending order. 'A' should be before '2'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
    output: "interface U {è:T; À:T; 'Z':T; '#':T;}",
    errors: [
      "Expected interface keys to be in natural descending order. 'À' should be before '#'.",
      "Expected interface keys to be in natural descending order. 'è' should be before 'Z'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },

  /**
   * desc, natural, insensitive
   */
  {
    code: 'interface U {a:T; _:T; b:T;}',
    output: 'interface U {b:T; _:T; a:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive descending order. 'b' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {a:T; c:T; b:T;}',
    output: 'interface U {c:T; a:T; b:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive descending order. 'c' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {b_:T; a:T; b:T;}',
    output: 'interface U {b_:T; b:T; a:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {b_:T; c:T; C:T;}',
    output: 'interface U {c:T; b_:T; C:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive descending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: 'interface U {$:T; _:T; A:T; a:T;}',
    output: 'interface U {A:T; _:T; $:T; a:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive descending order. '_' should be before '$'.",
      "Expected interface keys to be in natural insensitive descending order. 'A' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: "interface U {1:T; 2:T; '11':T; A:T;}",
    output: "interface U {A:T; 2:T; '11':T; 1:T;}",
    errors: [
      "Expected interface keys to be in natural insensitive descending order. '2' should be before '1'.",
      "Expected interface keys to be in natural insensitive descending order. '11' should be before '2'.",
      "Expected interface keys to be in natural insensitive descending order. 'A' should be before '11'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },
  {
    code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
    output: "interface U {è:T; À:T; 'Z':T; '#':T;}",
    errors: [
      "Expected interface keys to be in natural insensitive descending order. 'À' should be before '#'.",
      "Expected interface keys to be in natural insensitive descending order. 'è' should be before 'Z'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true, caseSensitive: false }]],
  },

  /**
   * desc, natural, insensitive, required
   */
  {
    code: 'interface U {_:T; a?:T; b:T;}',
    output: 'interface U {b:T; a?:T; _:T;}',
    errors: [
      "Expected interface keys to be in required first natural insensitive descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {b:T; a?:T; _:T;}',
    output: 'interface U {b:T; _:T; a?:T;}',
    errors: [
      "Expected interface keys to be in required first natural insensitive descending order. '_' should be before 'a'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {b:T; b_:T; a?:T;}',
    output: 'interface U {b_:T; b:T; a?:T;}',
    errors: [
      "Expected interface keys to be in required first natural insensitive descending order. 'b_' should be before 'b'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {c:T; b_?:T; C:T;}',
    output: 'interface U {c:T; C:T; b_?:T;}',
    errors: [
      "Expected interface keys to be in required first natural insensitive descending order. 'C' should be before 'b_'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {b_?:T; C:T; c:T;}',
    output: 'interface U {C:T; b_?:T; c:T;}',
    errors: [
      "Expected interface keys to be in required first natural insensitive descending order. 'C' should be before 'b_'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: 'interface U {_:T; a?:T; $:T; A?:T;}',
    output: 'interface U {_:T; $:T; a?:T; A?:T;}',
    errors: [
      "Expected interface keys to be in required first natural insensitive descending order. '$' should be before 'a'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: "interface U {2?:T; A:T; 1:T; '11':T;}",
    output: "interface U {A:T; 2?:T; 1:T; '11':T;}",
    errors: [
      "Expected interface keys to be in required first natural insensitive descending order. 'A' should be before '2'.",
      "Expected interface keys to be in required first natural insensitive descending order. '11' should be before '1'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: "interface U {è:T; 'Z':T; '#'?:T; À?:T;}",
    output: "interface U {è:T; 'Z':T; À?:T; '#'?:T;}",
    errors: [
      "Expected interface keys to be in required first natural insensitive descending order. 'À' should be before '#'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },
  {
    code: "interface U {À?:T; 'Z':T; '#'?:T; è:T;}",
    output: "interface U {è:T; 'Z':T; '#'?:T; À?:T;}",
    errors: [
      "Expected interface keys to be in required first natural insensitive descending order. 'Z' should be before 'À'.",
      "Expected interface keys to be in required first natural insensitive descending order. 'è' should be before '#'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: true }],
    ],
  },

  /**
   * desc, natural, insensitive, not-required
   */
  {
    code: 'interface U {_:T; a?:T; b:T;}',
    output: 'interface U {b:T; a?:T; _:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive descending order. 'a' should be before '_'.",
      "Expected interface keys to be in natural insensitive descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {a?:T; b:T; _:T;}',
    output: 'interface U {b:T; a?:T; _:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {b:T; b_:T; a?:T;}',
    output: 'interface U {b_:T; b:T; a?:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive descending order. 'b_' should be before 'b'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {c:T; b_?:T; C:T;}',
    output: 'interface U {c:T; C:T; b_?:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive descending order. 'C' should be before 'b_'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {b_?:T; C:T; c:T;}',
    output: 'interface U {C:T; b_?:T; c:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive descending order. 'C' should be before 'b_'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: 'interface U {_:T; a?:T; $:T; A?:T;}',
    output: 'interface U {a?:T; _:T; $:T; A?:T;}',
    errors: [
      "Expected interface keys to be in natural insensitive descending order. 'a' should be before '_'.",
      "Expected interface keys to be in natural insensitive descending order. 'A' should be before '$'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {2?:T; A:T; 1:T; '11':T;}",
    output: "interface U {A:T; 2?:T; 1:T; '11':T;}",
    errors: [
      "Expected interface keys to be in natural insensitive descending order. 'A' should be before '2'.",
      "Expected interface keys to be in natural insensitive descending order. '11' should be before '1'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {è:T; 'Z':T; '#'?:T; À?:T;}",
    output: "interface U {è:T; À?:T; '#'?:T; 'Z':T;}",
    errors: [
      "Expected interface keys to be in natural insensitive descending order. 'À' should be before '#'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },
  {
    code: "interface U {À?:T; 'Z':T; '#'?:T; è:T;}",
    output: "interface U {è:T; 'Z':T; '#'?:T; À?:T;}",
    errors: [
      "Expected interface keys to be in natural insensitive descending order. 'è' should be before '#'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false, requiredFirst: false }],
    ],
  },

  /**
   * index signatures
   */
  {
    code: 'interface U<T> { A: T; [skey: string]: T; _: T; }',
    output: 'interface U<T> { [skey: string]: T; A: T; _: T; }',
    errors: [
      "Expected interface keys to be in ascending order. '[index: skey]' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Ascending]],
  },
  {
    code: 'interface U<T> { _: T; [skey: string]: T; A: T; }',
    output: 'interface U<T> { _: T; A: T; [skey: string]: T; }',
    errors: [
      "Expected interface keys to be in descending order. 'A' should be before '[index: skey]'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },
]

describe('TypeScript', () => {
  const ruleTester = new RuleTester(typescript)

  ruleTester.run(name, rule as unknown as Rule.RuleModule, {
    valid: processValidTestCase(valid),
    invalid: processInvalidTestCase(invalid),
  })
})
