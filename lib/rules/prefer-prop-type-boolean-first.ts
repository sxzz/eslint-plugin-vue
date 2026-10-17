/**
 * @author Pig Fang
 * See LICENSE file in root directory for full license.
 */

import {
  isDef,
  getStaticPropertyName,
  compositingVisitors,
  defineScriptSetupVisitor,
  executeOnVue,
  getComponentPropsFromOptions
} from '../utils/index.ts'

function checkArrayExpression(node: ArrayExpression, context: RuleContext) {
  const booleanType = node.elements.find(
    (element: any) =>
      element && element.type === 'Identifier' && element.name === 'Boolean'
  )
  if (!booleanType) {
    return
  }
  const booleanTypeIndex = node.elements.indexOf(booleanType)
  if (booleanTypeIndex > 0) {
    context.report({
      node: booleanType,
      messageId: 'shouldBeFirst',
      suggest: [
        {
          messageId: 'moveToFirst',
          fix: (fixer: any) => {
            const sourceCode = context.sourceCode

            const elements = [...node.elements]
            elements.splice(booleanTypeIndex, 1)
            const code = elements
              .filter(isDef)
              .map((element) => sourceCode.getText(element))
            code.unshift('Boolean')

            return fixer.replaceText(node, `[${code.join(', ')}]`)
          }
        }
      ]
    })
  }
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce `Boolean` comes first in component prop types',
      categories: undefined,
      url: 'https://eslint.vuejs.org/rules/prefer-prop-type-boolean-first.html'
    },
    fixable: null,
    hasSuggestions: true,
    schema: [],
    messages: {
      shouldBeFirst: 'Type `Boolean` should be at first in prop types.',
      moveToFirst: 'Move `Boolean` to be first in prop types.'
    }
  },

  create(context: RuleContext) {
    function checkProperty(prop: import('../utils').ComponentProp) {
      if (prop.type !== 'object') {
        return
      }
      const { value } = prop
      if (!value) {
        return
      }

      if (value.type === 'ArrayExpression') {
        checkArrayExpression(value, context)
      } else if (value.type === 'ObjectExpression') {
        const type = value.properties.find(
          (property): property is Property =>
            property.type === 'Property' &&
            getStaticPropertyName(property) === 'type'
        )
        if (!type || type.value.type !== 'ArrayExpression') {
          return
        }
        checkArrayExpression(type.value, context)
      }
    }

    return compositingVisitors(
      defineScriptSetupVisitor(context, {
        onDefinePropsEnter(_: any, props: any) {
          for (const prop of props) {
            checkProperty(prop)
          }
        }
      }),
      executeOnVue(context, (obj: any) => {
        const props = getComponentPropsFromOptions(obj)
        for (const prop of props) {
          checkProperty(prop)
        }
      })
    )
  }
}
