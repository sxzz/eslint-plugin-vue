---
pageClass: rule-details
sidebarDepth: 0
title: vue/no-deprecated-slot-scope-attribute
description: disallow deprecated `slot-scope` attribute
since: v6.1.0
---

# vue/no-deprecated-slot-scope-attribute

> disallow deprecated `slot-scope` attribute

- :gear: This rule is included in the following preset configs:
  - `*.configs.essential`
  - `*.configs["strongly-recommended"]`
  - `*.configs.recommended`
- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fix-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule reports deprecated `slot-scope` attribute in Vue.js v2.6.0+.

<eslint-code-block fix :rules="{'vue/no-deprecated-slot-scope-attribute': ['error']}">

```vue
<template>
  <ListComponent>
    <!-- ✓ GOOD -->
    <template v-slot="props">
      {{ props.title }}
    </template>
  </ListComponent>
  <ListComponent>
    <!-- ✗ BAD -->
    <template slot-scope="props">
      {{ props.title }}
    </template>
  </ListComponent>
</template>
```

</eslint-code-block>

## :books: Further Reading

## :rocket: Version

This rule was introduced in eslint-plugin-vue v6.1.0

## :mag: Implementation

- [Rule source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/lib/rules/no-deprecated-slot-scope-attribute.ts)
- [Test source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/tests/lib/rules/no-deprecated-slot-scope-attribute.test.ts)
