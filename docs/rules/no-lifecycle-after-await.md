---
pageClass: rule-details
sidebarDepth: 0
title: vue/no-lifecycle-after-await
description: disallow asynchronously registered lifecycle hooks
since: v7.0.0
---

# vue/no-lifecycle-after-await

> disallow asynchronously registered lifecycle hooks

- :gear: This rule is included in the following preset configs:
  - `*.configs["essential"]`
  - `*.configs["strongly-recommended"]`
  - `*.configs["recommended"]`

## :book: Rule Details

This rule reports the lifecycle hooks after `await` expression.\
In `setup()` function, `onXXX` lifecycle hooks should be registered synchronously.

<eslint-code-block :rules="{'vue/no-lifecycle-after-await': ['error']}">

```vue
<script>
import { onMounted } from 'vue'
export default {
  async setup() {
    /* ✓ GOOD */
    onMounted(() => { /* ... */ })

    await doSomething()

    /* ✗ BAD */
    onMounted(() => { /* ... */ })
  }
}
</script>
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :books: Further Reading

- [Guide - Composition API - Lifecycle Hooks](https://vuejs.org/api/composition-api-lifecycle.html)
- [Vue RFCs - 0013-composition-api](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0013-composition-api.md)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v7.0.0

## :mag: Implementation

- [Rule source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/lib/rules/no-lifecycle-after-await.ts)
- [Test source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/tests/lib/rules/no-lifecycle-after-await.test.ts)
