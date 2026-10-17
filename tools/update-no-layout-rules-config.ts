/**
 * @author Michał Sajnóg
 * @copyright 2018 Michał Sajnóg. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

/*
 * This script updates `lib/configs/prettier.js`,
 * and disables all layout rules
 */

import fs from 'node:fs'
import path from 'node:path'
import { rules } from './lib/rules.ts'
const rulesToDisable = rules.filter(({ meta }) => meta.type === 'layout')

function formatRules(rules: typeof rulesToDisable) {
  const obj = Object.fromEntries(rules.map((rule) => [rule.ruleId, 'off']))
  return JSON.stringify(obj, null, 2)
}

function generateConfig(rules: typeof rulesToDisable) {
  return `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "ppnpm run update"
 */
import type { Linter } from 'eslint'
export default {
  rules: ${formatRules(rules)}
} satisfies Linter.Config
`
}

// Update files.
const filePath = path.resolve(
  import.meta.dirname,
  '../lib/configs/no-layout-rules.ts'
)
const content = generateConfig(rulesToDisable)
fs.writeFileSync(filePath, content)
