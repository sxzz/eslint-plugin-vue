import type { Comment, Token } from '../types/index.ts'
export const isJSDocComment = (
  node: Token
): node is Comment & { type: 'Block' } =>
  node.type === 'Block' &&
  node.value.charAt(0) === '*' &&
  node.value.charAt(1) !== '*'

export const isBlockComment = (
  node: Token
): node is Comment & { type: 'Block' } =>
  node.type === 'Block' &&
  (node.value.charAt(0) !== '*' || node.value.charAt(1) === '*')
