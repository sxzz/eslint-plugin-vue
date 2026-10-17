import type { ESLint, Rule } from 'eslint'
import { configs, type Configs } from './configs/index.ts'
import { plugin } from './plugin.ts'

type VuePlugin = {
  configs: Configs
  meta: { name: string; version: string }
  rules: Record<string, Rule.RuleModule>
  processors: {
    vue: NonNullable<ESLint.Plugin['processors']>[string]
  }
}

const vue: VuePlugin = Object.assign(plugin, {
  configs: configs as unknown as Configs
})

export default vue
