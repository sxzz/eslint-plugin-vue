---
pageClass: rule-details
sidebarDepth: 0
title: vue/no-custom-modifiers-on-v-model
description: disallow custom modifiers on v-model used on the component
since: v7.0.0
---

# vue/no-custom-modifiers-on-v-model

> disallow custom modifiers on v-model used on the component

- :no_entry: This rule was **removed** in eslint-plugin-vue v11.0.0.

This rule checks whether `v-model` used on the component do not have custom modifiers.

## :book: Rule Details

This rule reports `v-model` directives in the following cases:

- The directive used on the component has custom modifiers. E.g. `<MyComponent v-model.aaa="foo" />`

```vue
<template>
  <!-- ✓ GOOD -->
  <MyComponent v-model="foo" />
  <MyComponent v-model.trim="foo" />
  <MyComponent v-model.lazy="foo" />
  <MyComponent v-model.number="foo" />

  <!-- ✗ BAD -->
  <MyComponent v-model.aaa="foo" />
  <MyComponent v-model.aaa.bbb="foo" />
</template>
```

## :wrench: Options

Nothing.

## :couple: Related Rules

- [vue/valid-v-model]

[vue/valid-v-model]: ./valid-v-model.md

## :rocket: Version

This rule was introduced in eslint-plugin-vue v7.0.0

## :mag: Implementation

- [Rule source](https://github.com/sxzz/eslint-plugin-vue/blob/main/lib/rules/no-custom-modifiers-on-v-model.js)
- [Test source](https://github.com/sxzz/eslint-plugin-vue/blob/main/tests/lib/rules/no-custom-modifiers-on-v-model.test.ts)
