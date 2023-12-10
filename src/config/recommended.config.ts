import { PLUGIN_NAME } from './constants'

export default {
  plugins: [PLUGIN_NAME],
  rules: {
    [`${PLUGIN_NAME}/interface`]: 'error' as const,
    [`${PLUGIN_NAME}/enum`]: 'error' as const,
  },
}
