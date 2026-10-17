/**
 * @author Yosuke Ota
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

// eslint-disable-next-line internal/no-invalid-meta
export default wrapStylisticOrCoreRule('comma-style', {
  create(_context: any, { baseHandlers }: any) {
    return {
      VSlotScopeExpression(node: any) {
        if (baseHandlers.FunctionExpression) {
          baseHandlers.FunctionExpression(node)
        }
      }
    }
  }
})
