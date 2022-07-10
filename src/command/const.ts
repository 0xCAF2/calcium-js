import { Command } from '.'
import Constant from '../runtime/constant'
import { Environment } from '../runtime/environment'
import { AnyType } from '../runtime/types'

export class Const implements Command {
  constructor(public readonly name: string, public readonly value: AnyType) {}
  execute(env: Environment) {
    env.context.register(this.name, new Constant(this.name, this.value))
  }
}
