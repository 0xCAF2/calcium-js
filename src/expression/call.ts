import { AnyType } from '../runtime/types'
import { NotCallable } from '../error'
import { Reference } from './'
import { Environment } from '../runtime/environment'
import * as Sym from '../runtime/symbols'

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
    const evaluatedArgs = this.args.map((a) => env.evaluate(a))
    if (typeof func === 'function') {
      const f = Reflect.get(func, Sym.callByUser)
      if (f) {
        return f(...evaluatedArgs)
      } else {
        return func(...evaluatedArgs)
      }
    } else {
      throw new NotCallable()
    }
  }
}
