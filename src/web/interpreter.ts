import { h } from "preact"
import type { Statement } from "../runtime/statement"
import { Runtime } from "../runtime/runtime"
import "./command"

export type Code = string | Statement[]

export class Interpreter {
  public readonly runtime: Runtime
  constructor(public readonly code: Code) {
    this.runtime = new Runtime(code, {
      canAccessWindow: true,
      enableGlobal: false,
    })
  }

  show() {
    this.runtime.run()
    return h("div", null, this.runtime.env.context.get("html")!)
  }
}
