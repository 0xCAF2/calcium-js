import { Index } from "../.."
import { type Command } from "../../command"
import { commandTable } from "../../core/table"
import { Block, Kind } from "../../runtime/block"
import type { Environment } from "../../runtime/environment"
import { Namespace } from "../../runtime/namespace"
import { findElementBlock } from "../block/utils"

class EventHandlerEnded extends Error {}

class CalciumEvent {
  constructor(private readonly event: Event) {}

  get type() {
    return this.event.type
  }

  preventDefault() {
    this.event.preventDefault()
  }

  stopPropagation() {
    this.event.stopPropagation()
  }
}

export class On implements Command {
  constructor(public readonly eventName: string) {}

  execute(env: Environment): void {
    const handlerAddress = env.address.clone()
    const parentContext = env.context

    const element = findElementBlock(env)
    if (element) {
      element.eventListeners.set("on" + this.eventName, handler)
    } else {
      throw new Error("On command must be inside an element block")
    }

    function handler(event: Event) {
      const callerAddress = env.address.clone() // equals to end command's address
      const caev = new CalciumEvent(event)
      const local = new Namespace(parentContext)

      const block = new Block(
        Kind.Call,
        handlerAddress,
        (env) => {
          env.stack.push(env.context)
          env.context = local
          local.register("event", caev)
          env.blocks.push(element!)
          return true
        },
        (env) => {
          env.address.jump(callerAddress)
          env.address.calls -= 1
          env.context = env.stack.pop()!
          throw new EventHandlerEnded()
        },
      )
      block.willEnter(env)

      while (true) {
        try {
          env.skipToNextLine()
        } catch {
          env.address.jump(callerAddress)
          return
        }

        const lastIndex = env.currentModule.length - 1
        if (env.address.line > lastIndex || env.address.indent === 0) {
          env.address.jump(callerAddress)
          return
        }

        const line = env.currentModule[env.address.line]
        const cmd = env.parser.readStmt(line)
        cmd.execute(env)
      }
    }
  }
}

commandTable.set("on", (stmt, exprParser) => {
  const eventName = stmt[Index.Statement.FirstArg] as string
  return new On(eventName)
})
