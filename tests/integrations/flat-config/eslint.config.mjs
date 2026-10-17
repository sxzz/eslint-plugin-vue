import plugin from 'eslint-plugin-vue'

export default [
  ...plugin.configs.base,
  {
    rules: {
      'vue/no-duplicate-attributes': 'error'
    }
  }
]
