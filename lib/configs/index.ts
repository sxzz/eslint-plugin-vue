import base from './base.ts'
import vue3Essential from './vue3-essential.ts'
import vue3StronglyRecommended from './vue3-strongly-recommended.ts'
import vue3StronglyRecommendedError from './vue3-strongly-recommended-error.ts'
import vue3Recommended from './vue3-recommended.ts'
import vue3RecommendedError from './vue3-recommended-error.ts'
import noLayoutRules from './no-layout-rules.ts'

const configs = {
  base,
  essential: vue3Essential,
  'strongly-recommended': vue3StronglyRecommended,
  'strongly-recommended-error': vue3StronglyRecommendedError,
  recommended: vue3Recommended,
  'recommended-error': vue3RecommendedError,
  'no-layout-rules': noLayoutRules
}

export default configs
