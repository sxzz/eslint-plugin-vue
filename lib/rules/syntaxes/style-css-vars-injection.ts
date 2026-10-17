/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
import type { RuleContext, TemplateListener } from '../../types/index.ts'
import { getStyleVariablesContext } from '../../utils/style-variables/index.ts'

export default {
  supported: '>=3.0.3',
  createScriptVisitor(context: RuleContext): TemplateListener {
    const styleVars = getStyleVariablesContext(context)
    if (!styleVars) {
      return {}
    }
    return {
      Program() {
        for (const vBind of styleVars.vBinds) {
          context.report({
            node: vBind,
            messageId: 'forbiddenStyleCssVarsInjection'
          })
        }
      }
    }
  }
}
