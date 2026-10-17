/**
 * @author alshyra
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

export default wrapStylisticOrCoreRule('array-element-newline', {
  skipDynamicArguments: true
})
