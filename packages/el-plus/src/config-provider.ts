import { ElConfigProvider } from 'element-plus'
import { defineComponent, h } from 'vue'
import { G_ELEMENT_NAMESPACE } from './namespace'

/**
 * GConfigProvider —— 在应用根部包一层,使内部所有 Element Plus 组件
 * 运行时生成的类名走 'g' 命名空间(g-button …),与 SCSS 编译出的 g-* 类对齐。
 */
export const GConfigProvider = defineComponent({
  name: 'GConfigProvider',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        ElConfigProvider,
        {
          ...attrs,
          namespace: G_ELEMENT_NAMESPACE,
        },
        slots,
      )
  },
})
