/**
 * @author Yosuke Ota
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

export default wrapStylisticOrCoreRule('comma-spacing', {
  skipDynamicArguments: true,
  skipDynamicArgumentsReport: true,
  applyDocument: true
})
