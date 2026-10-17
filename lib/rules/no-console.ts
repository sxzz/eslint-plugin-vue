/**
 * @author ItMaga <https://github.com/ItMaga>
 * See LICENSE file in root directory for full license.
 */

import { wrapCoreRule, getStaticPropertyName } from '../utils/index.ts'

// eslint-disable-next-line internal/no-invalid-meta
export default wrapCoreRule('no-console', {
  skipBaseHandlers: true,
  create(context: any) {
    const options = context.options[0] || {}
    const allowed = options.allow || []

    /**
     * Copied from the core rule `no-console`.
     * Checks whether the property name of the given MemberExpression node
     * is allowed by options or not.
     */
    function isAllowed(node: MemberExpression) {
      const propertyName = getStaticPropertyName(node)

      return propertyName && allowed.includes(propertyName)
    }

    return {
      MemberExpression(node: any) {
        if (
          node.object.type === 'Identifier' &&
          node.object.name === 'console' &&
          !isAllowed(node)
        ) {
          context.report({
            node: node.object,
            loc: node.object.loc,
            messageId: 'unexpected'
          })
        }
      }
    }
  }
})
