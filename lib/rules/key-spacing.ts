/**
 * @author Toru Nagashima
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

// eslint-disable-next-line internal/no-invalid-meta
export default wrapStylisticOrCoreRule('key-spacing', {
  skipDynamicArguments: true
})
