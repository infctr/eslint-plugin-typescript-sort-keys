import { AST_TOKEN_TYPES, TSESTree } from '@typescript-eslint/utils'

import { getCommentsBefore } from '../../../../src/utils/sourcecode'
import { getSourceCode } from '../../../helpers/eslint'

describe('commentHelpers.spec.ts coverage', () => {
  it('returns empty array with no prevNode', () => {
    const code = 'enum U {A = "a", B = "b", C = "c"}'
    const sourceCode = getSourceCode(code)
    const result = getCommentsBefore(sourceCode, sourceCode.getNodeByRangeIndex(0))
    expect(result).toEqual([])
  })

  it('returns comment of specified type', () => {
    const code = 'enum U {A = "a", /* b */ B = "b", C = "c"}'
    const sourceCode = getSourceCode(code)
    const result: TSESTree.Comment[] = getCommentsBefore(
      sourceCode,
      sourceCode.getTokenByRangeStart(code.indexOf('B')),
      AST_TOKEN_TYPES.Block,
    )
    expect(result[0].value).toBe(' b ')
  })
})
