import {
  getEarliestNode,
  getNextNonCommentNode,
  getPreviousNonCommentNode,
} from '../../../../src/utils/sourcecode'
import { getSourceCode } from '../../../helpers/eslint'

describe('nodeHelpers.spec.ts coverage', () => {
  const code = 'enum U /**/{/**/A = "a", /**/B = "b", /**/C = "c"}/**/'
  const sourceCode = getSourceCode(code)
  const nodes = ['A', 'B', 'C'].map(_ => sourceCode.getNodeByRangeIndex(code.indexOf(_)))

  describe('getEarliestNode', () => {
    it('returns correct value from out of order array', () => {
      const nodesReversed = Array.from(nodes).reverse()
      const result = getEarliestNode(nodesReversed)
      expect(result).toEqual(nodes[0])
    })
  })

  describe('getNextNonCommentNode', () => {
    it('returns nullish when given final node', () => {
      const result = getNextNonCommentNode(
        sourceCode,
        sourceCode.getNodeByRangeIndex(code.indexOf('}')),
      )
      expect(result).toBeFalsy()
    })
    it('returns truthy when given middle node', () => {
      const result = getNextNonCommentNode(sourceCode, nodes[1])
      expect(result).toBeTruthy()
    })
  })

  describe('getPreviousNonCommentNode', () => {
    it('returns nullish when given first node', () => {
      const result = getPreviousNonCommentNode(
        sourceCode,
        sourceCode.getNodeByRangeIndex(code.indexOf('{')),
      )
      expect(result).toBeFalsy()
    })
    it('returns truthy when given middle node', () => {
      const result = getPreviousNonCommentNode(sourceCode, nodes[1])
      expect(result).toBeTruthy()
    })
  })
})
