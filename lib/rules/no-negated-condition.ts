/**
 * @author Wayne Zhang
 * See LICENSE file in root directory for full license.
 */

import { wrapCoreRule } from '../utils/index.ts'

export default wrapCoreRule('no-negated-condition', {
  applyDocument: true
})
