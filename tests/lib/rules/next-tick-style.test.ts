/**
 * @fileoverview enforce Promise or callback style in `nextTick`
 * @author Flo Edelmann
 * @copyright 2020 Flo Edelmann. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
import { RuleTester } from '../../eslint-compat'
import rule from '../../../lib/rules/next-tick-style'
import vueEslintParser from 'vue-eslint-parser'

const tester = new RuleTester({
  languageOptions: {
    parser: vueEslintParser,
    ecmaVersion: 2017,
    sourceType: 'module'
  }
})

tester.run('next-tick-style', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<script>import { nextTick } from 'vue'; export default { mounted() { nextTick().then(callback) } }</script>`
    },
    {
      filename: 'test.vue',
      code: `<script>export default { mounted() { this.$nextTick(callback) } }</script>`,
      options: ['callback']
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<script>import { nextTick } from 'vue'; export default { mounted() { nextTick(callback) } }</script>`,
      output: `<script>import { nextTick } from 'vue'; export default { mounted() { nextTick().then(callback) } }</script>`,
      errors: [
        {
          messageId: 'usePromise',
          line: 1,
          column: 70,
          endLine: 1,
          endColumn: 78
        }
      ]
    }
  ]
})
