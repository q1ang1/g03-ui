/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

// 子路径样式入口与 UnoCSS 虚拟模块：仅作副作用导入，声明为模块即可。
declare module 'virtual:uno.css'
declare module '@g03/theme/styles'
declare module '@g03/el-plus/styles/scss'

