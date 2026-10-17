/**
 * @author lozinsky <https://github.com/lozinsky>
 * See LICENSE file in root directory for full license.
 */

import { wrapCoreRule } from '../utils/index.ts'

export default wrapCoreRule('no-implicit-coercion', {
  applyDocument: true
})
