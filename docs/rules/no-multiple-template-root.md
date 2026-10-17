---
pageClass: rule-details
sidebarDepth: 0
title: vue/no-multiple-template-root
description: disallow adding multiple root nodes to the template
since: v7.0.0
---

# vue/no-multiple-template-root

> disallow adding multiple root nodes to the template

- :no_entry: This rule was **removed** in eslint-plugin-vue v11.0.0.

## :book: Rule Details

This removed rule required a single root element in the template.

```vue
<!-- The root is text -->
<template>Lorem ipsum</template>
```

```vue
<!-- There are multiple root elements -->
<template>
  <div>hello</div>
  <div>hello</div>
</template>
```

```vue
<!-- The root element has `v-for` directives -->
<template>
  <div v-for="item in items" />
</template>
```

```vue
<!-- The root element is `<template>` or `<slot>` -->
<template>
  <slot />
</template>
```

## :wrench: Options

```json
{
  "vue/no-multiple-template-root": ["error", {
    "disallowComments": false
  }]
}
```

- "disallowComments" (`boolean`) Enables there should not be any comments in the template root. Default is `false`.

### "disallowComments": true

```vue
/* ✗ BAD */
<template>
  <!-- root comment -->
  <div>
    vue eslint plugin
  </div>
  <!-- root comment -->
</template>
```

## :rocket: Version

This rule was introduced in eslint-plugin-vue v7.0.0

## :mag: Implementation

- [Rule source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/lib/rules/no-multiple-template-root.js)
- [Test source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/tests/lib/rules/no-multiple-template-root.test.ts)
