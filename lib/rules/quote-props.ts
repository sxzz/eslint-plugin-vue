/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
import type { VExpressionContainer } from '../types/index.ts'

import { wrapStylisticOrCoreRule, flatten } from '../utils/index.ts'

export default wrapStylisticOrCoreRule('quote-props', {
  skipDynamicArguments: true,
  preprocess(
    context: any,
    { wrapContextToOverrideProperties, defineVisitor }: any
  ) {
    const sourceCode = context.sourceCode

    let htmlQuote: '"' | "'" | null = null
    defineVisitor({
      'VAttribute > VExpressionContainer.value'(node: VExpressionContainer) {
        const text = sourceCode.getText(node)
        const firstChar = text[0]
        htmlQuote = firstChar === "'" || firstChar === '"' ? firstChar : null
      },
      'VAttribute > VExpressionContainer.value:exit'() {
        htmlQuote = null
      }
    })

    wrapContextToOverrideProperties({
      // Override the report method and replace the quotes in the fixed text with safe quotes.
      report(descriptor: any) {
        if (htmlQuote) {
          const expectedQuote = htmlQuote === '"' ? "'" : '"'
          context.report({
            ...descriptor,
            *fix(fixer: any) {
              const fixes = flatten(descriptor.fix && descriptor.fix(fixer))
              for (const fix of fixes) {
                yield fixer.replaceTextRange(
                  fix.range,
                  fix.text.replaceAll(/["']/gu, () => expectedQuote)
                )
              }
            }
          })
        } else {
          context.report(descriptor)
        }
      }
    })
  }
})
