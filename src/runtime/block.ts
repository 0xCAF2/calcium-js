import { Environment } from '../runtime/environment'
import { Address } from './address'

/**
 * when returns true, the block should be executed.
 */
type Enter = (env: Environment) => boolean

/**
 * executed when the block ends
 * The returned value represents the result when a `Block` ends with
 * a jump over two or more points on the address.
 */
type Exit = (env: Environment) => Result

/**
 * the kind of a `Block`
 */
export enum Kind {
  Call = 'Call',
  ClassDef = 'ClassDef',
  For = 'For',
  IfElseIfElse = 'IfElseIfElse',
  Ifs = 'Ifs',
  While = 'While',
}

export enum Result {
  /**
   * an exception has occurred
   */
  Invalid,
  /**
   * moved over two or more points
   */
  Jumpped,
  /**
   * shifted one point only
   */
  Shifted,
}

/**
 * a syntactic scope
 */
export class Block {
  /**
   *
   * @param kind
   * @param address
   * @param enter determine whether this block should be executed
   * @param exit executed before this block ends
   */
  constructor(
    public readonly kind: Kind,
    public readonly address: Address,
    private readonly enter: Enter,
    private readonly exit: Exit
  ) {
    this.address = address.clone()
  }

  willEnter(env: Environment) {
    env.address = this.address.clone()
    if (this.enter(env)) {
      env.address.shift(1)
      env.blocks.push(this)
    }
  }

  didExit(env: Environment): Result {
    env.blocks.pop()
    return this.exit(env) // each command can have their own result
  }
}
