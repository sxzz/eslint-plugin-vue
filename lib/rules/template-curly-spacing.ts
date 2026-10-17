/**
 * @author Yosuke Ota
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

// eslint-disable-next-line internal/no-invalid-meta
export default wrapStylisticOrCoreRule('template-curly-spacing', {
  skipDynamicArguments: true,
  applyDocument: true
})
