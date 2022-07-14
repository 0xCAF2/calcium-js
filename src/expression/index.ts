import { AnyType } from '../runtime/types'
import BinaryOperator from './binaryOperator'
import Call from './call'
import Property from './property'
import Variable from './variable'

export type Reference = Property | Variable
export type Expression = AnyType | BinaryOperator | Call | Reference

export { BinaryOperator }
export { Call }
export { Property }
export { Variable }
