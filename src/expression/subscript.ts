import { Expression, Reference } from '.'
import { CannotAccessElement } from '../error'
import { Environment } from '../runtime/environment'
import { AnyType } from '../runtime/types'

export class Subscript {
  constructor(
    public readonly referredObj: Reference,
    public readonly index: Expression
  ) {}

  assign(rhs: AnyType, env: Environment) {
    const indexValue = env.evaluate(this.index)
    if (!(typeof indexValue === 'number' || typeof indexValue === 'string')) {
      throw new CannotAccessElement()
    }
    const rhsValue = env.evaluate(rhs)
    const ref = env.evaluate(this.referredObj) as any

    ref[indexValue] = rhsValue
  }

  evaluate(env: Environment) {
    const indexValue = env.evaluate(this.index)
    if (!(typeof indexValue === 'number' || typeof indexValue === 'string')) {
      throw new CannotAccessElement()
    }
    const ref = env.evaluate(this.referredObj) as any
    return ref[indexValue]
  }
}
