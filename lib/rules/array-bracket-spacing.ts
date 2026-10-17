/**
 * @author Toru Nagashima
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

export default wrapStylisticOrCoreRule('array-bracket-spacing', {
  skipDynamicArguments: true
})
