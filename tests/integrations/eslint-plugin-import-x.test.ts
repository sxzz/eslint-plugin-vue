/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import semver from 'semver'

const PLUGIN_DIR = path.join(import.meta.dirname, 'eslint-plugin-import-x')
const ESLINT = path.join(PLUGIN_DIR, 'node_modules', '.bin', 'eslint')

let eslintNodeVersion = ''

describe('Integration with eslint-plugin-import-x', () => {
  beforeAll(() => {
    const eslintPackagePath = path.join(
      PLUGIN_DIR,
      'node_modules/eslint/package.json'
    )
    eslintNodeVersion = JSON.parse(readFileSync(eslintPackagePath, 'utf8'))
      .engines.node
  })

  // Keep both plugins active to catch integration regressions.
  it.skipIf(!semver.satisfies(process.version, eslintNodeVersion))(
    'should lint without errors',
    () => {
      execSync(`${ESLINT} --config eslint.config.mjs a.vue`, {
        cwd: PLUGIN_DIR,
        stdio: 'inherit'
      })
    }
  )
})
