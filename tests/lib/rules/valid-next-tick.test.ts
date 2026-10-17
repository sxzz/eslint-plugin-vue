/**
 * @fileoverview enforce valid `nextTick` function calls
 * @author Flo Edelmann
 * @copyright 2021 Flo Edelmann. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
import { RuleTester } from 'eslint'
import rule from '../../../lib/rules/valid-next-tick'
import vueEslintParser from 'vue-eslint-parser'

const tester = new RuleTester({
  languageOptions: {
    parser: vueEslintParser,
    ecmaVersion: 2017,
    sourceType: 'module'
  }
})

tester.run('valid-next-tick', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<script>import { nextTick } from 'vue';
      export default {
        async mounted() {
          await nextTick()
          this.$nextTick(callback)
        }
      }</script>`
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<script>import { nextTick } from 'vue'; export default { mounted() { nextTick(a, b) } }</script>`,
      errors: [
        {
          messageId: 'tooManyParameters',
          line: 1,
          column: 70,
          endLine: 1,
          endColumn: 78
        }
      ]
    }
  ]
})
