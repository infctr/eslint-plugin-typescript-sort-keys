import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils'

import { TSType } from 'types'
import { indexSignature } from './common'

export function getObjectBody(
  node:
    | TSESTree.TSEnumDeclaration
    | TSESTree.TSInterfaceDeclaration
    | TSESTree.TSTypeLiteral,
) {
  switch (node.type) {
    case AST_NODE_TYPES.TSInterfaceDeclaration:
      return node.body.body
    case AST_NODE_TYPES.TSEnumDeclaration:
    case AST_NODE_TYPES.TSTypeLiteral:
      return node.members
  }
}

function getProperty(node: TSESTree.Node) {
  switch (node.type) {
    case AST_NODE_TYPES.TSIndexSignature: {
      const [identifier] = node.parameters

      return {
        ...identifier,
        // Override name for error message readability and weight calculation
        name: indexSignature.create(
          (identifier as TSESTree.Parameter & { name: string }).name,
        ),
      }
    }

    case AST_NODE_TYPES.TSPropertySignature:
    case AST_NODE_TYPES.TSMethodSignature:
      return node.key

    case AST_NODE_TYPES.TSEnumMember:
      return node.id

    default:
      return undefined
  }
}

/**
 * Gets the property name of the given `Property` node.
 *
 * - If the property's key is an `Identifier` node, this returns the key's name
 *   whether it's a computed property or not.
 * - If the property has a static name, this returns the static name.
 * - Otherwise, this returns undefined.
 *
 *     a.b           // => "b"
 *     a["b"]        // => "b"
 *     a['b']        // => "b"
 *     a[`b`]        // => "b"
 *     a[100]        // => "100"
 *     a[b]          // => undefined
 *     a["a" + "b"]  // => undefined
 *     a[tag`b`]     // => undefined
 *     a[`${b}`]     // => undefined
 *
 *     let a = {b: 1}            // => "b"
 *     let a = {["b"]: 1}        // => "b"
 *     let a = {['b']: 1}        // => "b"
 *     let a = {[`b`]: 1}        // => "b"
 *     let a = {[100]: 1}        // => "100"
 *     let a = {[b]: 1}          // => undefined
 *     let a = {["a" + "b"]: 1}  // => undefined
 *     let a = {[tag`b`]: 1}     // => undefined
 *     let a = {[`${b}`]: 1}     // => undefined
 */
export function getPropertyName(node: TSType) {
  const property = getProperty(node as TSESTree.Node)

  switch (property?.type) {
    case AST_NODE_TYPES.Literal:
      return String(property.value)

    case AST_NODE_TYPES.Identifier:
      return property.name

    default:
      return undefined
  }
}

// Returns whether a method or property signature is optional.
export function getPropertyIsOptional(node: TSType) {
  switch (node.type) {
    case AST_NODE_TYPES.TSMethodSignature:
    case AST_NODE_TYPES.TSPropertySignature:
      return Boolean(node.optional)
    default:
      return false
  }
}
