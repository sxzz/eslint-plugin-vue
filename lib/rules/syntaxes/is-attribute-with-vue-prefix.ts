/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
import type { RuleContext, VAttribute } from '../../types/index.ts'
export default {
  supported: '>=3.1.0',

  createTemplateBodyVisitor(context: RuleContext) {
    return {
      "VAttribute[directive=false][key.name='is']"(node: VAttribute) {
        if (!node.value) {
          return
        }
        if (node.value.value.startsWith('vue:')) {
          context.report({
            node: node.value,
            messageId: 'forbiddenIsAttributeWithVuePrefix'
          })
        }
      }
    }
  }
}
