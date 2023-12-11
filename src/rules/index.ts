import { RuleModule } from '@typescript-eslint/utils/ts-eslint'
import {
  RuleOptions as EnumRuleOptions,
  name as enumName,
  rule as enumRule,
} from './enum'
import {
  RuleOptions as InterfaceRuleOptions,
  name as interfaceName,
  rule as interfaceRule,
} from './interface'
import {
  RuleOptions as EnumRuleOptionsDeprecated,
  name as enumNameDeprecated,
  rule as enumRuleDeprecated,
} from './string-enum'

export const rules: Record<
  string,
  RuleModule<string, InterfaceRuleOptions | EnumRuleOptions | EnumRuleOptionsDeprecated>
> = {
  [interfaceName]: interfaceRule,
  [enumName]: enumRule,
  [enumNameDeprecated]: enumRuleDeprecated,
}

export { EnumRuleOptions, InterfaceRuleOptions }
