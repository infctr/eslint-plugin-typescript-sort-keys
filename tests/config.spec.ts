import { readdirSync } from 'fs';

import plugin from '../src';

const RULE_NAME_PREFIX = 'typescript-sort-keys/';

function entriesToObject<T = unknown>(value: readonly [string, T][]): Record<string, T> {
  return value.reduce<Record<string, T>>((accum, [k, v]) => {
    accum[k] = v;
    return accum;
  }, {});
}

describe('recommended config', () => {
  const {
    rules,
    configs: {
      recommended: { rules: configRules },
    },
  } = plugin;

  const ruleConfigs = Object.entries(rules)
    .filter(([, rule]) => rule.meta.docs && rule.meta.docs.recommended !== false)
    .map<[string, string]>(([name, rule]) => [
      `${RULE_NAME_PREFIX}${name}`,
      rule.meta.docs && rule.meta.docs.recommended ? 'error' : 'off',
    ]);

  it('contains all recommended rules', () => {
    expect(entriesToObject(ruleConfigs)).toEqual(configRules);
  });
});

describe('plugin', () => {
  const ruleFiles: ReadonlyArray<string> = readdirSync('./src/rules').filter(
    file => file !== 'index.ts' && file.endsWith('.ts'),
  );

  const configFiles: ReadonlyArray<string> = readdirSync('./src/config').filter(
    file => file !== 'index.ts' && file.endsWith('.ts'),
  );

  it('should have all the rules', () => {
    expect(plugin).toHaveProperty('rules');
    expect(Object.keys(plugin.rules)).toHaveLength(ruleFiles.length);
  });

  it('should have all the configs', () => {
    expect(plugin).toHaveProperty('configs');
    expect(Object.keys(plugin.configs)).toHaveLength(configFiles.length);
  });
});
