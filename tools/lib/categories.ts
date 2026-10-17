/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

import { rules } from './rules.ts'

const categoryTitles: Record<string, { text: string }> = {
  base: {
    text: 'Base Rules (Enabling Correct ESLint Parsing)'
  },
  'vue3-essential': {
    text: 'Priority A: Essential (Error Prevention) for Vue.js 3.x'
  },
  'vue3-strongly-recommended': {
    text: 'Priority B: Strongly Recommended (Improving Readability) for Vue.js 3.x'
  },
  'vue3-recommended': {
    text: 'Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead) for Vue.js 3.x'
  },
  'vue3-use-with-caution': {
    text: 'Priority D: Use with Caution (Potentially Dangerous Patterns) for Vue.js 3.x'
  }
}
const categoryIds = Object.keys(categoryTitles)
const categoryRules: Record<string, typeof rules> = {}

for (const rule of rules) {
  const categories = rule.meta.docs.categories || ['uncategorized']
  for (const categoryId of categories) {
    // Throw if no title is defined for a category
    if (categoryId !== 'uncategorized' && !categoryTitles[categoryId]) {
      throw new Error(`Category "${categoryId}" does not have a title defined.`)
    }
    categoryRules[categoryId] ||= []
    categoryRules[categoryId].push(rule)
  }
}

const presetConfigNames: Record<string, string> = {
  base: 'base',
  'vue3-essential': 'essential',
  'vue3-strongly-recommended': 'strongly-recommended',
  'vue3-recommended': 'recommended'
}

export const getPresetNames = (presetIds: string[]) =>
  presetIds.map((categoryId) => {
    const name = presetConfigNames[categoryId]
    return `\`*.configs${/^[a-z_$][\w$]*$/i.test(name) ? `.${name}` : `["${name}"]`}\``
  })

export const categories = categoryIds
  .map((categoryId) => ({
    categoryId,
    title: categoryTitles[categoryId],
    rules: categoryRules[categoryId] || []
  }))
  .filter((category) => category.rules.length > 0)
