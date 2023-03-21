import { Address } from './address'
import { Statement } from './statement'

export class Environment {
  address: Address

  constructor(public readonly code: Statement[]) {
    this.address = new Address(1, 0)
  }
}
