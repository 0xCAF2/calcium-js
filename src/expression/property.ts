import { NameNotFound, PropertyNotExist } from '../error'
import { Environment } from '../runtime/environment'
import { AnyType } from '../runtime/types'

export default class Property {
  constructor(
    public readonly variableName: string,
    public readonly properties: string[]
  ) {}

  assign(value: AnyType, env: Environment) {
    let target = env.context.lookUp(this.variableName)?.ref as any
    if (target === undefined) {
      throw new NameNotFound(this.variableName)
    }
    for (const propName of this.properties.slice(0, -1)) {
      target = target[propName]
    }
    target[this.properties.at(-1) as string] = value
  }

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
