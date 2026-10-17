/// <reference path="./eslint-typegen.d.ts" />
import type { Linter } from 'eslint'

declare const vue: {
  meta: any
  configs: {
    base: Linter.LegacyConfig

    essential: Linter.LegacyConfig
    'strongly-recommended': Linter.LegacyConfig
    'strongly-recommended-error': Linter.LegacyConfig
    recommended: Linter.LegacyConfig
    'recommended-error': Linter.LegacyConfig

    'flat/base': Linter.FlatConfig[]

    'flat/essential': Linter.FlatConfig[]
    'flat/strongly-recommended': Linter.FlatConfig[]
    'flat/strongly-recommended-error': Linter.FlatConfig[]
    'flat/recommended': Linter.FlatConfig[]
    'flat/recommended-error': Linter.FlatConfig[]

    'no-layout-rules': Linter.LegacyConfig
  }
  rules: Record<string, any>
  processors: {
    '.vue': any
    vue: any
  }
}

export default vue
