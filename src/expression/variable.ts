import { Environment } from "../runtime/environment"
import type { AnyType } from "../runtime/types"

export class Variable {
  constructor(public readonly name: string) {}

  assign(value: AnyType, env: Environment) {
    env.context.register(this.name, value)
  }

  evaluate(env: Environment): AnyType {
    return env.context.lookUp(this.name)
  }
}
