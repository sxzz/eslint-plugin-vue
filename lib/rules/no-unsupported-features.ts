/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
import semver from 'semver'
import {
  compositingVisitors,
  defineTemplateBodyVisitor
} from '../utils/index.js'
import styleCssVarsInjection from './syntaxes/style-css-vars-injection.ts'
import isAttributeWithVuePrefix from './syntaxes/is-attribute-with-vue-prefix.js'
import vMemo from './syntaxes/v-memo.js'
import vBindPropModifierShorthand from './syntaxes/v-bind-prop-modifier-shorthand.js'
import vBindAttrModifier from './syntaxes/v-bind-attr-modifier.js'
import defineOptions from './syntaxes/define-options.js'
import defineSlots from './syntaxes/define-slots.js'
import defineModel from './syntaxes/define-model.js'
import vBindSameNameShorthand from './syntaxes/v-bind-same-name-shorthand.js'

interface SyntaxRule {
  supported: string
  createTemplateBodyVisitor?: (context: RuleContext) => TemplateListener
  createScriptVisitor?: (context: RuleContext) => RuleListener
}

const FEATURES = {
  // Vue.js 3.0.3+
  'style-css-vars-injection': styleCssVarsInjection,
  // Vue.js 3.1.0+
  'is-attribute-with-vue-prefix': isAttributeWithVuePrefix,
  // Vue.js 3.2.0+
  'v-memo': vMemo,
  'v-bind-prop-modifier-shorthand': vBindPropModifierShorthand,
  'v-bind-attr-modifier': vBindAttrModifier,
  // Vue.js 3.3.0+
  'define-options': defineOptions,
  'define-slots': defineSlots,
  // Vue.js 3.4.0+
  'define-model': defineModel,
  'v-bind-same-name-shorthand': vBindSameNameShorthand
} satisfies Record<string, SyntaxRule>

const SYNTAX_NAMES = Object.keys(FEATURES) as (keyof typeof FEATURES)[]

const cache = new Map()
/**
 * Get the `semver.Range` object of a given range text.
 * It's null if the `x` is not a valid range text.
 */
function getSemverRange(x: string): semver.Range {
  let ret = cache.get(x) || null

  if (!ret) {
    try {
      ret = new semver.Range(x)
    } catch {
      // Ignore parsing error.
    }
    cache.set(x, ret)
  }

  return ret
}

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'disallow unsupported Vue.js syntax on the specified version',
      categories: undefined,
      url: 'https://eslint.vuejs.org/rules/no-unsupported-features.html'
    },
    // eslint-disable-next-line eslint-plugin/require-meta-fixable -- fixer is not recognized
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          version: {
            type: 'string'
          },
          ignores: {
            type: 'array',
            items: {
              enum: SYNTAX_NAMES
            },
            uniqueItems: true
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      // Vue.js 3.0.3+
      forbiddenStyleCssVarsInjection:
        'SFC CSS variable injection is not supported until Vue.js "3.0.3".',
      // Vue.js 3.1.0+
      forbiddenIsAttributeWithVuePrefix:
        '`is="vue:"` are not supported until Vue.js "3.1.0".',
      // Vue.js 3.2.0+
      forbiddenVMemo: '`v-memo` are not supported until Vue.js "3.2.0".',
      forbiddenVBindPropModifierShorthand:
        '`.prop` shorthand are not supported until Vue.js "3.2.0".',
      forbiddenVBindAttrModifier:
        '`.attr` modifiers on `v-bind` are not supported until Vue.js "3.2.0".',
      // Vue.js 3.3.0+
      forbiddenDefineOptions:
        '`defineOptions()` macros are not supported until Vue.js "3.3.0".',
      forbiddenDefineSlots:
        '`defineSlots()` macros are not supported until Vue.js "3.3.0".',
      // Vue.js 3.4.0+
      forbiddenDefineModel:
        '`defineModel()` macros are not supported until Vue.js "3.4.0".',
      forbiddenVBindSameNameShorthand:
        '`v-bind` same-name shorthand is not supported until Vue.js "3.4.0".'
    }
  },
  create(context: RuleContext) {
    const { version, ignores } = Object.assign(
      {
        version: null,
        ignores: []
      },
      context.options[0] || {}
    )
    if (!version) {
      // version is not set.
      return {}
    }
    const versionRange = getSemverRange(version)

    /**
     * Check whether a given case object is full-supported on the configured node version.
     */
    function isNotSupportingVersion(aCase: SyntaxRule): boolean {
      return !semver.subset(versionRange, getSemverRange(aCase.supported))
    }

    let templateBodyVisitor: TemplateListener = {}
    let scriptVisitor: RuleListener = {}

    for (const syntaxName of SYNTAX_NAMES) {
      const syntax: SyntaxRule = FEATURES[syntaxName]
      if (ignores.includes(syntaxName) || !isNotSupportingVersion(syntax)) {
        continue
      }
      if (syntax.createTemplateBodyVisitor) {
        const visitor = syntax.createTemplateBodyVisitor(context)
        templateBodyVisitor = compositingVisitors(templateBodyVisitor, visitor)
      }
      if (syntax.createScriptVisitor) {
        const visitor = syntax.createScriptVisitor(context)
        scriptVisitor = compositingVisitors(scriptVisitor, visitor)
      }
    }

    return defineTemplateBodyVisitor(
      context,
      templateBodyVisitor,
      scriptVisitor
    )
  }
}
