/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
import type { RuleContext, VDirective } from '../../types/index.ts'
export default {
  supported: '>=3.2.0',

  createTemplateBodyVisitor(context: RuleContext) {
    /**
     * Reports `v-is` node
     */
    function reportVMemo(vMemoAttr: VDirective) {
      context.report({
        node: vMemoAttr.key,
        messageId: 'forbiddenVMemo'
      })
    }

    return {
      "VAttribute[directive=true][key.name.name='memo']": reportVMemo
    }
  }
}
