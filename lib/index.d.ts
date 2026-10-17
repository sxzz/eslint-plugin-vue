/// <reference path="./eslint-typegen.d.ts" />
import type { Linter } from 'eslint'

declare const vue: {
  meta: any
  configs: {
    base: Linter.FlatConfig[]
    essential: Linter.FlatConfig[]
    'strongly-recommended': Linter.FlatConfig[]
    'strongly-recommended-error': Linter.FlatConfig[]
    recommended: Linter.FlatConfig[]
    'recommended-error': Linter.FlatConfig[]
    'no-layout-rules': Linter.FlatConfig
  }
  rules: Record<string, any>
  processors: {
    '.vue': any
    vue: any
  }
}

export default vue
