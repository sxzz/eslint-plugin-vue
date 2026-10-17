/**
 * @author Yosuke Ota
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

export default wrapStylisticOrCoreRule('block-spacing', {
  skipDynamicArguments: true
})
