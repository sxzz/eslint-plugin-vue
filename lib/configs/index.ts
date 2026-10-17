import base from './base.ts'
import vue3Essential from './vue3-essential.ts'
import vue3StronglyRecommended from './vue3-strongly-recommended.ts'
import vue3StronglyRecommendedError from './vue3-strongly-recommended-error.ts'
import vue3Recommended from './vue3-recommended.ts'
import vue3RecommendedError from './vue3-recommended-error.ts'
import flatBase from './flat/base.ts'
import flatVue3Essential from './flat/vue3-essential.ts'
import flatVue3StronglyRecommended from './flat/vue3-strongly-recommended.ts'
import flatVue3StronglyRecommendedError from './flat/vue3-strongly-recommended-error.ts'
import flatVue3Recommended from './flat/vue3-recommended.ts'
import flatVue3RecommendedError from './flat/vue3-recommended-error.ts'
import noLayoutRules from './no-layout-rules.ts'

const configs = {
  // eslintrc configs
  base,

  essential: vue3Essential,
  'strongly-recommended': vue3StronglyRecommended,
  'strongly-recommended-error': vue3StronglyRecommendedError,
  recommended: vue3Recommended,
  'recommended-error': vue3RecommendedError,

  // flat configs
  'flat/base': flatBase,

  'flat/essential': flatVue3Essential,
  'flat/strongly-recommended': flatVue3StronglyRecommended,
  'flat/strongly-recommended-error': flatVue3StronglyRecommendedError,
  'flat/recommended': flatVue3Recommended,
  'flat/recommended-error': flatVue3RecommendedError,

  // config-format-agnostic configs
  'no-layout-rules': noLayoutRules
}

export default configs
