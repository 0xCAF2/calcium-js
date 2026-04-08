import type { Environment } from "../../runtime/environment"
import { ElementBlock } from "./elementBlock"

export function findElementBlock(env: Environment): ElementBlock | undefined {
  for (let i = env.blocks.length - 1; i >= 0; --i) {
    const block = env.blocks[i]
    if (block instanceof ElementBlock) {
      return block
    }
  }
  return undefined
}
