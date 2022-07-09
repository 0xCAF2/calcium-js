import Address from './address'
import Namespace from './namespace'

export type OutputFunction = (desc: string) => void

export class Environment {
  address = new Address(1, 0)
  context = new Namespace()
}
