import { Command } from '.'
import { Expression } from '../expression'
import Constant from '../runtime/constant'
import { Environment } from '../runtime/environment'

export default class Const implements Command {
  constructor(
    public readonly name: string,
    public readonly value: Expression
  ) {}
  execute(env: Environment) {
    env.context.register(
      this.name,
      new Constant(this.name, env.evaluate(this.value))
    )
  }
}
