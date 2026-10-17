/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

import { defineTemplateBodyVisitor, hasDirective } from '../utils/index.ts'

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'require `v-bind:is` of `<component>` elements',
      categories: ['vue3-essential'],
      url: 'https://eslint.vuejs.org/rules/require-component-is.html'
    },
    fixable: null,
    schema: [],
    messages: {
      requireComponentIs:
        "Expected '<component>' elements to have 'v-bind:is' attribute."
    }
  },

  create(context: RuleContext) {
    return defineTemplateBodyVisitor(context, {
      "VElement[name='component']"(node: VElement) {
        if (!hasDirective(node, 'bind', 'is')) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'requireComponentIs'
          })
        }
      }
    })
  }
}
