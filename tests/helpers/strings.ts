import { OptionsSetsKey } from './options'

// Check src/report.ts for option string ordering
// Only options set differently from default are printed
export const orderStrings: Record<OptionsSetsKey, string> = {
  ascendingInsensitiveNaturalNotRequired: 'ascending insensitive, natural',
  ascendingInsensitiveNaturalRequired: 'ascending required-first, insensitive, natural',
  ascendingInsensitiveNonNaturalNotRequired: 'ascending insensitive',
  ascendingSensitiveNaturalNotRequired: 'ascending natural',
  ascendingSensitiveNonNaturalNotRequired: 'ascending',
  ascendingSensitiveNonNaturalRequired: 'ascending required-first',
  ascendingWithDefaults: 'ascending',
  noOptions: 'ascending',

  descendingInsensitiveNaturalNotRequired: 'descending insensitive, natural',
  descendingInsensitiveNaturalRequired: 'descending required-first, insensitive, natural',
  descendingInsensitiveNonNaturalNotRequired: 'descending insensitive',
  descendingSensitiveNaturalNotRequired: 'descending natural',
  descendingSensitiveNonNaturalRequired: 'descending required-first',
  descendingWithDefaults: 'descending',
}

export enum CaseCategory {
  Interface,
  Enum,
}

function getCategoryErrorString(category: CaseCategory) {
  switch (category) {
    case CaseCategory.Interface:
      return 'interface keys'
    case CaseCategory.Enum:
    default:
      return 'enum members'
  }
}

function getCategoryParentErrorString(category: CaseCategory) {
  switch (category) {
    case CaseCategory.Interface:
      return 'key'
    case CaseCategory.Enum:
    default:
      return 'member'
  }
}

export const getSwapErrorString = (
  category: CaseCategory,
  order: OptionsSetsKey,
  a: string,
  b: string,
) => {
  return `Expected ${getCategoryErrorString(category)} to be in ${
    orderStrings[order]
  } order. '${a}' should be before '${b}'. Run autofix to sort entire body.`
}

export const getEndErrorString = (
  category: CaseCategory,
  order: OptionsSetsKey,
  a: string,
) =>
  `Expected ${getCategoryErrorString(category)} to be in ${
    orderStrings[order]
  } order. '${a}' should be at the end. Run autofix to sort entire body.`

export const getCountErrorString = (category: CaseCategory, count: number) =>
  `Found ${count} ${getCategoryParentErrorString(category)}${
    count > 1 ? 's' : ''
  } out of order.`
