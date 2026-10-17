/**
 * @fileoverview Disallow use other than available `lang`
 * @author Yosuke Ota
 */
import type { RuleContext, VElement } from '../types/index.ts'
import type { RuleDefinition, PublicRuleModule } from '../types/rule.ts'
import { getAttribute, defineDocumentVisitor } from '../utils/index.ts'

export type BlockOptions = { lang: Set<string>; allowNoLang: boolean }

export type Options = { [element: string]: BlockOptions | undefined }

export type UserBlockOptions = {
  lang?: string[] | string
  allowNoLang?: boolean
}

export type UserOptions = { [element: string]: UserBlockOptions | undefined }

/**
 * https://vuejs.github.io/vetur/guide/highlighting.html
 * <template lang="html"></template>
 * <style lang="css"></style>
 * <script lang="js"></script>
 * <script lang="javascript"></script>
 */
const DEFAULT_LANGUAGES: Record<string, string[]> = {
  template: ['html'],
  style: ['css'],
  script: ['js', 'javascript']
}

function getAllowsLangPhrase(lang: NonNullable<BlockOptions['lang']>) {
  const langs = [...lang].map((s) => `'${s}'`)
  switch (langs.length) {
    case 1: {
      return langs[0]
    }
    default: {
      return `${langs.slice(0, -1).join(', ')}, and ${langs.at(-1)}`
    }
  }
}

/**
 * Normalizes a given option.
 */
function normalizeOption(blockName: string, option: UserBlockOptions) {
  let lang: Set<string>

  if (Array.isArray(option.lang)) {
    lang = new Set(option.lang)
  } else if (typeof option.lang === 'string') {
    lang = new Set([option.lang])
  } else {
    lang = new Set()
  }

  let hasDefault = false
  const defaultLanguages = DEFAULT_LANGUAGES[blockName] || []
  for (const def of defaultLanguages) {
    if (!lang.has(def)) {
      continue
    }

    lang.delete(def)
    hasDefault = true
  }
  if (lang.size === 0) {
    return {
      lang,
      allowNoLang: true
    }
  }
  return {
    lang,
    allowNoLang: hasDefault || Boolean(option.allowNoLang)
  }
}
/**
 * Normalizes a given options.
 */
function normalizeOptions(options: UserOptions) {
  if (!options) {
    return {}
  }

  const normalized: Record<string, ReturnType<typeof normalizeOption>> = {}

  for (const [blockName, value] of Object.entries(options)) {
    if (value) {
      normalized[blockName] = normalizeOption(blockName, value)
    }
  }

  return normalized
}

const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow use other than available `lang`',
      categories: undefined,
      url: 'https://eslint.vuejs.org/rules/block-lang.html'
    },
    schema: [
      {
        type: 'object',
        patternProperties: {
          '^(?:\\S+)$': {
            oneOf: [
              {
                type: 'object',
                properties: {
                  lang: {
                    oneOf: [
                      { type: 'string' },
                      {
                        type: 'array',
                        items: {
                          type: 'string'
                        },
                        uniqueItems: true
                      }
                    ]
                  },
                  allowNoLang: { type: 'boolean' }
                },
                additionalProperties: false
              }
            ]
          }
        },
        minProperties: 1,
        additionalProperties: false
      }
    ],
    messages: {
      expected:
        "Only {{allows}} can be used for the 'lang' attribute of '<{{tag}}>'.",
      missing: "The 'lang' attribute of '<{{tag}}>' is missing.",
      unexpected: "Do not specify the 'lang' attribute of '<{{tag}}>'.",
      useOrNot:
        "Only {{allows}} can be used for the 'lang' attribute of '<{{tag}}>'. Or, not specifying the 'lang' attribute is allowed.",
      unexpectedDefault:
        "Do not explicitly specify the default language for the 'lang' attribute of '<{{tag}}>'."
    }
  },

  create(context: RuleContext) {
    const options = normalizeOptions(
      context.options[0] || {
        script: { allowNoLang: true },
        template: { allowNoLang: true },
        style: { allowNoLang: true }
      }
    )
    if (Object.keys(options).length === 0) {
      return {}
    }

    function verify(element: VElement) {
      const tag = element.name
      const option = options[tag]
      if (!option) {
        return
      }
      const lang = getAttribute(element, 'lang')
      if (lang == null || lang.value == null) {
        if (!option.allowNoLang) {
          context.report({
            node: element.startTag,
            messageId: 'missing',
            data: {
              tag
            }
          })
        }
        return
      }
      if (!option.lang.has(lang.value.value)) {
        let messageId
        if (!option.allowNoLang) {
          messageId = 'expected'
        } else if (option.lang.size === 0) {
          messageId = (DEFAULT_LANGUAGES[tag] || []).includes(lang.value.value)
            ? 'unexpectedDefault'
            : 'unexpected'
        } else {
          messageId = 'useOrNot'
        }
        context.report({
          node: lang,
          messageId,
          data: {
            tag,
            allows: getAllowsLangPhrase(option.lang)
          }
        })
      }
    }

    return defineDocumentVisitor(context, {
      'VDocumentFragment > VElement': verify
    })
  }
} satisfies RuleDefinition

export default rule as typeof rule & PublicRuleModule
