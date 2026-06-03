import type { MaybeRefOrGetter, Ref } from 'vue'
import { computed, isReadonly, isRef, shallowRef } from 'vue'

/**
 * usePaginationState —— headless 分页状态。
 *
 * 入参可传 ref / getter / 普通值(MaybeRefOrGetter):
 *   - 传 getter(如 `() => props.total`)时即为「受控」用法,内部状态只读,翻页交给外部(v-model);
 *   - 传普通值或不传时即为「非受控」用法,可直接调用 setPage 等修改。
 *
 * 不依赖任何 UI / DOM,可单独测试、配任意分页 UI 复用。
 */
export interface PaginationStateOptions {
  currentPage?: MaybeRefOrGetter<number>
  pageSize?: MaybeRefOrGetter<number>
  total?: MaybeRefOrGetter<number>
}

export interface PaginationState {
  currentPage: Ref<number>
  pageSize: Ref<number>
  total: Ref<number>
  /** 由 total / pageSize 派生的总页数(至少 1)。 */
  pageCount: Ref<number>
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  setTotal: (total: number) => void
  resetPage: () => void
}

function normalize(source: MaybeRefOrGetter<number> | undefined, fallback: number): Ref<number> {
  if (source === undefined)
    return shallowRef(fallback)
  if (isRef(source))
    return source
  if (typeof source === 'function')
    return computed(source as () => number) as Ref<number>
  return shallowRef(source)
}

function write(target: Ref<number>, value: number): void {
  // 受控用法下 target 是只读 computed,跳过写入,改由外部 v-model 驱动。
  if (isReadonly(target))
    return
  target.value = value
}

export function usePaginationState(options: PaginationStateOptions = {}): PaginationState {
  const currentPage = normalize(options.currentPage, 1)
  const pageSize = normalize(options.pageSize, 10)
  const total = normalize(options.total, 0)

  const pageCount = computed(() => Math.max(1, Math.ceil(total.value / Math.max(1, pageSize.value))))

  function setPage(page: number): void {
    write(currentPage, Math.min(Math.max(1, page), pageCount.value))
  }

  function setPageSize(size: number): void {
    write(pageSize, Math.max(1, size))
  }

  function setTotal(value: number): void {
    write(total, Math.max(0, value))
  }

  function resetPage(): void {
    write(currentPage, 1)
  }

  return {
    currentPage,
    pageSize,
    total,
    pageCount,
    setPage,
    setPageSize,
    setTotal,
    resetPage,
  }
}
