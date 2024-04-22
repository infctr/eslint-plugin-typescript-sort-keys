import { getNodePunctuator } from '../../../../src/utils/sourcecode'
import { getSourceCode } from '../../../helpers/eslint'

describe('punctuationHelpers.spec.ts coverage', () => {
  describe('getNodePunctuator', () => {
    it('returns nullish', () => {
      const code = 'enum U {A = "a"}'
      const sourceCode = getSourceCode(code)
      const result = getNodePunctuator(
        sourceCode,
        sourceCode.getNodeByRangeIndex(code.indexOf('A')),
      )
      expect(result).toBeFalsy()
    })

    it('returns punctuator when node parent is nullish', () => {
      const code = 'interface U {A: string; b: string;}'
      const sourceCode = getSourceCode(code)
      const node = sourceCode.getNodeByRangeIndex(code.indexOf('A'))
      node['parent'] = undefined

      const result = getNodePunctuator(sourceCode, node)
      expect(result).toBeTruthy()
    })
  })
})
