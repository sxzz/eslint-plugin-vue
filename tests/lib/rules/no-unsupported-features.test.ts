/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
import { RuleTester } from 'eslint'
import rule from '../../../lib/rules/no-unsupported-features'
import vueEslintParser from 'vue-eslint-parser'

const tester = new RuleTester({
  languageOptions: { parser: vueEslintParser, ecmaVersion: 2019 }
})

tester.run('no-unsupported-features', rule, {
  valid: [
    {
      code: '<template><MyInput v-model:foo="value" /></template>',
      options: [{ version: '^3.0.0' }]
    }
  ],
  invalid: []
})
