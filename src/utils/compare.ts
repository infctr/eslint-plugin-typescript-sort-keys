import naturalCompare from 'natural-compare-lite';

import { indexSignature } from './common';

function charCompare(a: string, b: string) {
  if (a < b) {
    return -1;
  }

  if (b < a) {
    return 1;
  }

  return 0;
}

function getWeight(value: string) {
  switch (true) {
    // Custom name for index signature used here
    case indexSignature.regex.test(value):
      return 100;
    default:
      return 0;
  }
}

function weightedCompare(
  a: string,
  b: string,
  compareFn: (a: string, b: string) => number,
) {
  return compareFn(a, b) - getWeight(a) + getWeight(b);
}

/**
 * Functions which check that the given 2 names are in specific order.
 *
 * Postfix `I` is meant insensitive.
 * Postfix `N` is meant natural.
 */
export const compareFunctions = {
  asc(a: string, b: string) {
    return weightedCompare(a, b, charCompare);
  },
  ascI(a: string, b: string) {
    return weightedCompare(a.toLowerCase(), b.toLowerCase(), charCompare);
  },
  ascN(a: string, b: string) {
    return weightedCompare(a, b, naturalCompare);
  },
  ascIN(a: string, b: string) {
    return weightedCompare(a.toLowerCase(), b.toLowerCase(), naturalCompare);
  },
  desc(a: string, b: string) {
    return compareFunctions.asc(b, a);
  },
  descI(a: string, b: string) {
    return compareFunctions.ascI(b, a);
  },
  descN(a: string, b: string) {
    return compareFunctions.ascN(b, a);
  },
  descIN(a: string, b: string) {
    return compareFunctions.ascIN(b, a);
  },
};
