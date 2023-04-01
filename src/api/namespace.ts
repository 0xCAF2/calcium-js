import { Any } from './type'

export class Namespace {
  private dict = new Map<string, Any>()

  constructor(public readonly parent?: Namespace) {}

  lookUp(key: string): Any {
    let value = this.dict.get(key)
    if (value !== undefined) {
      return value
    } else {
      value = this.parent?.lookUp(key)
      if (value === undefined) {
        if (key === 'document') {
          // NOT allow to access DOM
          return undefined
        } else {
          return (window || global)[key as any]
        }
      } else {
        return value
      }
    }
  }

  register(key: string, value: Any) {
    this.dict.set(key, value)
  }

  /**
   * the parent scope of a function or a method.
   * When this namespace is not a class scope, then returns this.
   */
  get nestingScope(): Namespace | undefined {
    return this.parent
  }
}
