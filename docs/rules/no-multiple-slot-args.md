---
pageClass: rule-details
sidebarDepth: 0
title: vue/no-multiple-slot-args
description: disallow passing multiple arguments to scoped slots
since: v7.0.0
---

# vue/no-multiple-slot-args

> disallow passing multiple arguments to scoped slots

- :gear: This rule is included in the following preset configs:
  - `*.configs.recommended`

## :book: Rule Details

This rule disallows to pass multiple arguments to scoped slots.\
In details, it reports call expressions if a call of `this.$scopedSlots` members has 2 or more arguments.

<eslint-code-block :rules="{'vue/no-multiple-slot-args': ['error']}">

```vue
<script>
export default {
  render(h) {
    /* ✓ GOOD */
    var children = this.$scopedSlots.default()
    var children = this.$scopedSlots.default(foo)
    var children = this.$scopedSlots.default({ foo, bar })

    /* ✗ BAD */
    var children = this.$scopedSlots.default(foo, bar)
    var children = this.$scopedSlots.default(...foo)
  }
}
</script>
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :books: Further Reading

- [vuejs/vue#9468](https://github.com/vuejs/vue/issues/9468#issuecomment-462210146)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v7.0.0

## :mag: Implementation

- [Rule source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/lib/rules/no-multiple-slot-args.ts)
- [Test source](https://github.com/sxzz/eslint-plugin-vuekit/blob/main/tests/lib/rules/no-multiple-slot-args.test.ts)
