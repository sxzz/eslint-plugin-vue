/**
 * @author Yosuke Ota
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

export default wrapStylisticOrCoreRule(
  {
    core: 'func-call-spacing',
    stylistic: 'function-call-spacing',
    vue: 'func-call-spacing'
  },
  {
    skipDynamicArguments: true,
    applyDocument: true
  }
)
