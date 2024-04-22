import recommended from './config/recommended.config'
import requiredFirst from './config/requiredFirst.config'
import { rules } from './rules'

const config = {
  rules,
  configs: {
    recommended,
    requiredFirst,
  },
}

export default config
