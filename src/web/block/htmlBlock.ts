import { h } from "preact"
import { Result } from "../../runtime/block"
import type { Environment } from "../../runtime/environment"
import { ElementBlock } from "./elementBlock"

export let rootNode: any = null

export class HtmlBlock extends ElementBlock {
  constructor(env: Environment) {
    super(
      env,
      "div",
      () => true,
      (env) => {
        rootNode = h(
          "div",
          this.style ? { style: Object.fromEntries(this.style.value) } : null,
          ...this.children,
        )
        env.address.shift(-1)
        return Result.Shifted
      },
    )
  }
}
