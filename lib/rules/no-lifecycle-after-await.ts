/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
import { ReferenceTracker } from '@eslint-community/eslint-utils'
import {
  compositingVisitors,
  getScope,
  iterateReferencesTraceMap,
  defineVueVisitor,
  inRange
} from '../utils/index.ts'

export type TraceMap = import('@eslint-community/eslint-utils').TYPES.TraceMap

const LIFECYCLE_HOOKS = [
  'onBeforeMount',
  'onBeforeUnmount',
  'onBeforeUpdate',
  'onErrorCaptured',
  'onMounted',
  'onRenderTracked',
  'onRenderTriggered',
  'onUnmounted',
  'onUpdated',
  'onActivated',
  'onDeactivated'
]

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow asynchronously registered lifecycle hooks',
      categories: ['vue3-essential'],
      url: 'https://eslint.vuejs.org/rules/no-lifecycle-after-await.html'
    },
    fixable: null,
    schema: [],
    messages: {
      forbidden: 'Lifecycle hooks are forbidden after an `await` expression.'
    }
  },

  create(context: RuleContext) {
    const lifecycleHookCallNodes = new Set()

    const setupScopes = new Map()

    type ScopeStack = {
      upper: ScopeStack | null
      scopeNode:
        FunctionDeclaration | FunctionExpression | ArrowFunctionExpression
    }

    let scopeStack: ScopeStack | null = null

    return compositingVisitors(
      {
        Program(program: Program) {
          const tracker = new ReferenceTracker(getScope(context, program))

          const traceMap: Record<string, Record<symbol, boolean>> = {}
          for (const lifecycleHook of LIFECYCLE_HOOKS) {
            traceMap[lifecycleHook] = {
              [ReferenceTracker.CALL]: true
            }
          }

          for (const { node } of iterateReferencesTraceMap(tracker, traceMap)) {
            lifecycleHookCallNodes.add(node)
          }
        }
      },
      defineVueVisitor(context, {
        onSetupFunctionEnter(node: any) {
          setupScopes.set(node, {
            afterAwait: false,
            range: node.range
          })
        },

        ':function'(
          node:
            FunctionExpression | FunctionDeclaration | ArrowFunctionExpression
        ) {
          scopeStack = {
            upper: scopeStack,
            scopeNode: node
          }
        },
        ':function:exit'() {
          scopeStack &&= scopeStack.upper
        },

        AwaitExpression(node: AwaitExpression) {
          if (!scopeStack) {
            return
          }
          const setupScope = setupScopes.get(scopeStack.scopeNode)
          if (!setupScope || !inRange(setupScope.range, node)) {
            return
          }
          setupScope.afterAwait = true
        },

        CallExpression(node: CallExpression) {
          if (!scopeStack) {
            return
          }
          const setupScope = setupScopes.get(scopeStack.scopeNode)
          if (
            !setupScope ||
            !setupScope.afterAwait ||
            !inRange(setupScope.range, node)
          ) {
            return
          }

          if (lifecycleHookCallNodes.has(node)) {
            if (node.arguments.length >= 2) {
              // Has target instance. e.g. `onMounted(() => {}, instance)`
              return
            }
            context.report({
              node,
              messageId: 'forbidden'
            })
          }
        },
        onSetupFunctionExit(node: any) {
          setupScopes.delete(node)
        }
      })
    )
  }
}
