import type { TSESTree } from '@typescript-eslint/types'
import type { AST as VueAST } from 'vue-eslint-parser'

/** Combine parser nodes with the parent links attached by ESLint. */
type ParserNode = TSESTree.Node | Extract<VueAST.Node, { type: `V${string}` }>
type ParserKind = `${ParserNode['type']}`
type ParserNodeMap = {
  [Kind in ParserNode['type']]: Extract<ParserNode, { type: Kind }>
}
export type Normalize<T> = 0 extends 1 & T
  ? T
  : T extends {
        type:
          | 'RestProperty'
          | 'ExperimentalRestProperty'
          | 'SpreadProperty'
          | 'ExperimentalSpreadProperty'
      }
    ? never
    : T extends { type: infer Kind extends ParserKind }
      ? 'range' extends keyof T
        ? Kind extends 'Program'
          ? Program
          : Kind extends 'Property'
            ? Property | AssignmentProperty
            : T extends ParserNode
              ? NormalizeNode<T>
              : NormalizeNode<Extract<ParserNode, { type: Kind }>>
        : NormalizeObject<T>
      : NormalizeObject<T>
type NormalizeObject<T> = T extends RegExp
  ? T
  : T extends (...args: infer Args) => infer Result
    ? (
        ...args: { [Key in keyof Args]: Normalize<Args[Key]> }
      ) => Normalize<Result>
    : T extends readonly unknown[]
      ? number extends T['length']
        ? Normalize<T[number]>[]
        : { [Key in keyof T]: Normalize<T[Key]> }
      : T extends Map<infer Key, infer Value>
        ? Map<Normalize<Key>, Normalize<Value>>
        : T extends object
          ? { [Key in keyof T]: Normalize<T[Key]> }
          : T
type NormalizeNode<Node> = Node extends { type: string }
  ? {
      [Key in keyof Node as Key extends 'parent' ? never : Key]: Node extends {
        type: 'ObjectExpression'
      }
        ? Key extends 'properties'
          ? (Property | SpreadElement)[]
          : Normalize<Node[Key]>
        : Node extends { type: 'ObjectPattern' }
          ? Key extends 'properties'
            ? (AssignmentProperty | RestElement)[]
            : Normalize<Node[Key]>
          : Node extends { type: 'AssignmentExpression' }
            ? Key extends 'left'
              ? Pattern
              : Normalize<Node[Key]>
            : Node extends { type: 'VExpressionContainer' }
              ? Key extends 'expression'
                ? | Expression
                  | VFilterSequenceExpression
                  | VForExpression
                  | VOnExpression
                  | VSlotScopeExpression
                  | null
                : Normalize<Node[Key]>
              : Normalize<Node[Key]>
    } & {
      parent: Node extends { type: 'Program' }
        ? null
        : Node extends { type: `V${string}`; parent?: infer Parent }
          ? Normalize<NonNullable<Parent>>
          : ASTNode
    } & (Node extends { type: 'Literal' }
        ? { bigint?: string; regex?: { pattern: string; flags: string } }
        : unknown)
  : never
type NodeMap = {
  [Kind in keyof ParserNodeMap]: NormalizeNode<ParserNodeMap[Kind]>
}

export type ASTNode =
  | NormalizeNode<Exclude<ParserNode, { type: 'Program' | 'Property' }>>
  | Program
  | Property
  | AssignmentProperty
export type ESNode = Normalize<TSESTree.Node>
export type TSNode = Normalize<Extract<TSESTree.Node, { type: `TS${string}` }>>
export type JSXNode = Normalize<
  Extract<TSESTree.Node, { type: `JSX${string}` }>
