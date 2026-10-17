/**
 * @fileoverview Enforces render function to always return value.
 * @author Armano
 */

import {
  compositingVisitors,
  defineVueVisitor,
  executeOnFunctionsWithoutReturn
} from '../utils/index.ts'

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce render function to always return value',
      categories: ['vue3-essential'],
      url: 'https://eslint.vuejs.org/rules/require-render-return.html'
    },
    fixable: null,
    schema: [],
    messages: {
      expectedReturn: 'Expected to return a value in render function.'
    }
  },

  create(context: RuleContext) {
    const renderFunctions = new Map()

    return compositingVisitors(
      defineVueVisitor(context, {
        onRenderFunctionEnter(node: any) {
          renderFunctions.set(node, node.parent.key)
        }
      }),
      executeOnFunctionsWithoutReturn(context, true, (node: any) => {
        const key = renderFunctions.get(node)
        if (key) {
          context.report({
            node: key,
            messageId: 'expectedReturn'
          })
        }
      })
    )
  }
}
