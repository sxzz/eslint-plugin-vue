/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
import type { RuleContext } from '../../types/index.ts'

import { defineScriptSetupVisitor } from '../../utils/index.ts'

export default {
  supported: '>=3.4.0',

  createScriptVisitor(context: RuleContext) {
    return defineScriptSetupVisitor(context, {
      onDefineModelEnter(node: any) {
        context.report({
          node,
          messageId: 'forbiddenDefineModel'
        })
      }
    })
  }
}
