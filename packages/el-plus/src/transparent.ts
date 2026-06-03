import type {
  AllowedComponentProps,
  Component,
  ComponentCustomProps,
  ComponentPublicInstance,
  DefineComponent,
  Ref,
  VNodeProps,
} from 'vue'
import { defineComponent, h, ref } from 'vue'
import { G_WRAPPER_CLASS_PREFIX } from './namespace'

type TransparentWrapperBaseProps
  = & VNodeProps
    & AllowedComponentProps
    & ComponentCustomProps
    & Record<`on${string}`, unknown>

export type TransparentWrapperComponent<Props extends object = Record<string, unknown>>
  = DefineComponent<Partial<Props> & TransparentWrapperBaseProps>

function getWrappedInstanceRecord(
  wrappedRef: Ref<ComponentPublicInstance | null>,
): Record<PropertyKey, unknown> | null {
  return wrappedRef.value as Record<PropertyKey, unknown> | null
}

/**
 * 用 Proxy 把对包装组件实例的访问透传到内层 Element Plus 实例,
 * 让 `ref.value.focus()` / `ref.value.validate()` 等行为与原生 El* 组件一致。
 */
function createExposeProxy(wrappedRef: Ref<ComponentPublicInstance | null>) {
  return new Proxy({}, {
    get(_, key) {
      return getWrappedInstanceRecord(wrappedRef)?.[key]
    },
    has(_, key) {
      const target = getWrappedInstanceRecord(wrappedRef)
      return target === null ? false : key in target
    },
    set(_, key, value) {
      const target = getWrappedInstanceRecord(wrappedRef)
      if (target === null)
        return false

      target[key] = value
      return true
    },
  })
}

/**
 * 透明包装工厂:把一个 Element Plus 组件包成 G 组件。
 * - inheritAttrs:false + `...attrs`:把所有 props / 事件精确透传到内层组件;
 * - class 数组合并:注入 `g-<suffix>` 钩子类,同时保留用户传入的 class;
 * - slots 原样透传;expose 通过 Proxy 暴露内层实例方法。
 */
export function createTransparentWrapper<Props extends object = Record<string, unknown>>(
  name: string,
  component: Component,
  classSuffix: string,
): TransparentWrapperComponent<Props> {
  return defineComponent({
    name,
    inheritAttrs: false,
    setup(_, { attrs, expose, slots }) {
      const wrappedRef = ref<ComponentPublicInstance | null>(null)
      expose(createExposeProxy(wrappedRef))

      return () =>
        h(
          component,
          {
            ...attrs,
            ref: wrappedRef,
            class: [`${G_WRAPPER_CLASS_PREFIX}-${classSuffix}`, attrs.class],
          },
          slots,
        )
    },
  }) as unknown as TransparentWrapperComponent<Props>
}
