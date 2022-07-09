import { NameNotFound } from '../error'
import { Environment } from '../runtime/environment'
import { Any } from '../runtime/types'
import Sym from '../runtime/Symbols'

/**
 * a reference to the value
 */
export default class Variable {
  constructor(public readonly name: string) {}

  /**
   * eg. `x = 7`
   * @param rhs a right hand side value
   * @param env
   */
  assign(rhs: Any, env: Environment) {
    env.context.register(this.name, rhs)
  }

  [Sym.evaluate](env: Environment): Any {
    const value = env.context.lookUp(this.name)
    if (value === undefined) {
      throw new NameNotFound(this.name)
    } else {
      return value
    }
  }

  toString(): string {
    return this.name
  }
}
