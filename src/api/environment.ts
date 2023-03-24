import { Address } from './address'
import { Expression, Reference } from './expression'
import { Statement } from './statement'
import { Any } from './type'

export class Environment {
  address: Address
  code: Statement[]

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
