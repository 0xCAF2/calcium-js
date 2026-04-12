import { h, type ComponentChildren } from "preact"
import { Block, Kind, Result } from "../../runtime/block"
import type { Environment } from "../../runtime/environment"
import { findElementBlock } from "./utils"
import { Signal, useSignal } from "@preact/signals"

export class ElementBlock extends Block {
  public readonly children: ComponentChildren[] = []
  public readonly style: Signal<Map<string, string>> = useSignal(new Map())
  public readonly attributes: Map<string, string> = new Map()
  public readonly id: string | null = null
  public readonly eventListeners: Map<string, (event: Event) => void> =
    new Map()

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
              {
                style: Object.fromEntries(this.style.value),
                ...Object.fromEntries(this.eventListeners),
              },
              ...this.children,
            ),
          )
          env.address.shift(-1)
          return Result.Shifted
        }),
    )
  }
}
