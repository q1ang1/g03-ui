/**
 * theme-rules.ts —— 用一份「纯数据」描述 g-/g-comps- 类的样式，
 * 再由两个渲染函数产出两种格式：
 *   - renderUtilityThemeCssRules() → CSS 字符串（写进 vars.css）
 *   - createUnoThemeRules()        → UnoCSS 规则元组（喂给 g03Preset）
 * 同一数据源、双产物，保证静态 CSS 与 UnoCSS 两条路径永远一致。
 */

export interface ThemeUtilityRule {
  className: string
  declarations: Record<string, string>
}

export interface ThemeCssRule {
  selector: string
  declarations: Record<string, string>
}

/** 工具类规则：g- / g-comps- 类本体。 */
export const themeUtilityRules: ThemeUtilityRule[] = [
  {
    className: 'g-btn',
    declarations: {
      'font-weight': 'var(--g-ui-button-font-weight)',
      'border-radius': 'var(--g-ui-button-radius)',
      'box-shadow': 'var(--g-ui-button-shadow)',
    },
  },
  {
    className: 'g-comps-section',
    declarations: {
      'display': 'grid',
      'gap': 'var(--g-comps-section-gap)',
      'padding': 'var(--g-comps-section-padding)',
      'background': 'var(--g-comps-section-bg)',
      'border': '1px solid var(--g-comps-section-border-color)',
      'border-radius': 'var(--g-comps-section-radius)',
      'box-shadow': 'var(--g-comps-section-shadow)',
    },
  },
  {
    className: 'g-comps-pager',
    declarations: {
      'display': 'flex',
      'align-items': 'center',
      'gap': 'var(--g-comps-pager-gap)',
    },
  },
]

/** 后代选择器规则：作用到组件内部结构（含 Element Plus 在 'g' 命名空间下的内部元素）。 */
export const descendantThemeCssRules: ThemeCssRule[] = [
  {
    selector: '.g-input .g-input__wrapper,\n.g-select .g-select__wrapper',
    declarations: {
      'border-radius': 'var(--g-ui-control-radius)',
      'box-shadow': 'var(--g-ui-control-shadow)',
    },
  },
  {
    selector: '.g-input .g-input__wrapper.is-focus',
    declarations: {
      'box-shadow': 'var(--g-ui-control-focus-shadow)',
    },
  },
  {
    selector: '.g-card,\n.g-dialog',
    declarations: {
      'border-radius': 'var(--g-ui-surface-radius)',
      'box-shadow': 'var(--g-ui-surface-shadow)',
    },
  },
]

/** 把规则数组渲染成 CSS 字符串。 */
export function renderThemeCssRules(rules: ThemeCssRule[]): string {
  return rules
    .map((rule) => {
      const declarations = Object.entries(rule.declarations)
        .map(([name, value]) => `  ${name}: ${value};`)
        .join('\n')

      return `${rule.selector} {\n${declarations}\n}`
    })
    .join('\n\n')
}

/** 工具类 → CSS 字符串。 */
export function renderUtilityThemeCssRules(rules = themeUtilityRules): string {
  return renderThemeCssRules(
    rules.map(rule => ({
      selector: `.${rule.className}`,
      declarations: rule.declarations,
    })),
  )
}

/** 工具类 → UnoCSS 规则元组 [类名, 声明对象]。 */
export function createUnoThemeRules(rules = themeUtilityRules) {
  return rules.map(rule => [rule.className, rule.declarations] as [string, Record<string, string>])
}
