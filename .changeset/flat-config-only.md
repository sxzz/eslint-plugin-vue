---
'eslint-plugin-vue': major
---

Remove eslintrc presets and expose the flat configs as `configs.base`, `configs.essential`, `configs.strongly-recommended`, and `configs.recommended` (including their `-error` variants). Remove the `flat/` prefix from config names and bundle the package into a single entry point.
