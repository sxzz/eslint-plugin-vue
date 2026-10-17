/**
 * @author 唯然<weiran.zsd@outlook.com>
 * @copyright 2023- 唯然. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

/*
This script updates `lib/configs/*.ts` files from rule's meta data.
*/

import fs from 'node:fs'
import path from 'node:path'
import { ESLint } from 'eslint'
import { categories } from './lib/categories.ts'

const errorCategories = new Set(['base', 'vue3-essential'])

const extendsCategories: Record<string, string | null> = {
  base: null,
  'vue3-essential': 'base',
  'vue3-strongly-recommended': 'vue3-essential',
  'vue3-recommended': 'vue3-strongly-recommended',
  'vue3-use-with-caution': 'vue3-recommended'
}

function formatRules(
  rules: (typeof categories)[number]['rules'],
  categoryId: string,
  shouldAlwaysError: boolean
) {
  const obj = Object.fromEntries(
    rules.map((rule) => {
      let options: string | unknown[] =
        shouldAlwaysError || errorCategories.has(categoryId) ? 'error' : 'warn'
      const defaultOptions =
        rule.meta && rule.meta.docs && rule.meta.docs.defaultOptions
      if (defaultOptions) {
        const defaultOption = defaultOptions.vue3
        if (defaultOption) {
          options = [options, ...defaultOption]
        }
      }
      return [rule.ruleId, options]
    })
  )
  return JSON.stringify(obj, null, 2)
}

function formatCategory(
  category: (typeof categories)[number],
  shouldAlwaysError = false
) {
  if (category.categoryId === 'base') {
    return `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "pnpm run update"
 */
import type { Linter } from 'eslint'
import { plugin } from '../plugin.ts'
import vueParser from 'vue-eslint-parser'

export default [
  {
    name: 'vue/base/setup',
    plugins: {
      get vue() {
        return plugin
      }
    },
    languageOptions: {
      sourceType: 'module',
    }
  },
  {
    name: 'vue/base/setup-for-vue',
    files: ['*.vue', '**/*.vue'],
    plugins: {
      get vue() {
        return plugin
      }
    },
    languageOptions: {
      parser: vueParser,
      sourceType: 'module',
    },
    rules: ${formatRules(category.rules, category.categoryId, shouldAlwaysError)},
    processor: 'vue/vue'
  }
] satisfies Linter.Config[]
`
  }

  let extendsCategoryId = extendsCategories[category.categoryId]
  if (!extendsCategoryId) {
    throw new Error(`Missing base category for ${category.categoryId}`)
  }

  if (shouldAlwaysError && !errorCategories.has(extendsCategoryId)) {
    extendsCategoryId += '-error'
  }

  return `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "pnpm run update"
 */
import type { Linter } from 'eslint'
import config from './${extendsCategoryId}.ts'

export default [
  ...config,
  {
    name: 'vue/${category.categoryId.replace(/^vue3-/u, '')}${shouldAlwaysError ? '-error' : ''}/rules',
    rules: ${formatRules(category.rules, category.categoryId, shouldAlwaysError)},
  }
] satisfies Linter.Config[]
`
}

// Update files.
const ROOT = path.resolve(import.meta.dirname, '../lib/configs/')
for (const category of categories) {
  const filePath = path.join(ROOT, `${category.categoryId}.ts`)
  const content = formatCategory(category)

  fs.writeFileSync(filePath, content)

  if (!errorCategories.has(category.categoryId)) {
    fs.writeFileSync(
      path.join(ROOT, `${category.categoryId}-error.ts`),
      formatCategory(category, true)
    )
  }
}

// Format files.
async function format() {
  const linter = new ESLint({
    fix: true,
    flags: ['unstable_native_nodejs_ts_config']
  })
  const report = await linter.lintFiles([ROOT])
  await ESLint.outputFixes(report)
}

await format()
