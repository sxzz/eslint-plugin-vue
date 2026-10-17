/*
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
  plugins: ['vue'],
  rules: {
    'vue/comment-directive': 'error',
    'vue/jsx-uses-vars': 'error'
  },
  overrides: [
    {
      files: '*.vue',
      parser: resolve('vue-eslint-parser')
    }
  ]
}
