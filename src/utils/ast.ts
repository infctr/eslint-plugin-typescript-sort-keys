import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/experimental-utils';

import { indexSignature } from './common';

export function getObjectBody(
  node:
    | TSESTree.TSEnumDeclaration
    | TSESTree.TSInterfaceDeclaration
    | TSESTree.TSTypeLiteral,
) {
  switch (node.type) {
    case AST_NODE_TYPES.TSInterfaceDeclaration:
      return node.body.body;
    case AST_NODE_TYPES.TSEnumDeclaration:
    case AST_NODE_TYPES.TSTypeLiteral:
      return node.members;
  }
}

function getProperty(node: TSESTree.Node) {
  switch (node.type) {
    case AST_NODE_TYPES.TSIndexSignature:
      if (node.parameters.length > 0) {
        const [identifier] = node.parameters;

        return {
          ...identifier,
          // Override name for error message readability and weight calculation
          name: indexSignature.create(
            (identifier as TSESTree.Parameter & { name: string }).name,
          ),
        };
      }

      return null;

    case AST_NODE_TYPES.TSPropertySignature:
    case AST_NODE_TYPES.TSMethodSignature:
      return node.key;

    case AST_NODE_TYPES.TSEnumMember:
      return node.id;

    default:
      return null;
  }
}

/**
 * Gets the property name of the given `Property` node.
 *
 * - If the property's key is an `Identifier` node, this returns the key's name
 *   whether it's a computed property or not.
 * - If the property has a static name, this returns the static name.
 * - Otherwise, this returns null.
 *
 *     a.b           // => "b"
 *     a["b"]        // => "b"
 *     a['b']        // => "b"
 *     a[`b`]        // => "b"
 *     a[100]        // => "100"
 *     a[b]          // => null
 *     a["a" + "b"]  // => null
 *     a[tag`b`]     // => null
 *     a[`${b}`]     // => null
 *
 *     let a = {b: 1}            // => "b"
 *     let a = {["b"]: 1}        // => "b"
 *     let a = {['b']: 1}        // => "b"
 *     let a = {[`b`]: 1}        // => "b"
 *     let a = {[100]: 1}        // => "100"
 *     let a = {[b]: 1}          // => null
 *     let a = {["a" + "b"]: 1}  // => null
 *     let a = {[tag`b`]: 1}     // => null
 *     let a = {[`${b}`]: 1}     // => null
 */
export function getPropertyName(node: TSESTree.Node): string | null {
  if (!node.type) {
    return null;
  }

  const property = getProperty(node);

  if (!property) {
    return null;
  }

  switch (property.type) {
    case AST_NODE_TYPES.Literal:
      return String(property.value);

    case AST_NODE_TYPES.TemplateLiteral:
      return property.expressions.length === 0 && property.quasis.length === 1
        ? property.quasis[0].value.cooked
        : null;

    case AST_NODE_TYPES.Identifier:
      return (node as TSESTree.Node & { computed?: boolean }).computed
        ? null
        : property.name;

    default:
      return null;
  }
}
