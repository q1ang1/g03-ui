import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { createThemeVarsCss, darkTokens, lightTokens } from '../tokens'
import { createG03ThemeVars, g03TokenNames, g03TokenRegistry } from '../token-registry'

const varsCssPath = fileURLToPath(new URL('../styles/vars.css', import.meta.url))
const normalize = (css: string): string => css.replace(/\s+/g, ' ').trim()

describe('@g03/theme tokens', () => {
  it('从 registry 派生出明暗两套 G03 变量', () => {
    expect(Object.keys(lightTokens.g03Vars)).toEqual(g03TokenNames)
    expect(Object.keys(darkTokens.g03Vars)).toEqual(g03TokenNames)
    expect(Object.keys(createG03ThemeVars('dark'))).toEqual(g03TokenNames)
    expect(g03TokenRegistry.length).toBe(g03TokenNames.length)
  })

  it('提交的 src/styles/vars.css 与生成结果保持一致', () => {
    const committed = readFileSync(varsCssPath, 'utf8')
    expect(normalize(committed)).toBe(normalize(createThemeVarsCss()))
  })

  it('主题规则只引用已注册的 G03 令牌', () => {
    const css = createThemeVarsCss()
    const referenced = [...css.matchAll(/var\((--g-(?:ui|comps)-[\w-]+)\)/g)].map(match => match[1])
    const registered = new Set<string>(g03TokenNames)
    for (const name of referenced)
      expect(registered.has(name)).toBe(true)
  })
})
