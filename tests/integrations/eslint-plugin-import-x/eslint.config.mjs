import vueEslintParser from 'vue-eslint-parser'
import { importX } from 'eslint-plugin-import-x'
import eslintPluginVue from 'eslint-plugin-v'

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
      vue: eslintPluginVue
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
