<script setup lang="ts">
import { MetricCard, PageContainer, SectionPanel } from '@g03/ui'

type MetricItem = {
  label: string
  value: string
  hint: string
  tone: 'teal' | 'amber' | 'rose'
}

type FocusItem = {
  title: string
  description: string
}

/** High-level project progress cards shown at the top of the starter dashboard. */
const metricItems: MetricItem[] = [
  {
    label: '已落骨架',
    value: '3 个包',
    hint: 'apps/playground、docs、packages/ui 已经拆开。',
    tone: 'teal'
  },
  {
    label: '首批流程',
    value: '2 条',
    hint: 'CI 校验和 GitHub Pages 部署都已经进入仓库方案。',
    tone: 'amber'
  },
  {
    label: '线上入口',
    value: '已切换',
    hint: '管理台走站点根路径，文档统一放在 /docs/。',
    tone: 'rose'
  }
]

/** Immediate work items that keep the project moving after local bootstrap. */
const nextFocusItems: FocusItem[] = [
  {
    title: '接入真实业务页面',
    description: '下一批建议先做用户管理、角色管理和草稿 / 快照示例页。'
  },
  {
    title: '把 UI 包做成可复用底座',
    description: '继续沉淀 PageContainer、QueryBar、CommonTable 这类二次封装能力。'
  },
  {
    title: '让仓库进入协作状态',
    description: '把 main 保护起来，所有变更通过 feature 分支和 PR 进入。'
  }
]

/** Business-flavored highlights that make the project different from a plain admin template. */
const projectHighlights: string[] = [
  '先做真实页面，再从业务里抽组件，不提前空转抽象。',
  '保持 Vue 3 + script setup + TypeScript 的现代组合，但代码风格偏真实团队交付。',
  '把文档站、CI/CD、分支策略一起做进去，避免项目只停留在“能跑”。'
]
</script>

<template>
  <PageContainer
    eyebrow="G03 Dashboard"
    title="G03 的本地启动盘已经搭起来了"
    description="这个界面用来验证 G03 命名、共享 UI 包和页面壳子都已经打通。后面你接 GitHub 之后，可以直接把它作为第一版演示入口。"
  >
    <template #actions>
      <span class="status-pill">Turborepo 已接入</span>
      <span class="status-pill status-pill--light">根路径就是管理台</span>
    </template>

    <section class="metrics-grid">
      <MetricCard
        v-for="item in metricItems"
        :key="item.label"
        :label="item.label"
        :value="item.value"
        :hint="item.hint"
        :tone="item.tone"
      />
    </section>

    <div class="content-grid">
      <SectionPanel
        title="这个版本先验证什么"
        description="第一版不追求功能多，而是先保证结构清晰、界面完整、仓库可持续迭代。"
      >
        <ul class="bullet-list">
          <li
            v-for="item in projectHighlights"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>
      </SectionPanel>

      <SectionPanel
        title="接下来三件最值钱的事"
        description="这些动作完成后，仓库就可以从本地样板进入真正的开源开发状态。"
      >
        <article
          v-for="item in nextFocusItems"
          :key="item.title"
          class="focus-card"
        >
          <strong>{{ item.title }}</strong>
          <p>{{ item.description }}</p>
        </article>
      </SectionPanel>
    </div>
  </PageContainer>
</template>

<style scoped lang="scss">
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 1rem;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 0.95rem;
  border-radius: 999px;
  background: rgba(11, 90, 88, 0.12);
  color: var(--brand-strong);
  font-weight: 700;
}

.status-pill--light {
  background: rgba(15, 23, 42, 0.06);
  color: var(--ink-soft);
}

.bullet-list {
  margin: 0;
  padding-left: 1.2rem;
  color: var(--ink-soft);
  line-height: 1.8;
}

.focus-card {
  padding: 1rem;
  border-radius: 1rem;
  background: rgba(148, 163, 184, 0.1);
}

.focus-card strong {
  display: block;
  margin-bottom: 0.45rem;
  color: var(--ink-strong);
}

.focus-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.7;
}

@media (max-width: 960px) {
  .metrics-grid,
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
