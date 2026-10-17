/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
import type { RuleContext } from '../../types/index.ts'

import { defineScriptSetupVisitor } from '../../utils/index.ts'

export default {
  supported: '>=3.3.0',

  createScriptVisitor(context: RuleContext) {
    return defineScriptSetupVisitor(context, {
      onDefineSlotsEnter(node: any) {
        context.report({
          node,
          messageId: 'forbiddenDefineSlots'
        })
      }
    })
  }
}
