# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 仓库基线

- pnpm workspace + Turborepo monorepo。运行环境：Node `>=22.12.0`（`.nvmrc` 锁 `24.14.0`，CI 用 Node 24），包管理器 `pnpm@10.32.1`。
- 三个 workspace：
  - `apps/playground`（包名 `g03-playground`）—— Vite + Vue 3 + TS 组件库测试台
  - `packages/ui`（包名 `@g03/ui`）—— 共享 UI 组件库，`exports` 直接指向 `./src/index.ts`，**不预编译**
  - `docs`（包名 `g03-docs`）—— VitePress 文档站
- 第三方依赖统一通过 `pnpm-workspace.yaml` 的 `catalog:` 协议锁版本，workspace 间用 `workspace:*` 引用。新增依赖时优先添加进 catalog，而不是直接写死版本。
- 详细的协作约束、验证矩阵、Git 边界见 `AGENTS.md`，本文件不重复这些规则。

## 常用命令

根脚本都走 Turbo，按需 `--filter` 收窄到具体 workspace：

```bash
pnpm dev:playground                     # 启动 playground（vite）
pnpm dev:docs                           # 启动 vitepress dev
pnpm build                              # 全量构建（playground + ui + docs）
pnpm lint / typecheck / test            # 全量分发到各 workspace
pnpm check                              # lint + typecheck + test + build，main push 用
pnpm check:affected                     # 同上但只跑受影响 workspace，PR CI 用
```

定向到单个 workspace（开发时优先用，避免全量 Turbo 调度开销）：

```bash
pnpm --filter g03-playground dev | build | lint | typecheck | test:e2e
pnpm --filter g03-playground exec playwright test tests/e2e/app-shell.spec.ts   # 单个 E2E
pnpm --filter g03-playground exec playwright test -g "导航"                      # 按用例名过滤

pnpm --filter "@g03/ui" lint | typecheck | test | build
pnpm --filter "@g03/ui" exec vitest run src/__tests__/metric-card.spec.ts  # 单测
pnpm --filter "@g03/ui" exec vitest                                        # watch 模式

pnpm --filter g03-docs build | dev
```

注意：根 `pnpm test` 当前实际仅覆盖 `@g03/ui`（vitest）；`apps/playground` 的测试入口是 `test:e2e`（Playwright），**不挂在 turbo `test` 任务下**，需要显式调用。

## 架构关键点

### 启动链与路由

`apps/playground/src/main.ts` → `createApp(App).use(router).mount('#app')`。`App.vue` 只放 `<AppLayout><RouterView/></AppLayout>` 加路由过渡；`components/app-layout.vue` 用 slot 接收 RouterView，并用 `useRoute()` 派生 header 标题。

`router/index.ts` 的关键决策：根据 `import.meta.env.BASE_URL` 动态选 history 模式 —— 根路径用 `createWebHistory`，非根（即 Pages 部署到子路径时）退化为 `createWebHashHistory` 避开静态站刷新 404。**改 base 路径、Vite `base` 配置或部署目标时，必须连带验证这段逻辑。**

### 共享 UI 包消费模式

`@g03/ui` 通过源码 `exports`（`./src/index.ts`）直接暴露 SFC，playground 端 `import { PageContainer, SectionPanel, MetricCard } from '@g03/ui'` 实际是在消费源文件，由 playground 自己的 Vite 处理编译。因此：

- 改 `packages/ui` 的源码立刻对 playground 生效，不需要先 build。
- 但 `packages/ui` 仍保留 `build` 脚本（vite library 模式），用于产物或未来发布场景；改导出/打包入口时要一并验证 `pnpm --filter "@g03/ui" build`。
- UI 包对 playground **零反向依赖**；新增共享能力放 `packages/ui`，业务页/路由/壳子放 `apps/playground`。

### 发布路径约定（high-impact）

GitHub Pages 单仓双站：组件测试台发到站点根 `/`，文档站发到 `/docs/`。这条约定散落在多个文件，改任一项都要同时核对其它项是否一致：

- `apps/playground/vite.config.ts`（base）
- `apps/playground/src/router/index.ts`（history 模式判定）
- `docs/.vitepress/config.ts`（base）
- `.github/workflows/deploy-pages.yml`（构建产物拼装与发布顺序）

### 命名与代码风格

- SFC、视图、组件文件名一律 kebab-case（`workbench-view.vue`、`app-layout.vue`、`page-container.vue`）。新增 Vue 文件务必沿用。
- Vue 文件统一 `<script setup lang="ts">` + Composition API。
- `apps/playground` 内可用 `@/*` → `src/*` 别名；**不要把该别名扩散到其他 workspace**。
- TypeScript `strict: true`、`isolatedModules: true`、`moduleResolution: Bundler`（见 `tsconfig.base.json`），各 workspace 通过自己的 tsconfig extends。
- ESLint Flat Config 在仓库根 `eslint.config.mjs`，覆盖 `.ts` 与 `.vue`。

### 预留命名空间

未来扩展时直接沿用 `@g03/*`：`@g03/hooks`、`@g03/utils` 已在 README 中预订，新增 package 时按此命名以避免后续重命名。

## CI 与发布

- `.github/workflows/ci.yml`：PR 触发 `pnpm check:affected`，main push 触发 `pnpm check`。
- `.github/workflows/deploy-pages.yml`：main push 时构建 playground + docs，组装为单站点（playground 在根、docs 在 `/docs/`）后发布。
- `turbo.json` 把 `pnpm-lock.yaml`、`pnpm-workspace.yaml`、`tsconfig.base.json`、`.nvmrc`、`.github/workflows/*.yml` 列为 globalDependencies —— 改动其中任一会使 Turbo 全量缓存失效，属于预期行为。

## 索引与导航

仓库已建 CodeGraph 索引（`.codegraph/`），结构性问题（"X 在哪定义"、"什么调用 Y"、"改 Z 会影响什么"）优先用 `codegraph_*` MCP 工具，比 grep + read 更快也更准确。
