export enum ErrorMessage {
  InterfaceParentInvalidOrder = `Found {{ unsortedCount }} keys out of order.`,
  EnumParentInvalidOrder = `Found {{ unsortedCount }} members out of order.{{ notice }}`,
  InterfaceInvalidOrder = `Expected interface keys to be in {{ order }}ending {{ options }}order. '{{ nodeName }}' should be {{ messageShouldBeWhere }}. Run autofix to sort entire body.`,
  EnumInvalidOrder = `Expected enum members to be in {{ order }}ending {{ options }}order. '{{ nodeName }}' should be {{ messageShouldBeWhere }}. Run autofix to sort entire body.{{ notice }}`,
}
