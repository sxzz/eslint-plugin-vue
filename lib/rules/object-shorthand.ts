/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */

import { wrapCoreRule } from '../utils/index.ts'

export default wrapCoreRule('object-shorthand', {
  skipDynamicArguments: true
})
