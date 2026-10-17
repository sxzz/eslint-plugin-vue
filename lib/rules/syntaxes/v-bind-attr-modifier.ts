/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
import type { RuleContext, VIdentifier } from '../../types/index.ts'

export default {
  supported: '>=3.2.0',

  createTemplateBodyVisitor(context: RuleContext) {
    /**
     * Reports `v-bind.attr` node
     */
    function report(mod: VIdentifier) {
      context.report({
        node: mod,
        messageId: 'forbiddenVBindAttrModifier'
      })
    }

    return {
      "VAttribute[directive=true][key.name.name='bind']"(node: any) {
        const attrMod = node.key.modifiers.find((m: any) => m.name === 'attr')
        if (attrMod) {
          report(attrMod)
        }
      }
    }
  }
}
