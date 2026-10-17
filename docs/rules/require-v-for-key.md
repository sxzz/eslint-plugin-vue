---
pageClass: rule-details
sidebarDepth: 0
title: vue/require-v-for-key
description: require `v-bind:key` with `v-for` directives
since: v3.0.0
---

# vue/require-v-for-key

> require `v-bind:key` with `v-for` directives

- :gear: This rule is included in the following preset configs:
  - `*.configs.essential`
  - `*.configs["strongly-recommended"]`
  - `*.configs.recommended`

## :book: Rule Details

This rule reports the elements which have `v-for` and do not have `v-bind:key` with exception to custom components.

<eslint-code-block :rules="{'vue/require-v-for-key': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <div v-for="todo in todos" :key="todo.id" />
  <!-- ✗ BAD -->
  <div v-for="todo in todos" />
</template>
```

</eslint-code-block>

::: warning Note
This rule does not report missing `v-bind:key` on custom components.
It will be reported by [vue/valid-v-for] rule.
:::

## :wrench: Options

Nothing.

## :couple: Related Rules

- [vue/valid-v-for]
- [vue/v-if-else-key]

[vue/valid-v-for]: ./valid-v-for.md
[vue/v-if-else-key]: ./v-if-else-key.md

## :books: Further Reading

- [Style guide - Keyed v-for](https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v3.0.0

## :mag: Implementation

- [Rule source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/lib/rules/require-v-for-key.ts)
- [Test source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/tests/lib/rules/require-v-for-key.test.ts)
