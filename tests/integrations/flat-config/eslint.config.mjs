import plugin from 'eslint-plugin-vuekit'

export default [
  ...plugin.configs.base,
  {
    rules: {
      'vue/no-duplicate-attributes': 'error'
    }
  }
]
