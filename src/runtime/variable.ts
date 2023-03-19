import { NameNotFound } from '../error'
import { Environment } from './environment'
import { AnyType } from './types'

/**
 * a reference to the value
 */
export class Variable {
  constructor(public readonly name: string, public ref: AnyType) {}

  /**
   * eg. `x = 7`
   * @param rhs a right hand side value
   * @param env
   */
  assign(rhs: AnyType, env: Environment) {
    this.ref = rhs
    env.context.register(this.name, this)
  }

  evaluate(env: Environment): AnyType {
    const variable = env.context.lookUp(this.name)
    if (variable === undefined) {
      throw new NameNotFound(this.name)
    } else {
      return variable.ref
    }
  }

  toString(): string {
    return this.name
  }
}
