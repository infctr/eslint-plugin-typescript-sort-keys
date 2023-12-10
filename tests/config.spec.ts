import { readdirSync } from 'fs'

import { RuleModule } from '@typescript-eslint/utils/ts-eslint'

import plugin from '../src'
import { PLUGIN_NAME } from '../src/config/constants'
import { isNotDeprecated } from './helpers/configs'

describe('recommended config', () => {
  const {
    rules: allRules,
    configs: {
      recommended: { rules: pluginRules },
    },
  } = plugin

  it('contains all recommended rules', () => {
    // Get non-deprecated rules with recommended set and map to config format
    const recommendedRules = Object.fromEntries(
      (
        Object.entries(allRules).filter(
          ([name, rule]) => !!rule.meta.docs?.recommended && isNotDeprecated(name),
        ) as Array<[string, RuleModule<string, unknown[]>]>
      ).map(([name]) => [`${PLUGIN_NAME}/${name}`, 'error']),
    )

    expect(recommendedRules).toEqual(pluginRules)
  })
})

describe('recommended plugin', () => {
  const ruleFiles: readonly string[] = readdirSync('./src/rules').filter(
    file => file !== 'index.ts' && file.endsWith('.ts'),
  )

  it('should have all the rules', () => {
    expect(plugin).toHaveProperty('rules')
    expect(Object.keys(plugin.rules)).toHaveLength(ruleFiles.length)
  })

  it('should have the recommended config', () => {
    expect(plugin).toHaveProperty('configs')
    expect(Object.keys(plugin.configs)).toHaveLength(1)
  })
})
