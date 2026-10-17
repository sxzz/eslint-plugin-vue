import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['lib/index.ts', 'lib/configs/**/*.ts'],
  format: ['esm'],
  copy: ['lib/index.d.ts', 'lib/eslint-typegen.d.ts', 'lib/removed-rules.js'],
  dts: false,
  deps: {
    neverBundle: ['typescript']
  },
  unbundle: true,
  fixedExtension: false
})
