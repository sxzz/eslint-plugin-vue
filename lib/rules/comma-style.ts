/**
 * @author Yosuke Ota
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

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
