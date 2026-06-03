// G03 统一命名空间常量。
// 'g' 同时用于:① Element Plus SCSS 的 $namespace(编译期类名前缀);
//             ② 运行时 GConfigProvider 注入的 namespace(DOM 类名前缀);
//             ③ 透明包装注入的 g-* 钩子类前缀。
export const G_ELEMENT_NAMESPACE = 'g' as const

export const G_WRAPPER_CLASS_PREFIX = 'g' as const

export const g03ElementNamespaceConfig = {
  namespace: G_ELEMENT_NAMESPACE,
} as const
