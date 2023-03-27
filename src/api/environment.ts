import { Address } from './address'
import { Behavior } from './behavior'
import { Expression } from './expression'
import { Namespace } from './namespace'
import { Statement } from './statement'
import { Any } from './type'

export class Environment {
  address: Address
  readonly code: Statement[]
  readonly context = new Namespace()
  previousBehavior = Behavior.Forward

  constructor(params: EnvironmentParams) {
    this.address = new Address(1, 0)
    this.code = params.code
  }

  evaluate(value: Expression): Any {
    if (value !== null && typeof value === 'object' && 'evaluate' in value) {
      return value.evaluate(this)
    }
    if (Array.isArray(value)) {
      return value.map((elem) => this.evaluate(elem))
    }
    return value
  }
}

export interface EnvironmentParams {
  code: Statement[]
}
