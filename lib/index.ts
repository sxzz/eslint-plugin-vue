import type { Rule, Linter } from 'eslint'
import { configs, type Configs } from './configs/index.ts'
import { plugin } from './plugin.ts'

type VuePlugin = {
  meta: { name: string; version: string }
  rules: Record<string, Rule.RuleModule>
  processors: {
    vue: Linter.Processor
  }
  configs: Configs
}

const vue: VuePlugin = Object.assign(plugin, {
  configs
})

export default vue
