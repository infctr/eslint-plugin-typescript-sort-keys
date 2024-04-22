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
      return 'Property'
    case CaseCategory.Enum:
    default:
      return 'Member'
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

export const getSwapErrorString = (category: CaseCategory, a: string, b: string) => {
  return `${getCategoryErrorString(category)} '${a}' should be before '${b}'.`
}

export const getEndErrorString = (category: CaseCategory, a: string) =>
  `${getCategoryErrorString(category)} '${a}' should be at the end.`

export const getCountErrorString = (
  category: CaseCategory,
  order: OptionsSetsKey,
  count: number,
) =>
  `Found ${count} ${getCategoryParentErrorString(category)}${
    count > 1 ? 's' : ''
  } out of ${orderStrings[order]} order.`
