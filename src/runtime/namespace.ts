import { Any } from './types'

/**
 * saves variables, functions, and so on in a specific scope
 */
export default class Namespace {
  /**
   * saves by key value pairs
   */
  private dict = new Map<string, Any>()

  /**
   *
   * @param parent nesting scope
   */
  constructor(public readonly parent?: Namespace) {}

  /**
   * searches an attribute in a class scope
   * @param key attribute's name
   * @returns
   */
  get(key: string): Any | undefined {
    return this.dict.get(key)
  }

  /**
   * searches identifier and return its value
   * @param key identifier
   */
  lookUp(key: string): Any | undefined {
    const value = this.dict.get(key)
    if (value !== undefined) {
      return value
    } else {
      return this.parent?.lookUp(key)
    }
  }

  /**
   *
   * @param key identifier
   * @param value right hand side of assignment
   */
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