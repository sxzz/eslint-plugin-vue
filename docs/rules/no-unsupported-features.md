---
pageClass: rule-details
sidebarDepth: 0
title: vue/no-unsupported-features
description: disallow unsupported Vue.js syntax on the specified version
since: v6.1.0
---

# vue/no-unsupported-features

> disallow unsupported Vue.js syntax on the specified version

- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fix-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule reports unsupported Vue.js syntax on the specified version.

## :wrench: Options

```json
{
  "vue/no-unsupported-features": [
    "error",
    {
      "version": "^3.2.0",
      "ignores": []
    }
  ]
}
```

- `version` ... The `version` option accepts [a semantic version range supported by verkit](https://github.com/sxzz/verkit#ranges). Set the version of Vue.js you are using. This option is required.
- `ignores` ... You can use this `ignores` option to ignore the given features.
  The `"ignores"` option accepts an array of the following strings.
  - Vue.js 3.4.0+
    - `"define-model"` ... `defineModel()` macro.
    - `"v-bind-same-name-shorthand"` ... `v-bind` same-name shorthand.
  - Vue.js 3.3.0+
    - `"define-slots"` ... `defineSlots()` macro.
    - `"define-options"` ... `defineOptions()` macro.
  - Vue.js 3.2.0+
    - `"v-memo"` ... [v-memo](https://vuejs.org/api/built-in-directives.html#v-memo) directive.
    - `"v-bind-prop-modifier-shorthand"` ... `v-bind` with `.prop` modifier shorthand.
    - `"v-bind-attr-modifier"` ... `.attr` modifier on `v-bind` directive.
  - Vue.js 3.1.0+
    - `"is-attribute-with-vue-prefix"` ... [`is` attribute with `vue:` prefix](https://vuejs.org/api/built-in-special-attributes.html#is)
  - Vue.js 3.0.3+
    - `"style-css-vars-injection"` ... [SFC CSS variable injection][Vue RFCs - 0043-sfc-style-variables].

## :books: Further Reading

- [API - defineOptions()](https://vuejs.org/api/sfc-script-setup.html#defineoptions)
- [API - defineSlots()](https://vuejs.org/api/sfc-script-setup.html#defineslots)
- [API - v-memo](https://vuejs.org/api/built-in-directives.html#v-memo)
- [API - v-is](https://v3.vuejs.org/api/directives.html#v-is)
- [API - v-is (Old)](https://github.com/vuejs/docs-next/blob/008613756c3d781128d96b64a2d27f7598f8f548/src/api/directives.md#v-is)
- [Guide - Dynamic Arguments](https://vuejs.org/guide/essentials/template-syntax.html#dynamic-arguments)
- [API - v-slot](https://vuejs.org/api/built-in-directives.html#v-slot)
- [Vue RFCs - 0043-sfc-style-variables]
- [Vue RFCs - v-bind .prop shorthand proposal]

[Vue RFCs - 0043-sfc-style-variables]: https://github.com/vuejs/rfcs/blob/master/active-rfcs/0043-sfc-style-variables.md
[Vue RFCs - v-bind .prop shorthand proposal]: https://github.com/vuejs/rfcs/pull/18

## :rocket: Version

This rule was introduced in eslint-plugin-vue v6.1.0

## :mag: Implementation

- [Rule source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/lib/rules/no-unsupported-features.ts)
- [Test source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/tests/lib/rules/no-unsupported-features.test.ts)