>
export type VNode = Normalize<Extract<VueAST.Node, { type: `V${string}` }>>
export type ParamNode = never
export type HasLocation = VueAST.HasLocation
export type Range = VueAST.OffsetRange
export type Position = VueAST.Location
export type SourceLocation = VueAST.LocationRange
export type Token = VueAST.Token
export type Comment = Normalize<TSESTree.Comment>
export type HTMLComment = Token & { type: 'HTMLComment' }
export type HTMLBogusComment = Token & { type: 'HTMLBogusComment' }
export type ParseError = VueAST.ParseError
export type VRootElement = VElement & Normalize<VueAST.HasConcreteInfo>
export type VVariable = Normalize<VueAST.Variable>
export type VReference = Normalize<VueAST.Reference>
export type Program = Omit<NodeMap['Program'], 'tokens' | 'comments'> & {
  tokens: Token[]
  comments: Comment[]
  templateBody?: VRootElement
  errors: ParseError[]
}
export type VAttribute = Normalize<VueAST.VAttribute>
export type VDirective = Normalize<VueAST.VDirective>
export type VDirectiveKey = Normalize<VueAST.VDirectiveKey>
export type VDocumentFragment = Normalize<VueAST.VDocumentFragment>
export type VElement = Normalize<VueAST.VElement>
export type VEndTag = Normalize<VueAST.VEndTag>
export type VExpressionContainer = Normalize<VueAST.VExpressionContainer>
export type VIdentifier = Normalize<VueAST.VIdentifier>
export type VLiteral = Normalize<VueAST.VLiteral>
export type VStartTag = Normalize<VueAST.VStartTag>
export type VText = Normalize<VueAST.VText>
export type VForExpression = Normalize<VueAST.VForExpression>
export type VOnExpression = Normalize<VueAST.VOnExpression>
export type VSlotScopeExpression = Normalize<VueAST.VSlotScopeExpression>
export type VFilterSequenceExpression =
  Normalize<VueAST.VFilterSequenceExpression>
export type VFilter = Normalize<VueAST.VFilter>
export type Identifier = Normalize<TSESTree.Identifier>
export type PrivateIdentifier = Normalize<TSESTree.PrivateIdentifier>
export type Literal = Normalize<TSESTree.Literal>
export type SwitchCase = Normalize<TSESTree.SwitchCase>
export type CatchClause = Normalize<TSESTree.CatchClause>
export type VariableDeclarator = Normalize<TSESTree.VariableDeclarator>
export type Statement = Normalize<TSESTree.Statement>
export type ExpressionStatement = Normalize<TSESTree.ExpressionStatement>
export type BlockStatement = Normalize<TSESTree.BlockStatement>
export type EmptyStatement = Normalize<TSESTree.EmptyStatement>
export type DebuggerStatement = Normalize<TSESTree.DebuggerStatement>
export type WithStatement = Normalize<TSESTree.WithStatement>
export type ReturnStatement = Normalize<TSESTree.ReturnStatement>
export type LabeledStatement = Normalize<TSESTree.LabeledStatement>
export type BreakStatement = Normalize<TSESTree.BreakStatement>
export type ContinueStatement = Normalize<TSESTree.ContinueStatement>
export type IfStatement = Normalize<TSESTree.IfStatement>
export type SwitchStatement = Normalize<TSESTree.SwitchStatement>
export type ThrowStatement = Normalize<TSESTree.ThrowStatement>
export type TryStatement = Normalize<TSESTree.TryStatement>
export type WhileStatement = Normalize<TSESTree.WhileStatement>
export type DoWhileStatement = Normalize<TSESTree.DoWhileStatement>
export type ForStatement = Normalize<TSESTree.ForStatement>
export type ForInStatement = Normalize<TSESTree.ForInStatement>
export type ForOfStatement = Normalize<TSESTree.ForOfStatement>
export type Declaration = Normalize<VueAST.ESLintDeclaration>
export type FunctionDeclaration = Normalize<TSESTree.FunctionDeclaration>
export type VariableDeclaration = Normalize<TSESTree.VariableDeclaration>
export type ClassDeclaration = Normalize<TSESTree.ClassDeclaration>
export type Expression = Normalize<TSESTree.Expression>
export type ThisExpression = Normalize<TSESTree.ThisExpression>
export type ArrayExpression = Normalize<TSESTree.ArrayExpression>
export type ObjectExpression = Normalize<TSESTree.ObjectExpression>
export type FunctionExpression = Normalize<TSESTree.FunctionExpression>
export type ArrowFunctionExpression =
  Normalize<TSESTree.ArrowFunctionExpression>
export type YieldExpression = Normalize<TSESTree.YieldExpression>
export type UnaryExpression = Normalize<TSESTree.UnaryExpression>
export type UpdateExpression = Normalize<TSESTree.UpdateExpression>
export type BinaryExpression = Normalize<TSESTree.BinaryExpression>
export type AssignmentExpression = Normalize<TSESTree.AssignmentExpression>
export type LogicalExpression = Normalize<TSESTree.LogicalExpression>
export type MemberExpression = Normalize<TSESTree.MemberExpression>
export type ConditionalExpression = Normalize<TSESTree.ConditionalExpression>
export type CallExpression = Normalize<TSESTree.CallExpression>
export type NewExpression = Normalize<TSESTree.NewExpression>
export type SequenceExpression = Normalize<TSESTree.SequenceExpression>
export type TemplateLiteral = Normalize<TSESTree.TemplateLiteral>
export type TaggedTemplateExpression =
  Normalize<TSESTree.TaggedTemplateExpression>
