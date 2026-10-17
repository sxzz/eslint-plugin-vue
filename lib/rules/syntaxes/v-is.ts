/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
export default {
  deprecated: '3.1.0',
  supported: '>=3.0.0',

  createTemplateBodyVisitor(context: RuleContext) {
    /**
     * Reports `v-is` node
     */
    function reportVIs(vIsAttr: VDirective) {
      context.report({
        node: vIsAttr.key,
        messageId: 'forbiddenVIs'
      })
    }

    return {
      "VAttribute[directive=true][key.name.name='is']": reportVIs
    }
  }
}
