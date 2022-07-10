import { PropertyNotExist } from '../error'
import { Environment } from '../runtime/environment'
import { AnyType } from '../runtime/types'

export default class Property {
  constructor(
    public readonly variableName: string,
    public readonly properties: string[]
  ) {}

  evaluate(env: Environment): AnyType {
    let value: any = env.context.lookUp(this.variableName)?.ref
    for (const propName of this.properties) {
      if (value === null || value === undefined || typeof value === 'boolean') {
        throw new PropertyNotExist(propName)
      }
      value = value[propName]
    }
    return value
  }
}
