import naturalCompare from 'natural-compare-lite'

import { indexSignature } from './common'

function charCompare(a: string, b: string) {
  if (a < b) {
    return -1
  }

  if (b < a) {
    return 1
  }

  return 0
}

function getWeight(value: string) {
  // Custom name for index signature used here
  if (indexSignature.regex.test(value)) {
    return 100
  }
  return 0
}

function weightedCompare(
  a: string,
  b: string,
  compareFn: (a: string, b: string) => number,
) {
  return compareFn(a, b) - getWeight(a) + getWeight(b)
}

const ascending = (a: string, b: string) => {
  return weightedCompare(a, b, charCompare)
}

const ascendingInsensitive = (a: string, b: string) => {
  return weightedCompare(a.toLowerCase(), b.toLowerCase(), charCompare)
}

const ascendingNatural = (a: string, b: string) => {
  return weightedCompare(a, b, naturalCompare)
}

const ascendingInsensitiveNatural = (a: string, b: string) => {
  return weightedCompare(a.toLowerCase(), b.toLowerCase(), naturalCompare)
}

/**
 * Functions which check that the given 2 names are in specific order.
 */
export const compareFn = (
  isAscending: boolean,
  isInsensitive: boolean,
  isNatural: boolean,
) => {
  return (...args: [string?, string?]) => {
    if (args.filter(Boolean).length !== 2) {
      return 0
    }

    const input = (isAscending ? args : args.reverse()) as [string, string]

    if (isInsensitive && isNatural) {
      return ascendingInsensitiveNatural(...input)
    }

    if (!isInsensitive && isNatural) {
      return ascendingNatural(...input)
    }

    if (isInsensitive && !isNatural) {
      return ascendingInsensitive(...input)
    }

    return ascending(...input)
  }
}
