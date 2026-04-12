import type { Statement } from "../runtime/statement"
import { Runtime } from "../runtime/runtime"
import "./command"
import { rootNode } from "./block/htmlBlock"

export type Code = string | Statement[]

export class Interpreter {
  public readonly runtime: Runtime
  constructor(public readonly code: Code) {
    this.runtime = new Runtime(code, {
      canAccessWindow: false,
      enableGlobal: false,
    })
  }

  show() {
    this.runtime.run()
    return rootNode
  }
}
