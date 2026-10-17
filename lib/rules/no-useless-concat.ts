/**
 * @author Yosuke Ota
 */

import { wrapCoreRule } from '../utils/index.ts'

export default wrapCoreRule('no-useless-concat', {
  applyDocument: true
})
