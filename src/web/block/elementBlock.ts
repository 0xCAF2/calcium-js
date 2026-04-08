import { h, type ComponentChildren } from "preact"
import { Block, Kind, Result } from "../../runtime/block"
import type { Environment } from "../../runtime/environment"
import { findElementBlock } from "./findElementBlock"

export class ElementBlock extends Block {
  public readonly children: ComponentChildren[] = []
  public readonly styles: Map<string, string> = new Map()

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
          const parent = findElementBlock(env)
          parent?.children.push(
            h(
              this.tagName,
              { style: Object.fromEntries(this.styles) },
              ...this.children,
            ),
          )
          env.address.shift(-1)
          return Result.Shifted
        }),
    )
  }
}
