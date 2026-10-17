/**
 * @fileoverview Don't use this in a beforeRouteEnter method
 * @author Przemyslaw Jan Beigert
 */

import { defineVueVisitor, findProperty } from '../utils/index.ts'

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow `this` usage in a `beforeRouteEnter` method',
      categories: null,
      url: 'https://eslint.vuejs.org/rules/no-this-in-before-route-enter.html'
    },
    fixable: null,
    schema: [],
    messages: {
      disallow:
        "'beforeRouteEnter' does NOT have access to `this` component instance. https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards."
    }
  },

  create(context: RuleContext) {
    const beforeRouteEnterFunctions = new Set()
    type ScopeStack = {
      upper: ScopeStack | null
      node: FunctionExpression | FunctionDeclaration
      beforeRouteEnter: boolean
    }

    let scopeStack: ScopeStack | null = null

    function onFunctionEnter(
      node: FunctionExpression | FunctionDeclaration | ArrowFunctionExpression
    ) {
      if (node.type === 'ArrowFunctionExpression') {
        return
      }
      scopeStack = {
        upper: scopeStack,
        node,
        beforeRouteEnter: beforeRouteEnterFunctions.has(node)
      }
    }

    function onFunctionExit(
      node: FunctionExpression | FunctionDeclaration | ArrowFunctionExpression
    ) {
      if (scopeStack && scopeStack.node === node) {
        scopeStack = scopeStack.upper
      }
    }
    return defineVueVisitor(context, {
      onVueObjectEnter(node: any) {
        const beforeRouteEnter = findProperty(node, 'beforeRouteEnter')
        if (
          beforeRouteEnter &&
          beforeRouteEnter.value.type === 'FunctionExpression'
        ) {
          beforeRouteEnterFunctions.add(beforeRouteEnter.value)
        }
      },
      ':function': onFunctionEnter,
      ':function:exit': onFunctionExit,
      ThisExpression(node: any) {
        if (scopeStack && scopeStack.beforeRouteEnter) {
          context.report({
            node,
            messageId: 'disallow'
          })
        }
      }
    })
  }
}
