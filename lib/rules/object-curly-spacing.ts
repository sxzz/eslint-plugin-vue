/**
 * @author Toru Nagashima
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

export default wrapStylisticOrCoreRule('object-curly-spacing', {
  skipDynamicArguments: true
})
