import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['lib/index.ts'],
  copy: ['lib/eslint-typegen.d.ts'],
  dts: true,
  exports: true,
  deps: {
    onlyBundle: []
  }
})
