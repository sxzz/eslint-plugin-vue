/**
 * @author Wayne Zhang
 * See LICENSE file in root directory for full license.
 */

import {
  isThis,
  compositingVisitors,
  defineVueVisitor,
  defineScriptSetupVisitor,
  getScope
} from '../utils/index.js'
import { ReferenceTracker } from '@eslint-community/eslint-utils'

/**
 * @typedef {import('@eslint-community/eslint-utils').TYPES.TraceMap} TraceMap
 */

/** @type {TraceMap} */
const deletedImportApisMap = {
  set: {
    [ReferenceTracker.CALL]: true
  },
  del: {
    [ReferenceTracker.CALL]: true
  }
}
const deprecatedDollarApis = new Set(['$set', '$delete'])

/**
 * @param {Identifier} identifier
 * @param {RuleContext} context
 * @returns {CallExpression|undefined}
 */
function getVueDeprecatedCallExpression(identifier, context) {
  // Instance API: this.$set()
  if (
    deprecatedDollarApis.has(identifier.name) &&
    identifier.parent.type === 'MemberExpression' &&
    isThis(identifier.parent.object, context) &&
    identifier.parent.parent.type === 'CallExpression' &&
    identifier.parent.parent.callee === identifier.parent
  ) {
    return identifier.parent.parent
  }

  return undefined
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'disallow using deprecated `$delete` and `$set` (in Vue.js 3.0.0+)',
      categories: ['vue3-essential'],
      url: 'https://eslint.vuejs.org/rules/no-deprecated-delete-set.html'
    },
    fixable: null,
    schema: [],
    messages: {
      deprecated: 'The `$delete`, `$set` is deprecated.'
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    const nodeVisitor = {
      /** @param {Identifier} node */
      Identifier(node) {
        const callExpression = getVueDeprecatedCallExpression(node, context)
        if (!callExpression) {
          return
        }

        context.report({
          node,
          messageId: 'deprecated'
        })
      }
    }

    return compositingVisitors(
      defineVueVisitor(context, nodeVisitor),
      defineScriptSetupVisitor(context, nodeVisitor),
      {
        /** @param {Program} node */
        Program(node) {
          const tracker = new ReferenceTracker(getScope(context, node))

          // import { set } from 'vue'; set()
          const esmTraceMap = {
            vue: {
              [ReferenceTracker.ESM]: true,
              ...deletedImportApisMap
            }
          }
          // const { set } = require('vue'); set()
          const cjsTraceMap = {
            vue: {
              ...deletedImportApisMap
            }
          }

          for (const { node } of [
            ...tracker.iterateEsmReferences(esmTraceMap),
            ...tracker.iterateCjsReferences(cjsTraceMap)
          ]) {
            const refNode = /** @type {CallExpression} */ (node)
            context.report({
              node: refNode.callee,
              messageId: 'deprecated'
            })
          }
        }
      }
    )
  }
}
