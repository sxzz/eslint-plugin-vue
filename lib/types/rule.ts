import type {
  Rule as ESLintRule,
  SourceCode as ESLintSourceCode,
  Scope as ESLintScope,
  AST as ESLintAST
} from 'eslint'
import type * as ParserScope from '@typescript-eslint/scope-manager'
import type { AST as VueAST, parseForESLint } from 'vue-eslint-parser'
import type { TSESTree } from '@typescript-eslint/types'
import type {
  ASTNode,
  ESNode,
  HasLocation,
  Normalize,
  Program,
  Token,
  Comment,
  Range,
  VDocumentFragment
} from './ast.ts'
import type { NodeListenerMap, VNodeListenerMap } from './visitors.ts'

type NativeParserServices = NonNullable<
  ReturnType<typeof parseForESLint>['services']
>
type NativeTokenStore = ReturnType<
  NativeParserServices['getTemplateBodyTokenStore']
>
type RequiredTokenMethod =
  'getFirstToken' | 'getLastToken' | 'getTokenBefore' | 'getTokenAfter'
type RequiredTokenStore = {
  [Key in RequiredTokenMethod]: {
    (node: HasLocation): Token
    (node: HasLocation, options: number): Token
    (node: HasLocation, options: { includeComments: boolean }): Token
    (node: HasLocation, options: CursorWithSkipOptions): Token | null
  }
}
export type TokenStore = Omit<NativeTokenStore, RequiredTokenMethod> &
  RequiredTokenStore
export type CursorWithSkipOptions =
  | number
  | ((token: Token) => boolean)
  | {
      includeComments?: boolean
      filter?: (token: Token) => boolean
      skip?: number
    }
export type CursorWithCountOptions =
  | number
  | ((token: Token) => boolean)
  | {
      includeComments?: boolean
      filter?: (token: Token) => boolean
      count?: number
    }

export interface ParserServices extends Omit<
  Partial<NativeParserServices>,
  | 'defineTemplateBodyVisitor'
  | 'defineDocumentVisitor'
  | 'getTemplateBodyTokenStore'
  | 'getDocumentFragment'
> {
  getTemplateBodyTokenStore(): TokenStore
  getDocumentFragment?(): VDocumentFragment | null
  defineTemplateBodyVisitor?(
    template: TemplateListener,
    script?: Rule.RuleListener,
    options?: { templateBodyTriggerSelector: 'Program' | 'Program:exit' }
  ): Rule.RuleListener
  defineDocumentVisitor?(
    document: TemplateListener,
    options?: { triggerSelector: 'Program' | 'Program:exit' }
  ): Rule.RuleListener
  esTreeNodeToTSNodeMap?: Map<ESNode | TSESTree.Node, import('typescript').Node>
  program?: import('typescript').Program
  hasFullTypeInformation?: boolean
}
export namespace ParserServices {
  export type TokenStore = import('./rule.ts').TokenStore
}

export interface SourceCode
  extends
    Omit<
      ESLintSourceCode,
      | keyof NativeTokenStore
      | 'ast'
      | 'parserServices'
      | 'scopeManager'
      | 'getText'
      | 'getAllComments'
      | 'getCommentsBefore'
      | 'getCommentsAfter'
      | 'getCommentsInside'
      | 'getScope'
      | 'getDeclaredVariables'
      | 'getNodeByRangeIndex'
      | 'markVariableAsUsed'
    >,
    TokenStore {
  ast: Program
  tokensAndComments: Token[]
  parserServices: ParserServices
  scopeManager: Scope.ScopeManager
  getText(node?: HasLocation, beforeCount?: number, afterCount?: number): string
  getAllComments(): Comment[]
  getCommentsBefore(node: HasLocation): Token[]
  getCommentsAfter(node: HasLocation): Token[]
  getCommentsInside(node: HasLocation): Token[]
  getScope(node: HasLocation): Scope.Scope
  getDeclaredVariables(node: HasLocation): Scope.Variable[]
  getNodeByRangeIndex(index: number): ASTNode | null
  markVariableAsUsed(name: string, node?: HasLocation): boolean
}
export namespace SourceCode {
  export type CursorWithSkipOptions = import('./rule.ts').CursorWithSkipOptions
  export type CursorWithCountOptions =
    import('./rule.ts').CursorWithCountOptions
  export type ParserServices = import('./rule.ts').ParserServices
}
export namespace Scope {
  export type Scope = Normalize<ParserScope.Scope>
  export type ScopeManager = Normalize<ParserScope.ScopeManager>
  export type Variable = Normalize<ParserScope.Variable>
  export type Reference = Normalize<ParserScope.Reference>
  export type Definition = Normalize<ParserScope.Definition>
}

