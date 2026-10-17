/**
 * @author Yosuke Ota
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

export default wrapStylisticOrCoreRule('brace-style', {
  skipDynamicArguments: true
})
