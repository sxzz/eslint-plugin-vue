/**
 * @author Toru Nagashima
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

export default wrapStylisticOrCoreRule('key-spacing', {
  skipDynamicArguments: true
})
