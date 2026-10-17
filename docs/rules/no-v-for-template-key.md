---
pageClass: rule-details
sidebarDepth: 0
title: vue/no-v-for-template-key
description: disallow `key` attribute on `<template v-for>`
since: v7.0.0
---

# vue/no-v-for-template-key

> disallow `key` attribute on `<template v-for>`

- :no_entry: This rule was **removed** in eslint-plugin-vue v11.0.0.

## :book: Rule Details

This rule reports the `<template v-for>` elements which have `key` attribute.

This removed rule disallowed `key` on `<template>` elements.

::: warning Note

If you are using Vue.js 3.x, enable the [vue/no-v-for-template-key-on-child] rule instead. Don't enable both rules together; they are conflicting.
:::

```vue
<template>
  <!-- ✓ GOOD -->
  <template v-for="item in list">
    <div :key="item.id" />
  </template>

  <!-- ✗ BAD -->
  <template v-for="item in list" :key="item.id">
    <div />
  </template>
</template>
```

::: tip Note
If you want to report keys placed on `<template>` without `v-for`, use the [vue/no-template-key] rule.
:::

## :wrench: Options

Nothing.

## :couple: Related Rules

- [vue/no-template-key]
- [vue/no-v-for-template-key-on-child]

[vue/no-template-key]: ./no-template-key.md
[vue/no-v-for-template-key-on-child]: ./no-v-for-template-key-on-child.md

## :books: Further Reading

- [API - Special Attributes - key](https://vuejs.org/api/built-in-special-attributes.html#key)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v7.0.0

## :mag: Implementation

- [Rule source](https://github.com/sxzz/eslint-plugin-vue/blob/main/lib/rules/no-v-for-template-key.js)
- [Test source](https://github.com/sxzz/eslint-plugin-vue/blob/main/tests/lib/rules/no-v-for-template-key.test.ts)
