import { describe, expect, it } from 'vitest'
import { usePaginationState } from '../composables/use-pagination-state'

describe('usePaginationState', () => {
  it('根据 total / pageSize 派生总页数', () => {
    const state = usePaginationState({ pageSize: 10, total: 25 })
    expect(state.pageCount.value).toBe(3)
  })

  it('翻页时把页码夹在 [1, pageCount] 内', () => {
    const state = usePaginationState({ pageSize: 10, total: 25 })
    state.setPage(99)
    expect(state.currentPage.value).toBe(3)
    state.setPage(-5)
    expect(state.currentPage.value).toBe(1)
  })

  it('resetPage 回到第一页', () => {
    const state = usePaginationState({ pageSize: 10, total: 25 })
    state.setPage(3)
    state.resetPage()
    expect(state.currentPage.value).toBe(1)
  })
})
