/**
 * @author Toru Nagashima
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

export default wrapStylisticOrCoreRule('space-unary-ops', {
  skipDynamicArguments: true,
  applyDocument: true
})
