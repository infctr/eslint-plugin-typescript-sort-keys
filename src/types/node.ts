import { TSESTree } from '@typescript-eslint/utils'

export type NodeOrToken = (TSESTree.Node | TSESTree.Token) & { parent?: NodeOrToken }
export type Declaration =
  | TSESTree.TSEnumDeclaration
  | TSESTree.TSInterfaceDeclaration
  | TSESTree.TSTypeLiteral
export type NodePositionInfo = { initialIndex: number; finalIndex: number }
