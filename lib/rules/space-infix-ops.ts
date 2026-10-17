/**
 * @author Toru Nagashima
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

export default wrapStylisticOrCoreRule('space-infix-ops', {
  skipDynamicArguments: true,
  applyDocument: true
})
