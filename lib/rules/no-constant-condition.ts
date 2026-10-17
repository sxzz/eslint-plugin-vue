/**
 * @author Flo Edelmann
 */

import { wrapCoreRule } from '../utils/index.ts'

const conditionalDirectiveNames = new Set(['v-show', 'v-if', 'v-else-if'])

// eslint-disable-next-line internal/no-invalid-meta
export default wrapCoreRule('no-constant-condition', {
  create(_context: any, { baseHandlers }: any) {
    return {
      VDirectiveKey(node: any) {
        if (
          conditionalDirectiveNames.has(`v-${node.name.name}`) &&
          node.parent.value &&
          node.parent.value.expression &&
          baseHandlers.IfStatement
        ) {
          baseHandlers.IfStatement({
            test: node.parent.value.expression
          })
        }
      }
    }
  }
})
