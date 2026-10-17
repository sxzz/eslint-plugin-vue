/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */

import { isVBindSameNameShorthand } from '../../utils/index.ts'

export default {
  supported: '>=3.4.0',

  createTemplateBodyVisitor(context: RuleContext) {
    /**
     * Verify the directive node
     */
    function checkDirective(node: VDirective) {
      if (isVBindSameNameShorthand(node)) {
        context.report({
          node,
          messageId: 'forbiddenVBindSameNameShorthand',
          // fix to use `:x="x"` (downgrade)
          fix: (fixer: any) =>
            fixer.insertTextAfter(node, `="${node.value.expression.name}"`)
        })
      }
    }

    return {
      "VAttribute[directive=true][key.name.name='bind']": checkDirective
    }
  }
}
