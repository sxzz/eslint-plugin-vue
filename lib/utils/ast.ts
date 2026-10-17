import parser from 'vue-eslint-parser'
import type { AST as VueAST } from 'vue-eslint-parser'
import type { ASTNode } from '../types/ast.ts'
import type { VisitorKeys } from 'eslint-visitor-keys'

// The parser exposes AST helpers at runtime, but declares the namespace as type-only.
const ast = (parser as unknown as { AST: typeof VueAST }).AST
export const traverseNodes = ast.traverseNodes as (
  node: ASTNode,
  visitor: {
    visitorKeys?: VisitorKeys
    enterNode(node: ASTNode, parent: ASTNode | null): void
    leaveNode(node: ASTNode, parent: ASTNode | null): void
  }
) => void
export const getFallbackKeys = ast.getFallbackKeys as (
  node: ASTNode
) => string[]
export const NS = ast.NS
