import type { Rule as VueRule, Scope, PublicRuleModule } from './rule.ts'

export type * from './ast.ts'
export type * from './visitors.ts'
export type {
  Rule,
  SourceCode,
  ParserServices,
  TemplateListener
} from './rule.ts'

export type RuleModule = PublicRuleModule
export type RuleContext = VueRule.RuleContext
export type RuleFixer = VueRule.RuleFixer
export type Fix = VueRule.Fix
export type NodeListener = VueRule.NodeListener
export type RuleListener = VueRule.RuleListener
export type Variable = Scope.Variable
export type Reference = Scope.Reference
