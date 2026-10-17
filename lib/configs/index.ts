import base from './base.ts'
import vue3Essential from './vue3-essential.ts'
import vue3StronglyRecommended from './vue3-strongly-recommended.ts'
import vue3StronglyRecommendedError from './vue3-strongly-recommended-error.ts'
import vue3Recommended from './vue3-recommended.ts'
import vue3RecommendedError from './vue3-recommended-error.ts'
import noLayoutRules from './no-layout-rules.ts'
import type { Linter } from 'eslint'

export type Configs = {
  base: Linter.Config[]
  essential: Linter.Config[]
  'strongly-recommended': Linter.Config[]
  'strongly-recommended-error': Linter.Config[]
  recommended: Linter.Config[]
  'recommended-error': Linter.Config[]
  'no-layout-rules': Linter.Config
}

export const configs: Configs = {
  base,
  essential: vue3Essential,
  'strongly-recommended': vue3StronglyRecommended,
  'strongly-recommended-error': vue3StronglyRecommendedError,
  recommended: vue3Recommended,
  'recommended-error': vue3RecommendedError,
  'no-layout-rules': noLayoutRules
}
