import {
  getTextBetweenNodeAndNext,
  getTextBetweenNodeAndPrevious,
} from '../../../../src/utils/sourcecode'
import { getSourceCode } from '../../../helpers/eslint'

describe('textHelpers.spec.ts coverage', () => {
  const code = 'enum U {A = "a", B = "b"}'
  const sourceCode = getSourceCode(code)
  const nodes = ['{', '}'].map(_ => sourceCode.getNodeByRangeIndex(code.indexOf(_)))

  describe('getTextBetweenNodeAndPrevious', () => {
    it('returns empty string given first node', () => {
      const result = getTextBetweenNodeAndPrevious(sourceCode, nodes[0])
      expect(result).toBe('')
    })
  })

  describe('getTextBetweenNodeAndNext', () => {
    it('returns empty string given last node', () => {
      const result = getTextBetweenNodeAndNext(sourceCode, nodes.at(-1))
      expect(result).toBe('')
    })
  })
})
