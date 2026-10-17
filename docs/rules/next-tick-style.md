---
pageClass: rule-details
sidebarDepth: 0
title: vue/next-tick-style
description: enforce Promise or callback style in `nextTick`
since: v7.5.0
---

# vue/next-tick-style

> enforce Promise or callback style in `nextTick`

- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fix-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces either Promise or callback style for `nextTick()` and `this.$nextTick()`.

```vue
<script>
import { nextTick } from 'vue'

export default {
  mounted() {
    // ✓ GOOD with the default Promise style
    nextTick().then(callback)

    // ✗ BAD with the default Promise style
    this.$nextTick(callback)
  }
}
</script>
```

## :wrench: Options

The default is `"promise"`. Set the option to `"callback"` to require a callback instead.

## :books: Further Reading

- [Global API: nextTick](https://vuejs.org/api/general.html#nexttick)
- [Component instance: $nextTick](https://vuejs.org/api/component-instance.html#nexttick)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v7.5.0

## :mag: Implementation

- [Rule source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/lib/rules/next-tick-style.ts)
- [Test source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/tests/lib/rules/next-tick-style.test.ts)
