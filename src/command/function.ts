import type { Command } from "."
import { FunctionCalled, InvalidEnd } from "../error"
import { Block, Kind, Result } from "../runtime/block"
import { Environment } from "../runtime/environment"
import { Namespace } from "../runtime/namespace"
import type { AnyType } from "../runtime/types"
import * as Sym from "../runtime/symbols"
import { End } from "./end"
import { commandTable } from "../core/table"
import * as Index from "../core/indexes"
import * as Keyword from "../core/keywords"

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
      params.forEach((p, i) => local.register(p, args[i]))
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
        while (!hasExited) {
          env.skipToNextLine()
          const lastIndex = env.code.length - 1
          if (env.address.indent === 0) {
            const end = env.parser.readStmt(env.code.at(-1)!)
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
          const cmd = env.parser.readStmt(line)
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

    env.context.register(this.funcName, _f)
  }
}

commandTable.set(Keyword.Command.Function, (stmt) => {
  const funcName = stmt[Index.Function.Name] as string
  const params = stmt[Index.Function.Parameters] as string[]
  return new Function(funcName, params)
})
