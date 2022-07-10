import { AnyType } from '../runtime/types'
import Call from './call'
import Property from './property'
import Variable from './variable'

export type Reference = Property | Variable
export type Expression = Reference | AnyType | Call

export { Call }
export { Property }
export { Variable }
