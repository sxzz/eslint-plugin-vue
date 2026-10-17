---
pageClass: rule-details
sidebarDepth: 0
title: vue/no-mutating-props
description: disallow mutation of component props
since: v7.0.0
---

# vue/no-mutating-props

> disallow mutation of component props

- :gear: This rule is included in the following preset configs:
  - `*.configs["essential"]`
  - `*.configs["strongly-recommended"]`
  - `*.configs["recommended"]`

## :book: Rule Details

This rule reports mutation of component props.

<eslint-code-block :rules="{'vue/no-mutating-props': ['error']}">

```vue
<!-- ✗ BAD -->
<template>
  <div>
    <input v-model="value" @click="openModal">
    <button @click="pushItem">Push Item</button>
    <button @click="changeId">Change ID</button>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    openModal() {
      this.value = 'test'
    },
    pushItem() {
      this.list.push(0)
    },
    changeId() {
      this.user.id = 1
    }
  }
}
</script>
```

</eslint-code-block>

<eslint-code-block :rules="{'vue/no-mutating-props': ['error']}">

```vue
<!-- ✓ GOOD -->
<template>
  <div>
    <input :value="value" @input="$emit('input', $event.target.value)" @click="openModal">
    <button @click="pushItem">Push Item</button>
    <button @click="changeId">Change ID</button>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    openModal() {
      this.$emit('input', 'test')
    },
    pushItem() {
      this.$emit('push', 0)
    },
    changeId() {
      this.$emit('change-id', 1)
    }
  }
}
</script>
```

</eslint-code-block>

<eslint-code-block :rules="{'vue/no-mutating-props': ['error']}">

```vue
<script>
export default {
  setup(props) {
    // ✗ BAD
    props.value = 'test'
  }
}
</script>
```

</eslint-code-block>

## :wrench: Options

```json
{
  "vue/no-mutating-props": ["error", {
    "shallowOnly": false
  }]
}
```

- "shallowOnly" (`boolean`) Enables mutating the value of a prop but leaving the reference the same. Default is `false`.

### "shallowOnly": true

<eslint-code-block :rules="{'vue/no-mutating-props': ['error', {shallowOnly: true}]}">

```vue
<!-- ✓ GOOD -->
<template>
  <div>
    <input v-model="value.id" @click="openModal">
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
    openModal() {
      this.value.visible = true
    }
  }
}
</script>
```

</eslint-code-block>

## :books: Further Reading

- [Style guide - Implicit parent-child communication](https://vuejs.org/style-guide/rules-use-with-caution.html#implicit-parent-child-communication)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v7.0.0

## :mag: Implementation

- [Rule source](https://github.com/sxzz/eslint-plugin-vue/blob/main/lib/rules/no-mutating-props.js)
- [Test source](https://github.com/sxzz/eslint-plugin-vue/blob/main/tests/lib/rules/no-mutating-props.test.ts)
