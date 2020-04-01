const plugin = require('../lib/index');

const RULE_NAME_PREFIX = 'typescript-sort-keys/';

// function entriesToObject<T = unknown>(value: [string, T][]): Record<string, T> {
//   return value.reduce<Record<string, T>>((accum, [k, v]) => {
//     accum[k] = v;
//     return accum;
//   }, {});
// }

const entriesToObject = value =>
  value.reduce((accum, [k, v]) => {
    return { ...accum, [k]: v };
  }, {});

describe('recommended config', () => {
  const {
    rules,
    configs: {
      recommended: { rules: configRules },
    },
  } = plugin;

  const ruleConfigs = Object.entries(rules)
    .filter(
      ([, rule]) => rule.meta.docs && rule.meta.docs.recommended !== false,
    )
    .map(([name, rule]) => [
      `${RULE_NAME_PREFIX}${name}`,
      rule.meta.docs && rule.meta.docs.recommended ? 'error' : 'off',
    ]);

  it('contains all recommended rules', () => {
    expect(entriesToObject(ruleConfigs)).toEqual(configRules);
  });
});
