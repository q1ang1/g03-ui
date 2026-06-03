/**
 * tokens.ts —— 主题令牌的中枢。
 *
 * - `ElementThemeVars`：G03 对 Element Plus（'g' 命名空间）变量的覆盖，用来落地绿色品牌。
 * - `G03ThemeVars`：G03 自有的设计令牌（与 token-registry.ts 一一对应）。
 *
 * `createThemeVarsCss()` 把上面两类令牌 + 规则拼成最终 CSS（html:root 亮色 + html.dark 暗色），
 * 由 `scripts/gen-styles.ts` 写出 `src/styles/vars.css`，并由 `__tests__/tokens.spec.ts` 守卫一致性。
 */

import {
  descendantThemeCssRules,
  renderThemeCssRules,
  renderUtilityThemeCssRules,
} from './theme-rules'
import { createG03ThemeVars } from './token-registry'

/** Element Plus（'g' 命名空间）变量的可覆盖子集，用于落地 G03 绿色品牌。 */
export interface ElementThemeVars {
  '--g-color-primary'?: string
  '--g-color-primary-light-3'?: string
  '--g-color-primary-light-5'?: string
  '--g-color-primary-light-7'?: string
  '--g-color-primary-light-9'?: string
  '--g-color-primary-dark-2'?: string
  '--g-border-radius-base'?: string
}

/** G03 自有设计令牌（键集合必须与 token-registry.ts 保持同步）。 */
export interface G03ThemeVars {
  '--g-ui-button-font-weight': string
  '--g-ui-button-radius': string
  '--g-ui-button-shadow': string
  '--g-ui-control-radius': string
  '--g-ui-control-shadow': string
  '--g-ui-control-focus-shadow': string
  '--g-ui-surface-radius': string
  '--g-ui-surface-shadow': string
  '--g-comps-section-gap': string
  '--g-comps-section-padding': string
  '--g-comps-section-bg': string
  '--g-comps-section-border-color': string
  '--g-comps-section-radius': string
  '--g-comps-section-shadow': string
  '--g-comps-pager-gap': string
}

export interface ThemeTokens {
  elementVars: ElementThemeVars
  g03Vars: G03ThemeVars
}

/** 亮色：G03 绿色品牌（#0b5a58 主色族）作为 Element Plus 变量覆盖。 */
const lightElementVars: ElementThemeVars = {
  '--g-color-primary': '#0b5a58',
  '--g-color-primary-light-3': '#548c8a',
  '--g-color-primary-light-5': '#85acab',
  '--g-color-primary-light-7': '#b6cdcd',
  '--g-color-primary-light-9': '#e6eeee',
  '--g-color-primary-dark-2': '#094846',
  '--g-border-radius-base': '6px',
}

/** 暗色：把主色提亮为青绿，保证暗背景下的对比度。 */
const darkElementVars: ElementThemeVars = {
  '--g-color-primary': '#2dd4bf',
  '--g-color-primary-light-3': '#26ab9a',
  '--g-color-primary-light-5': '#1f8276',
  '--g-color-primary-light-7': '#175952',
  '--g-color-primary-light-9': '#0f3a36',
  '--g-color-primary-dark-2': '#5fe0d0',
  '--g-border-radius-base': '6px',
}

export const lightTokens: ThemeTokens = {
  elementVars: lightElementVars,
  g03Vars: createG03ThemeVars('light'),
}

export const darkTokens: ThemeTokens = {
  elementVars: darkElementVars,
  g03Vars: createG03ThemeVars('dark'),
}

export type ThemeCssVars = ElementThemeVars & G03ThemeVars

export interface ThemeVarsCssOptions {
  lightSelector?: string
  darkSelector?: string
}

export function createThemeCssVars(tokens: ThemeTokens): ThemeCssVars {
  return {
    ...tokens.elementVars,
    ...tokens.g03Vars,
  }
}

function renderCssBlock(selector: string, vars: object): string {
  const declarations = Object.entries(vars)
    .filter((entry): entry is [string, string] => typeof entry[1] === 'string')
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n')

  return `${selector} {\n${declarations}\n}`
}

function renderCoreComponentCss(): string {
  return [
    renderUtilityThemeCssRules(),
    renderThemeCssRules(descendantThemeCssRules),
  ].join('\n\n')
}

/** 把令牌 + 规则拼成完整主题 CSS（明暗双套 + g-/g-comps- 规则）。 */
export function createThemeVarsCss(options: ThemeVarsCssOptions = {}): string {
  const lightSelector = options.lightSelector ?? 'html:root'
  const darkSelector = options.darkSelector ?? 'html.dark'

  const lightVars = createThemeCssVars(lightTokens)
  const darkVars = createThemeCssVars(darkTokens)

  return `/**
 * vars.css —— 由 src/tokens.ts 生成，请勿手改。
 * 改动令牌后运行：pnpm --filter @g03/theme gen:styles
 */

${renderCssBlock(lightSelector, lightVars)}

${renderCssBlock(darkSelector, darkVars)}

${renderCoreComponentCss()}
`
}
