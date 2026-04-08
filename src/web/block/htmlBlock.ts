import { h } from "preact"
import { Result } from "../../runtime/block"
import type { Environment } from "../../runtime/environment"
import { ElementBlock } from "./elementBlock"

export class HtmlBlock extends ElementBlock {
  constructor(env: Environment) {
    super(
      env,
      "div",
      () => true,
      (env) => {
        env.context.register("html", h("div", null, ...this.children))
        env.address.shift(-1)
        return Result.Shifted
      },
    )
  }
}
