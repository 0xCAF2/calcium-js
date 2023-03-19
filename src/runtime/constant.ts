import { CannotAssignToConst } from '../error'
import { Environment } from '../runtime/environment'
import { AnyType } from '../runtime/types'
import { Variable } from './variable'

/**
 * a reference to the value
 */
export class Constant extends Variable {
  constructor(public readonly name: string, public readonly ref: AnyType) {
    super(name, ref)
  }

  /**
   * eg. `x = 7`
   * @param rhs a right hand side value
   * @param env
   */
  assign(rhs: AnyType, env: Environment) {
    throw new CannotAssignToConst(this.name)
  }

  toString(): string {
    return this.name
  }
}
