/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */

export default {
  supported: '>=3.2.0',

  createTemplateBodyVisitor(context: RuleContext) {
    /**
     * Reports `.prop` shorthand node
     */
    function reportPropModifierShorthand(
      bindPropKey: VDirectiveKey & { argument: VIdentifier }
    ) {
      context.report({
        node: bindPropKey,
        messageId: 'forbiddenVBindPropModifierShorthand',
        // fix to use `:x.prop` (downgrade)
        fix: (fixer: any) =>
          fixer.replaceText(
            bindPropKey,
            `:${bindPropKey.argument.rawName}.prop`
          )
      })
    }

    return {
      "VAttribute[directive=true] > VDirectiveKey[name.name='bind'][name.rawName='.']":
        reportPropModifierShorthand
    }
  }
}
