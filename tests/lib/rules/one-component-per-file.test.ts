/**
 * @fileoverview enforce that each component should be in its own file
 * @author Armano
 */
import rule from '../../../lib/rules/one-component-per-file'
import { RuleTester } from '../../eslint-compat'

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  }
})

ruleTester.run('one-component-per-file', rule, {
  valid: [
    {
      filename: 'test.js',
      code: `
        const foo = {}
        new Vue({})
      `
    },
    {
      filename: 'test.vue',
      code: `export default {}`
    },
    {
      filename: 'test.vue',
      code: `export default {
        components: {
          test: {
            name: 'foo'
          }
        }
      }`
    },
    {
      filename: 'test.js',
      code: `
        import { createApp } from 'vue'
        createApp({})
      `
    },
    {
      filename: 'test.js',
      code: `
        import { component } from 'other.js'
        component({})
        component({})
      `
    },
    {
      filename: 'test.js',
      code: `
        import { createApp } from 'other.js'
        createApp({})
        createApp({})
      `
    },
    {
      filename: 'test.js',
      code: `
        import { defineComponent } from 'other.js'
        defineComponent({})
        defineComponent({})
      `
    },
    {
      filename: 'test.js',
      code: `
        function createApp() {}
        createApp({})
        createApp({})
      `
    },
    {
      filename: 'test.js',
      code: `
        const { createApp } = require('other.js')
        createApp({})
        createApp({})
      `
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `
        import { createApp } from 'vue'
        createApp({})
        createApp({})
      `,
      errors: [
        {
          message: 'There is more than one component in this file.',
          line: 3,
          column: 19,
          endLine: 3,
          endColumn: 21
        },
        {
          message: 'There is more than one component in this file.',
          line: 4,
          column: 19,
          endLine: 4,
          endColumn: 21
        }
      ]
    },
    {
      filename: 'test.js',
      code: `
        const { createApp } = Vue
        createApp({})
        createApp({})
      `,
      errors: [
        {
          message: 'There is more than one component in this file.',
          line: 3,
          column: 19,
          endLine: 3,
          endColumn: 21
        },
        {
          message: 'There is more than one component in this file.',
          line: 4,
          column: 19,
          endLine: 4,
          endColumn: 21
        }
      ]
    },
    {
      filename: 'test.js',
      code: `
        const createApp = Vue.createApp
        createApp({})
        createApp({})
      `,
      errors: [
        {
          message: 'There is more than one component in this file.',
          line: 3,
          column: 19,
          endLine: 3,
          endColumn: 21
        },
        {
          message: 'There is more than one component in this file.',
          line: 4,
          column: 19,
          endLine: 4,
          endColumn: 21
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        import { defineComponent } from 'vue'
        defineComponent({})
        defineComponent({})
      `,
      errors: [
        {
          message: 'There is more than one component in this file.',
          line: 3,
          column: 25,
          endLine: 3,
          endColumn: 27
        },
        {
          message: 'There is more than one component in this file.',
          line: 4,
          column: 25,
          endLine: 4,
          endColumn: 27
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        defineComponent({})
        defineComponent({})
      `,
      errors: [
        {
          message: 'There is more than one component in this file.',
          line: 2,
          column: 25,
          endLine: 2,
          endColumn: 27
        },
        {
          message: 'There is more than one component in this file.',
          line: 3,
          column: 25,
          endLine: 3,
          endColumn: 27
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        const { defineComponent } = require('vue')
        defineComponent({})
        defineComponent({})
      `,
      errors: [
        {
          message: 'There is more than one component in this file.',
          line: 3,
          column: 25,
          endLine: 3,
          endColumn: 27
        },
        {
          message: 'There is more than one component in this file.',
          line: 4,
          column: 25,
          endLine: 4,
          endColumn: 27
        }
      ]
    }
  ]
})
