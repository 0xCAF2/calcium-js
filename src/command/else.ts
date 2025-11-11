import { commandTable } from "../core/table"
import { Environment } from "../runtime/environment"
import { Conditional } from "./conditional"
import * as Keyword from "../core/keywords"

export class Else extends Conditional {
  isSatisfied(env: Environment): boolean {
    // When an else command becomes the current line,
    // the runtime should always enter this else block.
    return true
  }
}

commandTable.set(Keyword.Command.Else, () => {
  return new Else()
})
