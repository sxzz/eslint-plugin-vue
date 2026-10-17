/*
 This script updates `lib/utils/vue3-export-names.json` file from vue type.
 */

import fs from 'node:fs'
import path from 'node:path'
import tsParser from '@typescript-eslint/parser'
import { httpGet } from './lib/http.ts'

await main()

async function main() {
  const names = new Set<string>()

  for await (const name of extractExportNames('vue@^3')) {
    names.add(name)
  }
  // Update file.
  const filePath = path.resolve(
    import.meta.dirname,
    '../lib/utils/vue3-export-names.json'
  )

  fs.writeFileSync(filePath, `${JSON.stringify([...names], null, 2)}\n`)
}

async function* extractExportNames(m: string): AsyncGenerator<string> {
  const rootNode = tsParser.parse(await resolveTypeContents(m), {
    loc: true,
    range: true
  })
  for (const node of rootNode.body) {
    yield* extractNamesFromNode(node)
  }
}

async function* extractNamesFromNode(
  node: import('@typescript-eslint/types').TSESTree.Program['body'][number]
): AsyncGenerator<string> {
  switch (node.type) {
    case 'ExportAllDeclaration': {
      if (node.exported) {
        yield node.exported.name
      } else {
        for await (const name of extractExportNames(node.source.value)) {
          yield name
        }
      }
      break
    }
    case 'ExportNamedDeclaration': {
      if (node.declaration) {
        switch (node.declaration.type) {
          case 'ClassDeclaration':
          case 'FunctionDeclaration':
          case 'TSDeclareFunction':
          case 'TSEnumDeclaration':
          case 'TSInterfaceDeclaration':
          case 'TSTypeAliasDeclaration': {
            if (node.declaration.id) yield node.declaration.id.name
            break
          }
          case 'VariableDeclaration': {
            for (const decl of node.declaration.declarations) {
              yield* extractNamesFromPattern(decl.id)
            }
            break
          }
          case 'TSModuleDeclaration': {
            //?
            break
          }
        }
      }
      for (const spec of node.specifiers) {
        yield spec.exported.type === 'Identifier'
          ? spec.exported.name
          : spec.exported.value
      }
      break
    }
    case 'ExportDefaultDeclaration': {
      yield 'default'
      break
    }
  }
}

export type ArrayPattern =
  import('@typescript-eslint/types').TSESTree.ArrayPattern
export type ObjectPattern =
  import('@typescript-eslint/types').TSESTree.ObjectPattern
export type Identifier = import('@typescript-eslint/types').TSESTree.Identifier
export type AssignmentPattern =
  import('@typescript-eslint/types').TSESTree.AssignmentPattern
export type MemberExpression =
  import('@typescript-eslint/types').TSESTree.MemberExpression
export type RestElement =
  import('@typescript-eslint/types').TSESTree.RestElement

function* extractNamesFromPattern(
  node:
    | import('@typescript-eslint/types').TSESTree.VariableDeclarator['id']
    | AssignmentPattern
    | RestElement
    | MemberExpression
    | null
): Generator<string> {
  if (!node) return
  switch (node.type) {
    case 'Identifier': {
      yield node.name
      break
    }
    case 'ArrayPattern': {
      for (const element of node.elements) {
        yield* extractNamesFromPattern(element)
      }
      break
    }
    case 'ObjectPattern': {
      for (const prop of node.properties) {
        if (prop.type === 'Property') {
          if (prop.key.type === 'Identifier') {
            yield prop.key.name
          } else if (prop.key.type === 'Literal') {
            yield String(prop.key.value)
          }
        } else if (prop.type === 'RestElement') {
          yield* extractNamesFromPattern(prop)
        }
      }
      break
    }
    case 'AssignmentPattern': {
      yield* extractNamesFromPattern(node.left)
      break
    }
    case 'RestElement': {
      yield* extractNamesFromPattern(node.argument)
      break
    }
    case 'MemberExpression': {
      // ?
      break
    }
  }
}
async function resolveTypeContents(m: string) {
  const packageJsonText = await httpGet(`https://unpkg.com/${m}/package.json`)
  const packageJson = JSON.parse(packageJsonText)

  let typesPath =
    (packageJson.exports &&
      packageJson.exports['.'] &&
      packageJson.exports['.'].types) ||
    packageJson.types
  if (typesPath.startsWith('./')) {
    typesPath = typesPath.slice(2)
  }
  return await httpGet(`https://unpkg.com/${m}/${typesPath}`)
}
