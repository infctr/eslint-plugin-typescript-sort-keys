import {
  AllRuleOptions,
  CreateReporterArgs,
  SortingOrder,
  SortingParamsOptions,
} from '../types'

export const defaultSortingOrder = SortingOrder.Ascending
export const defaultOptions: SortingParamsOptions = {
  caseSensitive: true,
  natural: false,
  requiredFirst: false,
}

/**
 * Get the options from the context
 */
export function getOptions(
  context: CreateReporterArgs<string, AllRuleOptions>['context'],
) {
  const order = context.options[0] || defaultSortingOrder
  const options = context.options[1]
  const isAscending = order === SortingOrder.Ascending
  const isInsensitive = !(options?.caseSensitive ?? defaultOptions.caseSensitive)
  const isNatural = options?.natural ?? defaultOptions.natural
  const isRequiredFirst = options?.requiredFirst ?? defaultOptions.requiredFirst

  return {
    isAscending,
    isInsensitive,
    isNatural,
    isRequiredFirst,
    order,
  }
}
