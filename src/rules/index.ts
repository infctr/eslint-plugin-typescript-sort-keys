import { name as interfaceName, rule as interfaceRule } from './interface';
import { name as stringEnumName, rule as stringEnumRule } from './string-enum';

export const rules = {
  [interfaceName]: interfaceRule,
  [stringEnumName]: stringEnumRule,
};
