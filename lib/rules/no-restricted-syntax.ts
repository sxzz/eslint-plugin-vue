/**
 * @author Yosuke Ota
 */

import { wrapCoreRule } from '../utils/index.ts'

export default wrapCoreRule('no-restricted-syntax', {
  applyDocument: true
})
