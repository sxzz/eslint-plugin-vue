/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = path.resolve(import.meta.dirname, '../../lib/rules')

function interopDefault(mod: any) {
  return 'default' in mod ? mod.default : mod
}

const ruleFiles = fs.readdirSync(ROOT).filter((file) => {
  const ext = path.extname(file)
  return ext === '.ts'
})

export const rules = await Promise.all(
  ruleFiles.map(async (file) => {
    const ext = path.extname(file)
    const name = path.basename(file, ext)

    const moduleUrl = pathToFileURL(path.join(ROOT, file)).href
    const meta = { ...interopDefault(await import(moduleUrl)).meta }
    if (meta.docs && !meta.docs.categories && meta.docs.category) {
      // for vue3 migration
      meta.docs = { ...meta.docs }
      meta.docs.categories = [meta.docs.category]
    }
    return {
      ruleId: `vue/${name}`,
      name,
      ext,
      meta
    }
  })
)