export type ClassExpression = Normalize<TSESTree.ClassExpression>
export type MetaProperty = Normalize<TSESTree.MetaProperty>
export type AwaitExpression = Normalize<TSESTree.AwaitExpression>
export type ChainExpression = Normalize<TSESTree.ChainExpression>
export type ChainElement = Normalize<TSESTree.ChainElement>
type ObjectProperty<Node> = Node extends unknown
  ? Omit<NormalizeNode<Node>, 'value'> & { value: Expression }
  : never
export type Property = ObjectProperty<TSESTree.Property>
export type AssignmentProperty = Omit<Property, 'value' | 'kind' | 'method'> & {
  value: Pattern
  kind: 'init'
  method: false
}
export type Super = Normalize<TSESTree.Super>
export type TemplateElement = Normalize<TSESTree.TemplateElement>
export type SpreadElement = Normalize<TSESTree.SpreadElement>
export type Pattern = Normalize<
  | TSESTree.DestructuringPattern
  | TSESTree.MemberExpression
  | TSESTree.TSParameterProperty
>
export type ObjectPattern = Normalize<TSESTree.ObjectPattern>
export type ArrayPattern = Normalize<TSESTree.ArrayPattern>
export type RestElement = Normalize<TSESTree.RestElement>
export type AssignmentPattern = Normalize<TSESTree.AssignmentPattern>
export type ClassBody = Normalize<TSESTree.ClassBody>
export type MethodDefinition = Normalize<TSESTree.MethodDefinition>
export type PropertyDefinition = Normalize<TSESTree.PropertyDefinition>
export type StaticBlock = Normalize<TSESTree.StaticBlock>
export type ModuleDeclaration = Normalize<VueAST.ESLintModuleDeclaration>
export type ImportDeclaration = Normalize<TSESTree.ImportDeclaration>
export type ExportNamedDeclaration = Normalize<TSESTree.ExportNamedDeclaration>
export type ExportDefaultDeclaration =
  Normalize<TSESTree.ExportDefaultDeclaration>
export type ExportAllDeclaration = Normalize<TSESTree.ExportAllDeclaration>
export type ModuleSpecifier = Normalize<VueAST.ESLintModuleSpecifier>
export type ImportSpecifier = Normalize<TSESTree.ImportSpecifier>
export type ImportDefaultSpecifier = Normalize<TSESTree.ImportDefaultSpecifier>
export type ImportNamespaceSpecifier =
  Normalize<TSESTree.ImportNamespaceSpecifier>
export type ExportSpecifier = Normalize<TSESTree.ExportSpecifier>
export type ImportExpression = Normalize<TSESTree.ImportExpression>
export type TSAsExpression = Normalize<TSESTree.TSAsExpression>
export type TSTypeParameterInstantiation =
  Normalize<TSESTree.TSTypeParameterInstantiation>
export type TSPropertySignature = Normalize<TSESTree.TSPropertySignature>
export type TSMethodSignature = Normalize<TSESTree.TSMethodSignature>
export type TSLiteralType = Normalize<TSESTree.TSLiteralType>
export type TSCallSignatureDeclaration =
  Normalize<TSESTree.TSCallSignatureDeclaration>
export type TSFunctionType = Normalize<TSESTree.TSFunctionType>
export type TypeNode = Normalize<TSESTree.TypeNode>
export type JSXAttribute = Normalize<TSESTree.JSXAttribute>
export type JSXClosingElement = Normalize<TSESTree.JSXClosingElement>
export type JSXClosingFragment = Normalize<TSESTree.JSXClosingFragment>
export type JSXElement = Normalize<TSESTree.JSXElement>
export type JSXEmptyExpression = Normalize<TSESTree.JSXEmptyExpression>
export type JSXExpressionContainer = Normalize<TSESTree.JSXExpressionContainer>
export type JSXFragment = Normalize<TSESTree.JSXFragment>
export type JSXIdentifier = Normalize<TSESTree.JSXIdentifier>
export type JSXOpeningElement = Normalize<TSESTree.JSXOpeningElement>
export type JSXOpeningFragment = Normalize<TSESTree.JSXOpeningFragment>
export type JSXSpreadAttribute = Normalize<TSESTree.JSXSpreadAttribute>
export type JSXSpreadChild = Normalize<TSESTree.JSXSpreadChild>
export type JSXMemberExpression = Normalize<TSESTree.JSXMemberExpression>
export type JSXText = Normalize<TSESTree.JSXText>
