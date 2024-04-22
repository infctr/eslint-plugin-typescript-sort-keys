import { JSONSchema4 } from '@typescript-eslint/utils/json-schema'

export enum SortingOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

export const sortingOrderOptionSchema: JSONSchema4 = {
  enum: [SortingOrder.Ascending, SortingOrder.Descending],
  type: 'string',
}

export interface SortingParams {
  readonly caseSensitive: boolean
  readonly natural: boolean
  readonly requiredFirst: boolean
}