type VueFixer = {
  [Key in keyof ESLintRule.RuleFixer]: ESLintRule.RuleFixer[Key] extends (
    node: infer Node,
    ...args: infer Args
  ) => infer Result
    ? (node: Node extends Range ? Node : HasLocation, ...args: Args) => Result
    : ESLintRule.RuleFixer[Key]
}
type FixFunction = (
  fixer: VueFixer
) => ESLintRule.Fix | ESLintRule.Fix[] | IterableIterator<ESLintRule.Fix> | null
export type ReportDescriptorFix = FixFunction
export type ReportSourceLocation = VueAST.Location | VueAST.LocationRange
type VueSuggestion<Suggestion> = Suggestion extends unknown
  ? Omit<Suggestion, 'fix'> & { fix: FixFunction }
  : never
type VueReport<Report> = Report extends unknown
  ? Omit<Report, 'node' | 'fix' | 'suggest'> & {
      node?: HasLocation
      fix?: FixFunction | null
      suggest?: Rule.SuggestionReportDescriptor[] | null
    }
  : never
type VueRuleContext = Omit<ESLintRule.RuleContext, 'sourceCode' | 'report'> & {
  sourceCode: SourceCode
  report(descriptor: Rule.ReportDescriptor): void
}
type ListenerMap<Map> = { [Key in keyof Map]?: (node: Map[Key]) => void }
type SelectorListener = {
  [selector: string]: ((node: never) => void) | undefined
}
export type TemplateListener = ListenerMap<VNodeListenerMap> & SelectorListener

export namespace Rule {
  export type RuleContext = VueRuleContext
  export type RuleFixer = VueFixer
  export type Fix = ESLintRule.Fix
  export type CodePath = ESLintRule.CodePath
  export type CodePathSegment = ESLintRule.CodePathSegment
  export type ReportDescriptor = VueReport<ESLintRule.ReportDescriptor>
  export type SuggestionReportDescriptor =
    VueSuggestion<ESLintRule.SuggestionReportDescriptor>
  export type NodeListener = ListenerMap<NodeListenerMap> & SelectorListener
  export type RuleListener = ListenerMap<NodeListenerMap> & {
    onCodePathStart?(path: ESLintRule.CodePath, node: ASTNode): void
    onCodePathEnd?(path: ESLintRule.CodePath, node: ASTNode): void
    onCodePathSegmentStart?(
      segment: ESLintRule.CodePathSegment,
      node: ASTNode
    ): void
    onCodePathSegmentEnd?(
      segment: ESLintRule.CodePathSegment,
      node: ASTNode
    ): void
    onCodePathSegmentLoop?(
      from: ESLintRule.CodePathSegment,
      to: ESLintRule.CodePathSegment,
      node: ASTNode
    ): void
    [selector: string]: ((...args: never[]) => void) | undefined
  }
  export type RuleMetadata = Omit<ESLintRule.RuleMetaData, 'docs'> & {
    docs: ESLintRule.RuleMetaData['docs'] & {
      categories?: string[] | null
      extensionSource?: { url?: string; name: string }
      defaultOptions?: Record<string, unknown>
    }
  }
  export interface RuleModule {
    meta: RuleMetadata
    create(context: RuleContext): RuleListener
  }
}

export type PublicRuleModule = Rule.RuleModule & ESLintRule.RuleModule

export type RuleDefinition = Omit<Rule.RuleModule, 'meta'> & {
  meta?: Rule.RuleMetadata
}

/** Adapt the upstream ESTree utility signatures to the parser's Vue and TS AST. */
export type WithVue<T> = T extends (...args: infer Args) => infer Result
  ? (...args: { [Key in keyof Args]: WithVue<Args[Key]> }) => WithVue<Result>
  : T extends ESLintSourceCode
    ? SourceCode | TokenStore
    : T extends ESLintScope.Scope
      ? Scope.Scope
      : T extends ESLintScope.Variable
        ? Scope.Variable
        : T extends ESLintScope.Reference
          ? Scope.Reference
          : T extends ESLintAST.Token | import('estree').Comment
            ? Token
            : T extends IterableIterator<infer Item>
              ? IterableIterator<WithVue<Item>>
              : T extends {
                    node: ESLintRule.Node
                    path: string[]
                    type: symbol
                    info: unknown
                  }
                ? Omit<T, 'node'> & { node: ESNode }
                : T extends import('estree').Node
                  ? ESNode
                  : Normalize<T>
