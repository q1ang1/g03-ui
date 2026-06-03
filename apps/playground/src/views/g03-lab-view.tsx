import { GcPaginationBar } from '@g03/el-comps'
import { GButton } from '@g03/el-plus'
import { useDark, useToggle } from '@vueuse/core'
import { computed, defineComponent, ref } from 'vue'

/**
 * G03 体系演示视图(TSX)。
 * 串起四层:el-plus(GButton 透明包装)+ el-kit(usePaginationState,被 GcPaginationBar 使用)
 * + theme(g-comps-* 类 / --g- 令牌 / 明暗主题)+ TSX 渲染。
 *
 * 暗色切换用 @vueuse/core 的 useDark/useToggle —— 默认给 <html> 加 `dark` 类,
 * 正好命中 @g03/theme 的 `html.dark` 选择器,CSS 变量级联即时生效。
 */
export default defineComponent({
  name: 'G03LabView',
  setup() {
    const isDark = useDark()
    const toggleDark = useToggle(isDark)

    const page = ref(1)
    const total = ref(48)
    const pageCount = computed(() => Math.ceil(total.value / 10))

    return () => (
      <div class="grid gap-6">
        <header class="flex items-start justify-between gap-4 flex-wrap">
          <div class="grid gap-2">
            <h1 class="m-0 text-2xl">G03 体系演示</h1>
            <p class="m-0 max-w-2xl">
              透明包装(GButton)+ headless 逻辑(usePaginationState)+ 主题令牌(--g- 变量)+ TSX 渲染,
              并用 CSS 变量做明暗主题切换。
            </p>
          </div>
          <GButton onClick={() => toggleDark()}>
            {isDark.value ? '切到亮色' : '切到暗色'}
          </GButton>
        </header>

        <section class="g-comps-section">
          <h2 class="m-0 text-base">GButton —— 透明包装(主色取自 --g-color-primary 绿色)</h2>
          <div class="flex gap-3 flex-wrap items-center">
            <GButton type="primary">主要按钮</GButton>
            <GButton>默认按钮</GButton>
            <GButton type="primary" plain>朴素按钮</GButton>
            <GButton type="primary" disabled>禁用</GButton>
          </div>
        </section>

        <section class="g-comps-section">
          <h2 class="m-0 text-base">GcPaginationBar —— 组合组件(受控 v-model)</h2>
          <GcPaginationBar
            currentPage={page.value}
            pageSize={10}
            total={total.value}
            onUpdate:currentPage={(next: number) => { page.value = next }}
          />
          <p class="m-0 text-sm">当前页:{page.value} / 共 {pageCount.value} 页</p>
        </section>
      </div>
    )
  },
})
