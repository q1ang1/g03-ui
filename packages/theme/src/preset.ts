import type { Preset } from 'unocss'
import { createUnoThemeRules } from './theme-rules'
import { createThemeVarsCss } from './tokens'

/**
 * g03Preset —— @g03/theme 的 UnoCSS 预设。
 *
 * 消费侧 uno.config.ts：
 * ```ts
 * import { defineConfig, presetWind3 } from 'unocss'
 * import { g03Preset } from '@g03/theme/preset/unocss'
 *
 * export default defineConfig({ presets: [presetWind3(), g03Preset()] })
 * ```
 *
 * 提供：
 *   - preflights：注入 token 生成的 CSS 变量（html:root / html.dark）
 *   - shortcuts：常用语义类（btn-primary / text-primary）
 *   - rules：g-btn / g-comps-* 工具类（与 vars.css 复用同一份规则数据）
 *   - safelist：保护运行时动态拼接、静态扫描不到的类名不被裁剪
 */
export function g03Preset(): Preset {
  return {
    name: '@g03/theme/preset',
    safelist: ['g-btn', 'g-comps-section', 'g-comps-pager'],
    preflights: [
      {
        getCSS: () => createThemeVarsCss(),
      },
    ],
    shortcuts: [
      ['btn-primary', 'bg-[var(--g-color-primary)] text-white rounded-[var(--g-ui-button-radius)] px-4 py-2'],
      ['text-primary', 'text-[var(--g-color-primary)]'],
    ],
    rules: createUnoThemeRules(),
  }
}
