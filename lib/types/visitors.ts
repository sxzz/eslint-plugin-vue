import type { VExpressionContainer, VLiteral } from './index.ts'
import type * as ES from './ast.ts'
import type * as V from './ast.ts'
import type { ASTNode, ESNode, Statement, Expression } from './ast.ts'

type VDirectiveWithExpressionValue = V.VDirective & {
  value: (V.VExpressionContainer & { expression: ES.Expression | null }) | null
}

export type VNodeListenerMap = {
  VAttribute: V.VAttribute | V.VDirective
  'VAttribute:exit': V.VAttribute | V.VDirective
  'VAttribute[directive=false]': V.VAttribute
  'VAttribute[directive=false]:exit': V.VAttribute
  "VAttribute[directive=true][key.name.name='bind']": V.VDirective & {
    value:
      | (V.VExpressionContainer & {
          expression: ES.Expression | V.VFilterSequenceExpression | null
        })
      | null
  }
  "VAttribute[directive=true][key.name.name='bind']:exit": V.VDirective & {
    value:
      | (V.VExpressionContainer & {
          expression: ES.Expression | V.VFilterSequenceExpression | null
        })
      | null
  }
  "VAttribute[directive=true][key.name.name='cloak']": V.VDirective
  "VAttribute[directive=true][key.name.name='cloak']:exit": V.VDirective
  "VAttribute[directive=true][key.name.name='else-if']": VDirectiveWithExpressionValue
  "VAttribute[directive=true][key.name.name='else-if']:exit": VDirectiveWithExpressionValue
  "VAttribute[directive=true][key.name.name='else']": V.VDirective
  "VAttribute[directive=true][key.name.name='else']:exit": V.VDirective
  "VAttribute[directive=true][key.name.name='for']": V.VDirective & {
    value:
      (V.VExpressionContainer & { expression: V.VForExpression | null }) | null
  }
  "VAttribute[directive=true][key.name.name='for']:exit": V.VDirective & {
    value:
      (V.VExpressionContainer & { expression: V.VForExpression | null }) | null
  }
  "VAttribute[directive=true][key.name.name='html']": V.VDirective
  "VAttribute[directive=true][key.name.name='html']:exit": V.VDirective
  "VAttribute[directive=true][key.name.name='if']": VDirectiveWithExpressionValue
  "VAttribute[directive=true][key.name.name='if']:exit": VDirectiveWithExpressionValue
  "VAttribute[directive=true][key.name.name='is']": V.VDirective
  "VAttribute[directive=true][key.name.name='is']:exit": V.VDirective
  "VAttribute[directive=true][key.name.name='model']": VDirectiveWithExpressionValue
  "VAttribute[directive=true][key.name.name='model']:exit": VDirectiveWithExpressionValue
  "VAttribute[directive=true][key.name.name='memo']": VDirectiveWithExpressionValue
  "VAttribute[directive=true][key.name.name='memo']:exit": VDirectiveWithExpressionValue
  "VAttribute[directive=true][key.name.name='on']": V.VDirective & {
    value:
      | (V.VExpressionContainer & {
          expression: ES.Expression | V.VOnExpression | null
        })
      | null
  }
  "VAttribute[directive=true][key.name.name='on']:exit": V.VDirective & {
    value:
      | (V.VExpressionContainer & {
          expression: ES.Expression | V.VOnExpression | null
        })
      | null
  }
  "VAttribute[directive=true][key.name.name='once']": V.VDirective
  "VAttribute[directive=true][key.name.name='once']:exit": V.VDirective
  "VAttribute[directive=true][key.name.name='pre']": V.VDirective
  "VAttribute[directive=true][key.name.name='pre']:exit": V.VDirective
  "VAttribute[directive=true][key.name.name='show']": VDirectiveWithExpressionValue
  "VAttribute[directive=true][key.name.name='show']:exit": VDirectiveWithExpressionValue
  "VAttribute[directive=true][key.name.name='slot']": V.VDirective & {
    value:
      | (V.VExpressionContainer & { expression: V.VSlotScopeExpression | null })
      | null
  }
  "VAttribute[directive=true][key.name.name='slot']:exit": V.VDirective & {
    value:
      | (V.VExpressionContainer & { expression: V.VSlotScopeExpression | null })
      | null
  }
  "VAttribute[directive=true][key.name.name='text']": V.VDirective
  "VAttribute[directive=true][key.name.name='text']:exit": V.VDirective
  'VAttribute[value!=null]':
    | (V.VAttribute & { value: VLiteral })
    | (V.VDirective & { value: VExpressionContainer })
  VDirectiveKey: V.VDirectiveKey
  'VDirectiveKey:exit': V.VDirectiveKey
  VElement: V.VElement
  'VElement:exit': V.VElement
  VEndTag: V.VEndTag
  'VEndTag:exit': V.VEndTag
  VExpressionContainer: V.VExpressionContainer
  'VExpressionContainer:exit': V.VExpressionContainer
  VIdentifier: V.VIdentifier
  'VIdentifier:exit': V.VIdentifier
  VLiteral: V.VLiteral
  'VLiteral:exit': V.VLiteral
  VStartTag: V.VStartTag
  'VStartTag:exit': V.VStartTag
  VText: V.VText
  'VText:exit': V.VText
  VForExpression: V.VForExpression
  'VForExpression:exit': V.VForExpression
  VOnExpression: V.VOnExpression
  'VOnExpression:exit': V.VOnExpression
  VSlotScopeExpression: V.VSlotScopeExpression
  'VSlotScopeExpression:exit': V.VSlotScopeExpression
  VFilterSequenceExpression: V.VFilterSequenceExpression
  'VFilterSequenceExpression:exit': V.VFilterSequenceExpression
  VFilter: V.VFilter
  'VFilter:exit': V.VFilter
  VDocumentFragment: V.VDocumentFragment
  'VDocumentFragment:exit': V.VDocumentFragment
} & ESNodeListenerMap
export type ESNodeListenerMap = {
  [Node in ESNode as Node['type'] | `${Node['type']}:exit`]: Node
}
export type NodeListenerMap = {
  [Node in ASTNode as Node['type'] | `${Node['type']}:exit`]: Node
} & {
  ':statement': Statement
  ':statement:exit': Statement
  ':expression': Expression
  ':expression:exit': Expression
} & VNodeListenerMap
