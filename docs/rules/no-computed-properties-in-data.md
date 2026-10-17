---
pageClass: rule-details
sidebarDepth: 0
title: vue/no-computed-properties-in-data
description: disallow accessing computed properties in `data`
since: v7.20.0
---

# vue/no-computed-properties-in-data

> disallow accessing computed properties in `data`

- :gear: This rule is included in the following preset configs:
  - `*.configs.essential`
  - `*.configs["strongly-recommended"]`
  - `*.configs.recommended`

## :book: Rule Details

This rule disallow accessing computed properties in `data()`.\
The computed property cannot be accessed in `data()` because is before initialization.

<eslint-code-block :rules="{'vue/no-computed-properties-in-data': ['error']}">

```vue
<script>
export default {
  data() {
    return {
      /* ✗ BAD */
      bar: this.foo
    }
  },
  computed: {
    foo() {}
  }
}
</script>
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-vue v7.20.0

## :mag: Implementation

- [Rule source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/lib/rules/no-computed-properties-in-data.ts)
- [Test source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/tests/lib/rules/no-computed-properties-in-data.test.ts)
