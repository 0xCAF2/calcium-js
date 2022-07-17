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
    if (!this.isCalled) {
      this.isCalled = true
      if (typeof func === 'function') {
        const f = Reflect.get(func, Sym.calledByUser)
        if (f) {
          this.returnedValue = f()(...evaluatedArgs)
        } else {
          this.returnedValue = func(...evaluatedArgs)
        }
        this.isReturned = true // built-in libraries reach here
        return this.returnedValue
      } else {
        throw new NotCallable()
      }
    } else {
      if (!this.isReturned) {
        this.isReturned = true
        this.returnedValue = env.returnedValue
        env.returnedValue = undefined
      }
      return this.returnedValue
    }
  }
}
