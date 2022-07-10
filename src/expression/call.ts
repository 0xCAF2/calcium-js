import { AnyType } from '../runtime/types'
import { NotCallable } from '../error'
import { Reference } from './'
import { Environment } from '../runtime/environment'

export default class Call {
  private returnedValue: AnyType
  private isCalled = false
  private isReturned = false

  constructor(
    public readonly funcRef: Reference,
    public readonly args: AnyType[]
  ) {}

  evaluate(env: Environment): AnyType {
    const func = env.evaluate(this.funcRef)
    if (typeof func === 'function') {
      return func(...this.args)
    } else {
      throw new NotCallable()
    }
  }
}
