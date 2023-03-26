import { Address } from './address'
import { Expression } from './expression'
import { Namespace } from './namespace'
import { Statement } from './statement'
import { Any } from './type'

export class Environment {
  address: Address
  readonly code: Statement[]
  readonly context = new Namespace()

  constructor(params: EnvironmentParams) {
    this.address = new Address(1, 0)
    this.code = params.code
  }

  evaluate(value: Expression): Any {
    if (value !== null && typeof value === 'object' && 'evaluate' in value) {
      return value.evaluate(this)
    }
    return value
  }
}

export interface EnvironmentParams {
  code: Statement[]
}
