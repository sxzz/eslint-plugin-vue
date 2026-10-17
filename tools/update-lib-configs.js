/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

/*
This script updates `lib/configs/*.js` files from rule's meta data.
*/

import fs from 'node:fs'
import path from 'node:path'
import * as ESLintModule from 'eslint'
import categoriesModule1 from './lib/categories.js'
const { ESLint } = ESLintModule
const { categories } = categoriesModule1

const errorCategories = new Set(['base', 'vue3-essential'])

const extendsCategories = {
  base: null,
  'vue3-essential': 'base',
  'vue3-strongly-recommended': 'vue3-essential',
  'vue3-recommended': 'vue3-strongly-recommended',
  'vue3-use-with-caution': 'vue3-recommended'
}

function formatRules(rules, categoryId, shouldAlwaysError) {
  const obj = Object.fromEntries(
    rules.map((rule) => {
      let options =
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

function formatCategory(category, shouldAlwaysError = false) {
  let extendsCategoryId = extendsCategories[category.categoryId]
  if (extendsCategoryId == null) {
    return `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "pnpm run update"
 */
import { createRequire } from 'node:module'

const resolve = createRequire(import.meta.url).resolve

export default {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: ${formatRules(category.rules, category.categoryId, shouldAlwaysError)},
  overrides: [
    {
      files: '*.vue',
      parser: resolve('vue-eslint-parser')
    }
  ]
}
`
  }
  if (shouldAlwaysError && !errorCategories.has(extendsCategoryId)) {
    extendsCategoryId += '-error'
  }

  return `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "pnpm run update"
 */
import { fileURLToPath } from 'node:url'

export default {
  extends: fileURLToPath(new URL('./${extendsCategoryId}.js', import.meta.url)),
  rules: ${formatRules(category.rules, category.categoryId, shouldAlwaysError)}
}
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
  const linter = new ESLint({ fix: true })
  const report = await linter.lintFiles([ROOT])
  await ESLint.outputFixes(report)
}

await format()
