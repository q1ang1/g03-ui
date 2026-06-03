import { usePaginationState } from '@g03/el-kit'
import { GButton } from '@g03/el-plus'
import { computed, defineComponent } from 'vue'

/**
 * GcPaginationBar —— 组合组件 demo(TSX),把四层串起来:
 *   - @g03/el-kit:usePaginationState 算总页数、夹取页码(headless 逻辑)
 *   - @g03/el-plus:GButton 透明包装组件渲染上一页 / 下一页
 *   - @g03/theme:g-comps-section / g-comps-pager 类(样式来自主题令牌)
 *   - TSX:用 JSX 描述渲染
 *
 * 受控用法(v-model):currentPage 由外部传入,翻页通过 update:currentPage 事件回传。
 */
export const GcPaginationBar = defineComponent({
  name: 'GcPaginationBar',
  props: {
    currentPage: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    total: { type: Number, default: 0 },
  },
  emits: {
    'update:currentPage': (page: number) => Number.isInteger(page),
  },
  setup(props, { emit }) {
    const state = usePaginationState({
      currentPage: () => props.currentPage,
      pageSize: () => props.pageSize,
      total: () => props.total,
    })

    const label = computed(() => `第 ${state.currentPage.value} / ${state.pageCount.value} 页`)

    function go(page: number): void {
      const next = Math.min(Math.max(1, page), state.pageCount.value)
      if (next !== props.currentPage)
        emit('update:currentPage', next)
    }

    return () => (
      <div class="g-comps-section g-comps-pager">
        <GButton
          disabled={props.currentPage <= 1}
          onClick={() => go(props.currentPage - 1)}
        >
          上一页
        </GButton>
        <span class="g-comps-pager__label">{label.value}</span>
        <GButton
          type="primary"
          disabled={props.currentPage >= state.pageCount.value}
          onClick={() => go(props.currentPage + 1)}
        >
          下一页
        </GButton>
      </div>
    )
  },
})
