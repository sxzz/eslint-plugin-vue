/**
 * @author Yosuke Ota
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

export default wrapStylisticOrCoreRule('space-in-parens', {
  skipDynamicArguments: true,
  skipDynamicArgumentsReport: true,
  applyDocument: true
})
