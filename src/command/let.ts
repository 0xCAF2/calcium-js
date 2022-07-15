import { Command } from '.'
import { Environment } from '../runtime/environment'
import { AnyType } from '../runtime/types'
import Variable from '../runtime/variable'

export default class Let implements Command {
  constructor(public readonly name: string, public readonly value?: AnyType) {}
  execute(env: Environment) {
    env.context.register(
      this.name,
      new Variable(this.name, this.value ?? undefined)
    )
  }
}
