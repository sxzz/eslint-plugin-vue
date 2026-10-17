import vueEslintParser from 'vue-eslint-parser'
import { importX } from 'eslint-plugin-import-x'
import eslintPluginVuekit from 'eslint-plugin-vuekit'

export default [
  {
    files: ['*.vue'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2015
      }
    },
    plugins: {
      'import-x': importX,
      vue: eslintPluginVuekit
    },
    rules: {
      'import-x/default': 'warn',
      'import-x/namespace': 'warn'
    },
    settings: {
      'import-x/extensions': ['.js', '.vue']
    }
  }
]
