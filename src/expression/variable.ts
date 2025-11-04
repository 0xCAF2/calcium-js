import { CannotAssignToConst, NameNotFound } from '../error'
import { Constant } from '../runtime/constant'
import { Environment } from '../runtime/environment'
import type { AnyType } from '../runtime/types'

export class Variable {
  constructor(public readonly name: string) { }

  assign(value: AnyType, env: Environment) {
    const variable = env.context.lookUp(this.name)
    if (variable instanceof Constant) {
      throw new CannotAssignToConst(this.name)
    } else if (variable === undefined) {
      throw new NameNotFound(this.name)
    }
    variable.assign(value, env)
  }

  evaluate(env: Environment): AnyType {
    return env.context.lookUp(this.name)?.ref
  }
}
