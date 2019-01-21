'use strict';

const naturalCompare = require('natural-compare-lite');

/**
 * Functions which check that the given 2 names are in specific order.
 *
 * Postfix `I` is meant insensitive.
 * Postfix `N` is meant natural.
 */
const validOrders = {
  asc(a, b) {
    return a <= b;
  },
  ascI(a, b) {
    return a.toLowerCase() <= b.toLowerCase();
  },
  ascN(a, b) {
    return naturalCompare(a, b) <= 0;
  },
  ascIN(a, b) {
    return naturalCompare(a.toLowerCase(), b.toLowerCase()) <= 0;
  },
  desc(a, b) {
    return validOrders.asc(b, a);
  },
  descI(a, b) {
    return validOrders.ascI(b, a);
  },
  descN(a, b) {
    return validOrders.ascN(b, a);
  },
  descIN(a, b) {
    return validOrders.ascIN(b, a);
  },
};

module.exports = {
  validOrders: validOrders,
};
