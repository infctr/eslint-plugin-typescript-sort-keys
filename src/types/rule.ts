import { SortingOrder, SortingParams } from './options'

export type RuleOptionsGeneric<T> = [] | [SortingOrder] | [SortingOrder, Partial<T>]

export type AllRuleOptions = RuleOptionsGeneric<SortingParams>
