import { JSONSchema4 } from 'json-schema';

export enum SortingOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

export const sortingOrderOptionSchema: JSONSchema4 = {
  enum: [SortingOrder.Ascending, SortingOrder.Descending],
};

export type SortingOrderOption = SortingOrder;

export const sortingParamsOptionSchema: JSONSchema4 = {
  type: 'object',
  properties: {
    caseSensitive: {
      type: 'boolean',
    },
    natural: {
      type: 'boolean',
    },
  },
  additionalProperties: false,
};

export interface SortingParamsOption {
  readonly caseSensitive: boolean;
  readonly natural: boolean;
}

export enum ErrorMessage {
  InterfaceInvalidOrder = `Expected interface keys to be in {{ natural }}{{ insensitive }}{{ order }}ending order. '{{ thisName }}' should be before '{{ prevName }}'.`,
  StringEnumInvalidOrder = `Expected string enum members to be in {{ natural }}{{ insensitive }}{{ order }}ending order. '{{ thisName }}' should be before '{{ prevName }}'.`,
}
