---
pageClass: rule-details
sidebarDepth: 0
title: vue/valid-model-definition
description: require valid keys in model option
since: v9.0.0
---

# vue/valid-model-definition

> require valid keys in model option

- :no_entry: This rule was **removed** in eslint-plugin-vue v11.0.0.

## :book: Rule Details

This rule is aimed at preventing invalid keys in model option.

```vue
<script>
/* ✓ GOOD */
export default {
  model: {
    prop: 'list',
  }
}
</script>
```

```vue
<script>
/* ✓ GOOD */
export default {
  model: {
    event: 'update'
  }
}
</script>
```

```vue
<script>
/* ✓ GOOD */
export default {
  model: {
    prop: 'list',
    event: 'update'
  }
}
</script>
```

```vue
<script>
/* ✗ BAD */
export default {
  model: {
    prop: 'list',
    events: 'update'
  }
}
</script>
```

```vue
<script>
/* ✗ BAD */
export default {
  model: {
    props: 'list',
    events: 'update'
  }
}
</script>
```

```vue
<script>
/* ✗ BAD */
export default {
  model: {
    name: 'checked',
    props: 'list',
    event: 'update'
  }
}
</script>
```

## :rocket: Version

This rule was introduced in eslint-plugin-vue v9.0.0

## :mag: Implementation

- [Rule source](https://github.com/sxzz/eslint-plugin-vue/blob/main/lib/rules/valid-model-definition.js)
- [Test source](https://github.com/sxzz/eslint-plugin-vue/blob/main/tests/lib/rules/valid-model-definition.test.ts)
