/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */

import {
  defineTemplateBodyVisitor,
  defineVueVisitor,
  isThis
} from '../utils/index.ts'

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow using deprecated `$listeners` (in Vue.js 3.0.0+)',
      categories: ['vue3-essential'],
      url: 'https://eslint.vuejs.org/rules/no-deprecated-dollar-listeners-api.html'
    },
    fixable: null,
    schema: [],
    messages: {
      deprecated: 'The `$listeners` is deprecated.'
    }
  },

  create(context: RuleContext) {
    return defineTemplateBodyVisitor(
      context,
      {
        VExpressionContainer(node: any) {
          for (const reference of node.references) {
            if (reference.variable != null) {
              // Not vm reference
              continue
            }
            if (reference.id.name === '$listeners') {
              context.report({
                node: reference.id,
                messageId: 'deprecated'
              })
            }
          }
        }
      },
      defineVueVisitor(context, {
        MemberExpression(node: any) {
          if (
            node.property.type !== 'Identifier' ||
            node.property.name !== '$listeners'
          ) {
            return
          }
          if (!isThis(node.object, context)) {
            return
          }

          context.report({
            node: node.property,
            messageId: 'deprecated'
          })
        }
      })
    )
  }
}
