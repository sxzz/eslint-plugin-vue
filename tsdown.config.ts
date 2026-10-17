import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['lib/index.ts'],
  copy: [
    {
      from: 'lib/index.d.ts',
      rename: 'index.d.mts'
    },
    'lib/eslint-typegen.d.ts',
    'lib/removed-rules.js'
  ],
  dts: false,
  exports: true,
  deps: {
    onlyBundle: []
  }
})
