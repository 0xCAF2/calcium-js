import * as Element from './element'
import * as Kw from './keyword'

/**
 * a JSON array that represents one line
 */
type Statement = [number, unknown[], Kw.Command, ...Element.Any[]]

export default Statement
