const naturalCompare = require('natural-compare-lite');

function charCompare(a, b) {
  if (a < b) {
    return -1;
  }
  if (b < a) {
    return 1;
  }
  return 0;
}

function getWeight(value) {
  switch (true) {
    // Index signature
    case /^\[index:/.test(value):
      return 100;
    default:
      return 0;
  }
}

function weightedCompare(a, b, compareFn) {
  return compareFn(a, b) - getWeight(a) + getWeight(b);
}

/**
 * Functions which check that the given 2 names are in specific order.
 *
 * Postfix `I` is meant insensitive.
 * Postfix `N` is meant natural.
 */
const compareFunctions = {
  asc(a, b) {
    return weightedCompare(a, b, charCompare);
  },
  ascI(a, b) {
    return weightedCompare(a.toLowerCase(), b.toLowerCase(), charCompare);
  },
  ascN(a, b) {
    return weightedCompare(a, b, naturalCompare);
  },
  ascIN(a, b) {
    return weightedCompare(a.toLowerCase(), b.toLowerCase(), naturalCompare);
  },
  desc(a, b) {
    return compareFunctions.asc(b, a);
  },
  descI(a, b) {
    return compareFunctions.ascI(b, a);
  },
  descN(a, b) {
    return compareFunctions.ascN(b, a);
  },
  descIN(a, b) {
    return compareFunctions.ascIN(b, a);
  },
};

exports.compareFunctions = compareFunctions;
