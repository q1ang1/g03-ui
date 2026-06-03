import type { G03ThemeVars } from './tokens'

/**
 * G03 自有设计令牌的分类。
 * 这些令牌由 G03 体系拥有，独立于 Element Plus 自身在 'g' 命名空间下产出的 `--g-*` 变量。
 */
export type G03TokenCategory = 'button' | 'control' | 'surface' | 'composite'

export interface G03TokenDefinition<Name extends keyof G03ThemeVars = keyof G03ThemeVars> {
  name: Name
  category: G03TokenCategory
  /** 亮色取值。 */
  light: G03ThemeVars[Name]
  /** 暗色取值；缺省时回退到 light。 */
  dark?: G03ThemeVars[Name]
  description: string
}

/**
 * 设计令牌单一数据源（single source of truth）。
 *
 * - `--g-ui-*`：包装层 / 控件 / 表面级令牌（对应 fizz 的 `--fe-fizz-*`）。
 * - `--g-comps-*`：组合组件层令牌（对应 fizz 的 `--fe-comps-*`）。
 *
 * 刻意用 `-ui-` / `-comps-` 子段，避开 Element Plus 在 'g' 命名空间下产出的 `--g-*` 组件变量。
 * 引用 `var(--g-border-radius-base, …)` 处带回退值，保证脱离 Element Plus 也能独立工作（runtime-independent）。
 */
export const g03TokenRegistry = [
  // —— button ——
  {
    name: '--g-ui-button-font-weight',
    category: 'button',
    light: '600',
    description: 'G03 按钮包装层的字重。',
  },
  {
    name: '--g-ui-button-radius',
    category: 'button',
    light: 'var(--g-border-radius-base, 6px)',
    description: 'G03 按钮包装层的圆角。',
  },
  {
    name: '--g-ui-button-shadow',
    category: 'button',
    light: '0 1px 2px rgba(11, 90, 88, 0.18)',
    description: 'G03 按钮包装层的轻微投影（绿色品牌色调）。',
  },
  // —— control ——
  {
    name: '--g-ui-control-radius',
    category: 'control',
    light: 'var(--g-border-radius-base, 6px)',
    description: 'G03 输入类控件的圆角。',
  },
  {
    name: '--g-ui-control-shadow',
    category: 'control',
    light: '0 1px 2px rgba(15, 23, 42, 0.06)',
    dark: '0 1px 2px rgba(0, 0, 0, 0.2)',
    description: 'G03 输入类控件的默认投影。',
  },
  {
    name: '--g-ui-control-focus-shadow',
    category: 'control',
    light: '0 0 0 3px rgba(11, 90, 88, 0.16)',
    dark: '0 0 0 3px rgba(45, 212, 191, 0.2)',
    description: 'G03 输入类控件的聚焦环（绿色）。',
  },
  // —— surface ——
  {
    name: '--g-ui-surface-radius',
    category: 'surface',
    light: 'var(--g-border-radius-base, 6px)',
    description: 'G03 卡片 / 弹窗等表面的圆角。',
  },
  {
    name: '--g-ui-surface-shadow',
    category: 'surface',
    light: '0 8px 24px rgba(15, 23, 42, 0.08)',
    dark: '0 12px 28px rgba(0, 0, 0, 0.32)',
    description: 'G03 表面的浮层阴影。',
  },
  // —— composite ——
  {
    name: '--g-comps-section-gap',
    category: 'composite',
    light: '16px',
    description: '组合组件 section 内部间距。',
  },
  {
    name: '--g-comps-section-padding',
    category: 'composite',
    light: '20px',
    description: '组合组件 section 内边距。',
  },
  {
    name: '--g-comps-section-bg',
    category: 'composite',
    light: '#ffffff',
    dark: '#111c1b',
    description: '组合组件 section 背景色。',
  },
  {
    name: '--g-comps-section-border-color',
    category: 'composite',
    light: '#e5e7eb',
    dark: '#2b3a38',
    description: '组合组件 section 边框色。',
  },
  {
    name: '--g-comps-section-radius',
    category: 'composite',
    light: 'var(--g-border-radius-base, 6px)',
    description: '组合组件 section 圆角。',
  },
  {
    name: '--g-comps-section-shadow',
    category: 'composite',
    light: '0 1px 2px rgba(15, 23, 42, 0.04)',
    dark: '0 1px 2px rgba(0, 0, 0, 0.24)',
    description: '组合组件 section 轻微投影。',
  },
  {
    name: '--g-comps-pager-gap',
    category: 'composite',
    light: '12px',
    description: '分页条控件之间的间距。',
  },
] as const satisfies readonly G03TokenDefinition[]

type RegisteredG03TokenName = (typeof g03TokenRegistry)[number]['name']
type AssertNever<T extends never> = T

/** 编译期校验：registry 覆盖了 G03ThemeVars 的全部键（多一个少一个都会报错）。 */
export type G03TokenRegistryIncludesAllThemeVars = AssertNever<
  Exclude<keyof G03ThemeVars, RegisteredG03TokenName>
>
/** 编译期校验：registry 没有引入 G03ThemeVars 之外的键。 */
export type G03TokenRegistryUsesOnlyThemeVars = AssertNever<
  Exclude<RegisteredG03TokenName, keyof G03ThemeVars>
>

export const g03TokenNames = g03TokenRegistry.map(token => token.name)

/** 按模式从 registry 派生出一套 G03 自有变量（暗色缺省回退亮色）。 */
export function createG03ThemeVars(mode: 'light' | 'dark'): G03ThemeVars {
  return Object.fromEntries(
    (g03TokenRegistry as readonly G03TokenDefinition[]).map(token => [
      token.name,
      mode === 'dark' ? token.dark ?? token.light : token.light,
    ]),
  ) as unknown as G03ThemeVars
}
