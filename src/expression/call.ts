import { AnyType } from '../runtime/types'
import { NotCallable } from '../error'
import { Reference } from './'
import { Environment } from '../runtime/environment'
import * as Sym from '../runtime/symbols'

export class Call {
  private returnedValue: AnyType
  private isCalled = false
  private isReturned = false

  constructor(
    public readonly funcRef: Reference,
    public readonly args: AnyType[]
  ) {}

  evaluate(env: Environment): AnyType {
    const evaluatedArgs = this.args.map((a) => env.evaluate(a))
    const func = env.evaluate(this.funcRef)
    if (!this.isCalled) {
      this.isCalled = true
      if (typeof func === 'function') {
        const thisObj = env.thisObj
        env.thisObj = undefined
        const f = Reflect.get(func, Sym.calledByUser)
        if (f) {
          this.returnedValue = f().apply(thisObj, evaluatedArgs)
        } else {
          this.returnedValue = func.apply(thisObj, evaluatedArgs)
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
