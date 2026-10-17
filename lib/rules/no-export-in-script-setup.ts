/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */

import { defineScriptSetupVisitor } from '../utils/index.ts'

export type TSESTreeExportAllDeclaration =
  import('@typescript-eslint/types').TSESTree.ExportAllDeclaration
export type TSESTreeExportDefaultDeclaration =
  import('@typescript-eslint/types').TSESTree.ExportDefaultDeclaration
export type TSESTreeExportNamedDeclaration =
  import('@typescript-eslint/types').TSESTree.ExportNamedDeclaration

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow `export` in `<script setup>`',
      categories: ['vue3-essential'],
      url: 'https://eslint.vuejs.org/rules/no-export-in-script-setup.html'
    },
    fixable: null,
    schema: [],
    messages: {
      forbidden: '`<script setup>` cannot contain ES module exports.'
    }
  },

  create(context: RuleContext) {
    function verify(
      node:
        | ExportAllDeclaration
        | ExportDefaultDeclaration
        | ExportNamedDeclaration,
      loc: SourceLocation
    ) {
      const tsNode = node
      if ('exportKind' in tsNode && tsNode.exportKind === 'type') {
        return
      }
      if (
        tsNode.type === 'ExportNamedDeclaration' &&
        tsNode.specifiers.length > 0 &&
        tsNode.specifiers.every((spec: any) => spec.exportKind === 'type')
      ) {
        return
      }
      context.report({
        node,
        loc,
        messageId: 'forbidden'
      })
    }

    return defineScriptSetupVisitor(context, {
      ExportAllDeclaration: (node: any) => verify(node, node.loc),
      ExportDefaultDeclaration: (node: any) => verify(node, node.loc),
      ExportNamedDeclaration: (node: any) => {
        // export let foo = 'foo', export class Foo {}, export function foo() {}
        if (node.declaration) {
          verify(node, context.sourceCode.getFirstToken(node).loc)
        }
        // export { foo }, export { foo } from 'bar'
        else {
          verify(node, node.loc)
        }
      }
    })
  }
}
