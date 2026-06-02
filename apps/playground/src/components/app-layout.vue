<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

type NavigationItem = {
  label: string
  description: string
  to: string
}

const route = useRoute()

/** Primary sections exposed by the starter playground interface. */
const navigationItems: NavigationItem[] = [
  {
    label: '项目总览',
    description: '看当前骨架、功能亮点和下一个开发动作。',
    to: '/workbench'
  },
  {
    label: '交付方案',
    description: '看分支策略、CI/CD 节点和对外发布流程。',
    to: '/delivery'
  }
]

/** Header title derived from the active navigation entry. */
const currentSectionLabel = computed(
  () => navigationItems.find((item) => item.to === route.path)?.label ?? 'G03'
)
</script>

<template>
  <div class="layout-shell">
    <aside class="side-panel">
      <div class="brand-block">
        <p class="brand-tag">
          G03
        </p>
        <h1>G03</h1>
        <p>G03 体系下的中后台起步仓库，先把界面、文档、工作区和流程整体接顺。</p>
      </div>

      <nav class="side-nav">
        <RouterLink
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          active-class="nav-item--active"
        >
          <strong>{{ item.label }}</strong>
          <span>{{ item.description }}</span>
        </RouterLink>
      </nav>

      <div class="side-footer">
        <p>
          建议下一步：
        </p>
        <ul>
          <li>把真实业务列表页和详情流接进这个管理台入口</li>
          <li>文档统一放在 `/docs/`，避免和管理系统入口冲突</li>
          <li>继续沉淀 `packages/ui` 里的业务底座组件</li>
        </ul>
      </div>
    </aside>

    <main class="main-panel">
      <header class="topbar">
        <div>
          <p class="topbar-tag">
            本地测试界面
          </p>
          <h2>{{ currentSectionLabel }}</h2>
        </div>
        <div class="topbar-status">
          <span class="status-dot" />
          <span>GitHub Pages 已接通</span>
        </div>
      </header>

      <div class="content-area">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.layout-shell {
  display: grid;
  grid-template-columns: minmax(280px, 320px) minmax(0, 1fr);
  min-height: 100vh;
}

.side-panel {
  position: relative;
  overflow: hidden;
  padding: 2rem 1.5rem;
  color: rgba(255, 255, 255, 0.92);
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.18), transparent 40%),
    linear-gradient(180deg, #102432 0%, #0d1a24 100%);
}

.side-panel::after {
  content: '';
  position: absolute;
  right: -5rem;
  bottom: -6rem;
  width: 16rem;
  height: 16rem;
  border-radius: 50%;
  background: rgba(74, 222, 208, 0.14);
  filter: blur(12px);
}

.brand-block,
.side-footer {
  position: relative;
  z-index: 1;
}

.brand-tag,
.topbar-tag {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.brand-tag {
  color: #6ee7d5;
}

.brand-block h1 {
  margin: 0.85rem 0 0.75rem;
  font-size: 2.1rem;
  line-height: 1.1;
}

.brand-block p {
  margin: 0;
  line-height: 1.7;
  color: rgba(226, 232, 240, 0.78);
}

.side-nav {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 0.85rem;
  margin: 2rem 0;
}

.nav-item {
  display: grid;
  gap: 0.35rem;
  padding: 1rem;
  color: inherit;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.04);
  transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.nav-item strong {
  font-size: 1rem;
}

.nav-item span {
  color: rgba(226, 232, 240, 0.76);
  line-height: 1.55;
}

.nav-item:hover,
.nav-item--active {
  transform: translateY(-2px);
  border-color: rgba(110, 231, 213, 0.42);
  background: rgba(110, 231, 213, 0.1);
}

.side-footer {
  margin-top: auto;
  padding: 1rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.05);
}

.side-footer p {
  margin: 0 0 0.75rem;
  font-weight: 700;
}

.side-footer ul {
  margin: 0;
  padding-left: 1.2rem;
  color: rgba(226, 232, 240, 0.78);
  line-height: 1.7;
}

.main-panel {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 1.75rem;
}

.topbar {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.topbar h2 {
  margin: 0.55rem 0 0;
  font-size: 1.8rem;
  color: var(--ink-strong);
}

.topbar-tag {
  color: var(--brand-strong);
}

.topbar-status {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  background: rgba(11, 90, 88, 0.1);
  color: var(--brand-strong);
  font-weight: 600;
}

.status-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: #0f766e;
  box-shadow: 0 0 0 0.35rem rgba(15, 118, 110, 0.14);
}

.content-area {
  flex: 1;
  min-width: 0;
}

@media (max-width: 960px) {
  .layout-shell {
    grid-template-columns: 1fr;
  }

  .side-panel {
    padding-bottom: 1.5rem;
  }

  .main-panel {
    padding: 1.25rem;
  }

  .topbar {
    flex-direction: column;
  }
}
</style>
