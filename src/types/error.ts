export enum ErrorMessage {
  InterfaceParentInvalidOrder = `Found {{ unsortedCount }} keys out of order.`,
  EnumParentInvalidOrder = `{{ notice }}Found {{ unsortedCount }} members out of order.`,
  InterfaceInvalidOrder = `Expected interface keys to be in {{ order }}ending {{ options }}order. '{{ nodeName }}' should be {{ messageShouldBeWhere }}. Run autofix to sort entire body.`,
  EnumInvalidOrder = `{{ notice }}Expected enum members to be in {{ order }}ending {{ options }}order. '{{ nodeName }}' should be {{ messageShouldBeWhere }}. Run autofix to sort entire body.`,
}
