// 由 tokens.ts 生成 src/styles/vars.css。
// 运行：pnpm --filter @g03/theme gen:styles （通过 vite-node 执行 TS）。
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createThemeVarsCss } from '../src/tokens'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(here, '../src/styles')

mkdirSync(outDir, { recursive: true })
writeFileSync(resolve(outDir, 'vars.css'), createThemeVarsCss())
console.log('generated: packages/theme/src/styles/vars.css')
