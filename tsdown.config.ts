import { defineConfig } from "tsdown"

export default defineConfig([
  {
    entry: ["./src/index.ts"],
    platform: "neutral",
    dts: true,
  },
  {
    entry: ["./src/tool/index.ts"],
    platform: "neutral",
    dts: true,
    outDir: "./dist/tool",
  },
  {
    entry: ["./src/web/index.ts"],
    platform: "neutral",
    dts: true,
    outDir: "./dist/web",
  },
])
