/**
 * @author Yosuke Ota
 */

import { wrapCoreRule } from '../utils/index.ts'

export default wrapCoreRule('prefer-template', {
  applyDocument: true
})
