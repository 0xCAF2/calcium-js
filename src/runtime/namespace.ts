import { NameNotFound } from "../error"
import type { RuntimeOptions } from "./runtime"
import type { AnyType } from "./types"

/**
 * saves variables, functions, and so on in a specific scope
 */
export class Namespace {
  /**
   * saves by key value pairs
   */
  private dict = new Map<string, AnyType>()

  /**
   *
   * @param parent nesting scope
   */
  constructor(
    public readonly parent?: Namespace,
    public readonly options: RuntimeOptions = {
      canAccessWindow: false,
      enableGlobal: false,
    }
  ) {}

  /**
   * searches an attribute in a class scope
   * @param key attribute's name
   * @returns
   */
  get(key: string): AnyType {
    return this.dict.get(key)
  }

  /**
   * searches identifier and return its value
   * @param key identifier
   */
  lookUp(key: string): AnyType {
    if (this.dict.has(key)) {
      return this.dict.get(key)
    }
    if (this.parent !== undefined) {
      return this.parent.lookUp(key)
    }
    try {
      if (this.options.canAccessWindow) {
        // @ts-ignore
        return window[key]
      }
      if (this.options.enableGlobal) {
        // @ts-ignore
        return global[key]
      }
      throw new NameNotFound(key)
    } catch {
      throw new NameNotFound(key)
    }
  }

  /**
   *
   * @param key identifier
   * @param value right hand side of assignment
   */
  register(key: string, value: AnyType) {
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
