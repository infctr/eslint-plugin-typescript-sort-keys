export enum ErrorMessage {
  InterfaceParentInvalidOrder = `Found {{ unsortedCount }} key{{plural}} out of {{ order }}ending {{ options }}order.`,
  EnumParentInvalidOrder = `Found {{ unsortedCount }} member{{plural}} out of {{ order }}ending {{ options }}order.{{ notice }}`,
  InterfaceInvalidOrder = `Property '{{ nodeName }}' should be {{ messageShouldBeWhere }}.`,
  EnumInvalidOrder = `Member '{{ nodeName }}' should be {{ messageShouldBeWhere }}.`,
}
