/**
 * @author Yosuke Ota
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

export default wrapStylisticOrCoreRule('template-curly-spacing', {
  skipDynamicArguments: true,
  applyDocument: true
})
