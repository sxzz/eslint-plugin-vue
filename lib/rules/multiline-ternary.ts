/**
 * @author dev1437
 * See LICENSE file in root directory for full license.
 */

import { wrapStylisticOrCoreRule } from '../utils/index.ts'

// eslint-disable-next-line internal/no-invalid-meta
export default wrapStylisticOrCoreRule('multiline-ternary', {
  skipDynamicArguments: true,
  applyDocument: true
})
