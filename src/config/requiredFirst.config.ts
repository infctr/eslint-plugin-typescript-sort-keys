import { Linter } from '@typescript-eslint/utils/ts-eslint'

import { defaultOptions, defaultSortingOrder } from '../common/options'
import { PLUGIN_NAME } from './constants'
import recommended from './recommended.config'

export default {
  plugins: recommended.plugins,
  rules: {
    ...recommended.rules,
    [`${PLUGIN_NAME}/interface`]: [
      'error' as const,
      defaultSortingOrder,
      { ...defaultOptions, requiredFirst: true },
    ] as Linter.RuleEntry,
  },
}
