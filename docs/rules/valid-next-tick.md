---
pageClass: rule-details
sidebarDepth: 0
title: vue/valid-next-tick
description: enforce valid `nextTick` function calls
since: v7.5.0
---

# vue/valid-next-tick

> enforce valid `nextTick` function calls

- :gear: This rule is included in the following preset configs:
  - `*.configs["essential"]`
  - `*.configs["strongly-recommended"]`
  - `*.configs["recommended"]`
- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fix-problems) can automatically fix some of the problems reported by this rule.
- :bulb: Some problems reported by this rule are manually fixable by editor [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

## :book: Rule Details

Calling `nextTick()` or `this.$nextTick()` without a callback or awaiting the returned Promise is likely a mistake.

```vue
<script>
import { nextTick } from 'vue'

export default {
  async mounted() {
    // ✗ BAD
    nextTick()

    // ✓ GOOD
    await nextTick()
    this.$nextTick(callback)
  }
}
</script>
```

## :wrench: Options

Nothing.

## :books: Further Reading

- [Global API: nextTick](https://vuejs.org/api/general.html#nexttick)
- [Component instance: $nextTick](https://vuejs.org/api/component-instance.html#nexttick)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v7.5.0

## :mag: Implementation

- [Rule source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/lib/rules/valid-next-tick.ts)
- [Test source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/tests/lib/rules/valid-next-tick.test.ts)
