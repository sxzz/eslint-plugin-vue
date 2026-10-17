/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "pnpm run update"
 */
import type { Linter } from 'eslint'
import config from './vue3-strongly-recommended.ts'

export default [
  ...config,
  {
    name: 'vue/recommended/rules',
    rules: {
      'vue/attributes-order': 'warn',
      'vue/block-order': 'warn',
      'vue/no-lone-template': 'warn',
      'vue/no-multiple-slot-args': 'warn',
      'vue/no-required-prop-with-default': 'warn',
      'vue/no-v-html': 'warn',
      'vue/order-in-components': 'warn',
      'vue/this-in-template': 'warn'
    }
  }
] satisfies Linter.Config[]
