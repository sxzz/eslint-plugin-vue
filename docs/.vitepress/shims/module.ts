import * as eslintScope from 'eslint-scope'
import typescript from 'typescript'

const modules = new Map<string, unknown>([
  ['eslint-scope', eslintScope],
  ['typescript', typescript]
])

export function createRequire() {
  const nodeRequire = (id: string) => {
    const module = modules.get(id)
    if (module) {
      return module
    }

    throw Object.assign(new Error(`Cannot find module '${id}'`), {
      code: 'MODULE_NOT_FOUND'
    })
  }

  nodeRequire.resolve = (id: string) => id
  return nodeRequire
}
