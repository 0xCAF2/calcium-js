import { AnyType } from '../runtime/types'
import BinaryOperator from './binaryOperator'
import Call from './call'
import New from './new'
import Property from './property'
import Subscript from './subscript'
import UnaryOperator from './unaryOperator'
import Variable from './variable'

export type Reference = Property | Variable | Subscript
export type Expression =
  | AnyType
  | BinaryOperator
  | Call
  | New
  | Reference
  | UnaryOperator

export { BinaryOperator }
export { Call }
export { New }
export { Property }
export { Subscript }
export { UnaryOperator }
export { Variable }
