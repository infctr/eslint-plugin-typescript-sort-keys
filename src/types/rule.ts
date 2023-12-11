import { SortingOrderOption, SortingParamsOptions } from './options'

export type RuleOptionsGeneric<T> =
  | []
  | [SortingOrderOption]
  | [SortingOrderOption, Partial<T>]

export type AllRuleOptions = RuleOptionsGeneric<SortingParamsOptions>
