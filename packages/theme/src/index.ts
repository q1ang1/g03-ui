// @g03/theme 主入口：只导出主题相关内容，运行时不依赖任何 G03 组件包。
//
// 消费侧典型用法：
//   uno.config.ts → import { g03Preset } from '@g03/theme/preset/unocss'
//   main.ts       → import '@g03/theme/styles'
//   JS 读取令牌   → import { lightTokens } from '@g03/theme'

export { createG03ThemeVars, g03TokenNames, g03TokenRegistry } from './token-registry'
export type { G03TokenCategory, G03TokenDefinition } from './token-registry'
export { createThemeCssVars, createThemeVarsCss, darkTokens, lightTokens } from './tokens'
export type { ElementThemeVars, G03ThemeVars, ThemeCssVars, ThemeTokens, ThemeVarsCssOptions } from './tokens'
