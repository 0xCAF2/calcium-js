import { h, type ComponentChildren } from "preact"
import { Block, Kind, Result } from "../../runtime/block"
import type { Environment } from "../../runtime/environment"

export class ElementBlock extends Block {
  public readonly children: ComponentChildren[] = []

  constructor(
    env: Environment,
    public readonly tagName: string,
    enter?: (env: Environment) => boolean,
    exit?: (env: Environment) => Result,
  ) {
    super(
      Kind.ClassDef,
      env.address.clone(),
      enter ?? (() => true),
      exit ??
        ((env) => {
          let parent: ElementBlock | undefined
          for (let i = env.blocks.length - 1; i >= 0; --i) {
            const block = env.blocks[i]
            if (block instanceof ElementBlock) {
              parent = block
              break
            }
          }
          parent?.children.push(h(this.tagName, null, ...this.children))
          env.address.shift(-1)
          return Result.Shifted
        }),
    )
  }
}
