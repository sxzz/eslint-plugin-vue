import plugin from 'eslint-plugin-v'

export default [
  ...plugin.configs.base,
  {
    rules: {
      'vue/no-duplicate-attributes': 'error'
    }
  }
]
