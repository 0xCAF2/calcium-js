import { Assignment } from "./assignment"
import { Constant } from "./constant"

/**
 * saves variables, functions, and so on in a specific scope
 */
export class Namespace {
  /**
   * saves by key value pairs
   */
  private dict = new Map<string, Assignment>()

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
  get(key: string): Assignment | undefined {
    return this.dict.get(key)
  }

  /**
   * searches identifier and return its value
   * @param key identifier
   */
  lookUp(key: string): Assignment | undefined {
    let value = this.dict.get(key)
    if (value !== undefined) {
      return value
    } else {
      value = this.parent?.lookUp(key)
      if (value === undefined) {
        if (key === "document" || key === "eval") {
          return undefined
        } else {
          try {
            // @ts-ignore
            return new Constant(key, window[key as any])
          } catch {
            // @ts-ignore
            return new Constant(key, global[key as any])
          }
        }
      } else {
        return value
      }
    }
  }

  /**
   *
   * @param key identifier
   * @param value right hand side of assignment
   */
  register(key: string, value: Assignment) {
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
