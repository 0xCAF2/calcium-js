import { Reference } from '.'
import { NameNotFound, PropertyNotExist } from '../error'
import { Environment } from '../runtime/environment'
import { AnyType } from '../runtime/types'

export class Property {
  constructor(
    public readonly referredObj: Reference,
    public readonly propertyName: string
  ) {}

  assign(value: AnyType, env: Environment) {
    let target = env.evaluate(this.referredObj) as any
    target[this.propertyName] = value
  }

  evaluate(env: Environment): AnyType {
    const ref = env.evaluate(this.referredObj) as any
    if (ref === null || ref === undefined || typeof ref === 'boolean') {
      throw new PropertyNotExist(this.propertyName)
    }
    const value = ref[this.propertyName]
    if (typeof value === 'function') {
      env.thisObj = ref
    }
    return value
  }
}
