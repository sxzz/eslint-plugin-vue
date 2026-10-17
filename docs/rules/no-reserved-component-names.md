---
pageClass: rule-details
sidebarDepth: 0
title: vue/no-reserved-component-names
description: disallow the use of reserved names in component definitions
since: v6.1.0
---

# vue/no-reserved-component-names

> disallow the use of reserved names in component definitions

- :gear: This rule is included in the following preset configs:
  - `*.configs.essential`
  - `*.configs["strongly-recommended"]`
  - `*.configs.recommended`

## :book: Rule Details

This rule prevents name collisions between Vue components and standard HTML elements and built-in components.

<eslint-code-block :rules="{'vue/no-reserved-component-names': ['error']}">

```vue
<script>
/* ✗ BAD */
export default {
  name: 'div'
}
</script>
```

</eslint-code-block>

## :wrench: Options

```json
{
  "vue/no-reserved-component-names": ["error", {
    "disallowVue3BuiltInComponents": false,
    "htmlElementCaseSensitive": false,
  }]
}
```

- `disallowVue3BuiltInComponents` (`boolean`) ... If `true`, disallow Vue.js 3.x built-in component names. Default is `false`.
- `htmlElementCaseSensitive` (`boolean`) ... If `true`, component names must exactly match the case of an HTML element to be considered conflicting. Default is `false` (i.e. case-insensitve comparison).

### `"disallowVue3BuiltInComponents": true`

<eslint-code-block :rules="{'vue/no-reserved-component-names': ['error', {disallowVue3BuiltInComponents: true}]}">

```vue
<script>
/* ✗ BAD */
export default {
  name: 'teleport'
}
</script>
```

</eslint-code-block>

### `"htmlElementCaseSensitive": true`

<eslint-code-block :rules="{'vue/no-reserved-component-names': ['error', {htmlElementCaseSensitive: true}]}">

```vue
<script>
/* ✓ GOOD */
export default {
  name: 'Button'
}
</script>
```

</eslint-code-block>

<eslint-code-block :rules="{'vue/no-reserved-component-names': ['error', {htmlElementCaseSensitive: true}]}">

```vue
<script>
/* ✗ BAD */
export default {
  name: 'button'
}
</script>
```

</eslint-code-block>

## :couple: Related Rules

- [vue/multi-word-component-names](./multi-word-component-names.md)

## :books: Further Reading

- [List of html elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [List of SVG elements](https://developer.mozilla.org/en-US/docs/Web/SVG/Element)
- [Kebab case elements](https://stackoverflow.com/questions/22545621/do-custom-elements-require-a-dash-in-their-name/22545622#22545622)
- [Valid custom element name](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)
- [API - Built-In Components](https://vuejs.org/api/built-in-components.html)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v6.1.0

## :mag: Implementation

- [Rule source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/lib/rules/no-reserved-component-names.ts)
- [Test source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/tests/lib/rules/no-reserved-component-names.test.ts)
