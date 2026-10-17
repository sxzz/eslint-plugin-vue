/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
import type { ComponentProp } from '../utils/index.js'
import {
  compositingVisitors,
  defineScriptSetupVisitor,
  executeOnVue,
  getComponentPropsFromOptions
} from '../utils/index.js'
import { kebabCase } from '../utils/casing.ts'

const RESERVED = new Set(['key', 'ref'])

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow reserved names in props',
      categories: ['vue3-essential'],
      url: 'https://eslint.vuejs.org/rules/no-reserved-props.html'
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          vueVersion: { enum: [3] }
        },
        additionalProperties: false
      }
    ],
    messages: {
      reserved:
        "'{{propName}}' is a reserved attribute and cannot be used as props."
    }
  },
  create(context: RuleContext) {
    function processProps(props: ComponentProp[]) {
      for (const prop of props) {
        if (prop.propName != null && RESERVED.has(prop.propName)) {
          context.report({
            node: prop.node,
            messageId: `reserved`,
            data: {
              propName: kebabCase(prop.propName)
            }
          })
        }
      }
    }

    return compositingVisitors(
      defineScriptSetupVisitor(context, {
        onDefinePropsEnter(_node, props) {
          processProps(props)
        }
      }),
      executeOnVue(context, (obj) => {
        processProps(getComponentPropsFromOptions(obj))
      })
    )
  }
}
