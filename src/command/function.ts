import { Command } from '.'
import { FunctionCalled, InvalidEnd } from '../error'
import { Block, Kind, Result } from '../runtime/block'
import { Constant } from '../runtime/constant'
import { Environment } from '../runtime/environment'
import { Namespace } from '../runtime/namespace'
import { AnyType } from '../runtime/types'
import * as Sym from '../runtime/symbols'
import { Parser } from '../runtime/parser'
import { End } from './end'
import { Variable } from '../runtime/variable'

export class Function implements Command {
  constructor(
    public readonly funcName: string,
    public readonly params: string[]
  ) {}

  execute(env: Environment): void {
    const definedAddr = env.address.clone()
    const parentScope = env.context.parent
    const params = this.params

    let isCalledByUser = false

    function _f(...args: AnyType[]) {
      const callerAddr = env.address.clone()
      const local = new Namespace(parentScope)
      params.forEach((p, i) => local.register(p, new Constant(p, args[i])))
      const calleeAddr = definedAddr.clone()
      calleeAddr.calls = callerAddr.calls + 1

      let hasExited = false

      const block = new Block(
        Kind.Call,
        calleeAddr,
        (env) => {
          env.stack.push(env.context)
          env.context = local
          return true
        },
        (env) => {
          env.address.jump(callerAddr)
          env.address.calls -= 1
          env.address.shift(0)
          env.address.skip(-1)
          env.context = env.stack.pop()!
          hasExited = true
          return Result.Jumpped
        }
      )
      block.willEnter(env)

      if (isCalledByUser) {
        throw new FunctionCalled()
      } else {
        const parser = new Parser()
        while (!hasExited) {
          env.skipToNextLine()
          const lastIndex = env.code.length - 1
          if (env.address.indent === 0) {
            const end = parser.readStmt(env.code.at(-1)!)
            if (end! instanceof End) {
              throw new InvalidEnd()
            }
            break
          } else {
            if (env.address.line >= lastIndex) {
              break
            }
          }
          const line = env.code[env.address.line]
          const cmd = parser.readStmt(line)
          cmd.execute(env)
        }
        env.skipToNextLine()
        const returnValue = env.returnedValue
        env.returnedValue = undefined
        return returnValue
      }
    }
    Reflect.set(_f, Sym.calledByUser, function () {
      isCalledByUser = true
      return (...args: AnyType[]) => _f(...args)
    })

    env.context.register(this.funcName, new Variable(this.funcName, _f))
  }
}
