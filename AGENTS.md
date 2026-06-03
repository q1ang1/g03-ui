# AGENTS.md

## 适用范围

- 本文件作用于仓库根目录及其子目录。
- 如果更深层目录存在更具体的 `AGENTS.md`、README、脚本说明或贡献规范，优先遵循更近的规则。

## 默认目标

- 在尊重用户指令和项目约定的前提下，以最小改动、可审查、可回退的方式完成任务。
- 先基于真实代码、脚本、配置和运行结果判断，再决定如何修改；不要把模板经验当成仓库事实。
- 默认做与改动相匹配的验证。若用户明确要求跳过，或当前环境不具备验证条件，不应让验证成为阻断项，但必须说明未验证内容、原因与风险。

## 回复与协作

- 默认使用简体中文，语气直接、专业。
- 先给结论，再给关键改动、影响范围、验证结果和必要风险。
- 遇到以下情况先给简短方案并等待确认：
  - 删除、覆盖、迁移重要文件或目录
  - 批量重命名、批量替换、调整目录结构
  - 修改公共接口、核心状态流、构建出口或部署路径
  - 可能影响现有功能行为、兼容性、CI、Pages 发布结果

## 仓库事实

- 本仓库是 `pnpm` workspace + Turborepo 单仓。
- 当前工作区为：
  - `apps/playground`：Vite + Vue 3 + TypeScript 组件库测试台
  - `packages/ui`：共享 UI 组件包 `@g03/ui`
  - `docs`：VitePress 文档站
- 根脚本通过 `turbo` 分发：
  - `pnpm dev:playground`
  - `pnpm dev:docs`
  - `pnpm build`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm check`
- 运行环境基线：
  - Node `>=22.12.0`
  - `pnpm@10`
- CI 当前使用 Node 24。
- 当前仓库使用 ESM、TypeScript、Vue 3 SFC。
- `apps/playground` 使用 `vue-router`，本地默认 history，Pages 发布时切换为 hash history 以避免刷新 404。
- 根 `pnpm test` 当前主要覆盖 `@g03/ui`；`apps/playground` 的测试入口是 `test:e2e`。
- GitHub Pages 发布约定：
  - 组件测试台发布到站点根路径 `/`
  - 文档站发布到 `/docs/`
- CI 约定：
  - PR 跑 `pnpm check:affected`
  - `main` push 跑 `pnpm check`

## 目录与边界

- 主要源码目录：
  - `apps/playground/src`
  - `packages/ui/src`
  - `docs/.vitepress`
  - `docs/guide`
  - `docs/process`
- 生成产物和缓存不要手改；如需更新，应修改源文件后重新生成：
  - `apps/playground/dist`
  - `packages/ui/dist`
  - `docs/.vitepress/dist`
  - `**/.turbo`
  - `playwright-report`
  - `test-results`
  - `coverage`
- 仓库里即使存在已提交的构建产物，也不要直接编辑产物文件。

## 工作方式

- 修改前先搜索并阅读相关实现、相邻文件、配置和脚本，确认复用点与影响范围。
- 优先复用现有实现，不无故新增抽象、中间层或重复组件。
- 遵循最小改动原则，避免把当前任务扩散成大范围重构。
- 多文件检索优先用全局搜索；定位后再做精确读取和局部修改。
- 涉及框架、构建、路由、CI、部署、第三方库版本敏感行为时，先以当前仓库代码和已安装版本为准，再决定是否扩展。
- 不要覆盖或回退用户已有修改；发现冲突时先说明影响。

## 代码约定

- 遵循现有 ESLint、TypeScript、Vite、VitePress 和 Turborepo 配置。
- 默认使用 TypeScript、ESM 和 2 空格缩进。
- Vue 文件优先使用 Composition API 和 `<script setup lang="ts">`，保持与现有代码一致。
- SFC、视图和组件文件名保持 kebab-case，例如 `workbench-view.vue`、`app-layout.vue`。
- `apps/playground` 内可使用 `@/*` 指向 `src/*`；不要把这个别名误用到其他 workspace。
- 共享 UI 能力优先放在 `packages/ui`，业务页壳和路由入口放在 `apps/playground`，文档内容放在 `docs`。
- 注释只写有信息量的内容，重点说明业务含义、原因、限制、边界和副作用。

## 修改重点提醒

- 改动以下内容时，要额外关注 GitHub Pages 路径是否仍然正确：
  - `apps/playground/vite.config.ts`
  - `apps/playground/src/router/index.ts`
  - `docs/.vitepress/config.ts`
  - `.github/workflows/deploy-pages.yml`
- 改动根配置时，优先确认是否会影响所有 workspace：
  - `package.json`
  - `pnpm-workspace.yaml`
  - `turbo.json`
  - `tsconfig.base.json`
  - `eslint.config.mjs`
- `packages/ui` 是共享包；这里的行为改动默认视为高影响改动，验证强度应高于单个页面样式调整。

## 验证要求

- 文档纯文本改动：
  - 至少做内容一致性复核。
  - 如果改到 VitePress 配置、导航、base 路径或文档构建逻辑，运行 `pnpm --filter g03-docs build`。
- `apps/playground` 页面、样式、组件、路由、Vite 配置改动：
  - 优先运行 `pnpm --filter g03-playground lint`
  - 再运行 `pnpm --filter g03-playground typecheck`
  - 涉及构建、路由、发布路径时补 `pnpm --filter g03-playground build`
  - 涉及真实页面交互、导航、刷新、路由切换时，优先补 `pnpm --filter g03-playground test:e2e` 或等效浏览器验证
- `packages/ui` 改动：
  - 优先运行 `pnpm --filter "@g03/ui" lint`
  - 再运行 `pnpm --filter "@g03/ui" typecheck`
  - 再运行 `pnpm --filter "@g03/ui" test`
  - 涉及导出、打包或样式产物时补 `pnpm --filter "@g03/ui" build`
- 根配置、Turbo、CI、共享依赖改动：
  - 优先运行受影响 workspace 的最小验证
  - 若影响面不清晰，运行 `pnpm check`
- 无法验证时，必须明确说明：
  - 没验证什么
  - 为什么没法验证
  - 可能残留什么风险

## Git 分支工作流

`main`（主分支）与 `develop`（开发分支）为长期分支，**不在其上直接做业务开发**。所有改动从最新 `develop` 切出短期分支完成：

- 新功能：`feature/<简短描述>`，例如 `feature/metric-card-trend`。
- Bug 修复：`fix/<简短描述>`，例如 `fix/router-hash-404`。

标准流转，每一步验证通过后才进入下一步：

1. 从最新 `develop` 切出 `feature/*` 或 `fix/*` 分支 → 验证：`git branch` 确认当前分支正确。
2. 在该分支完成改动并按本文件「验证矩阵」自验 → 验证：相关 lint / typecheck / test / build 通过。
3. 自验通过后合并回 `develop` → 验证：合并后在 `develop` 上跑 `pnpm check:affected`（或受影响 workspace 的最小验证）。
4. `develop` 测试通过后再合并到 `main` → 验证：`pnpm check` 通过，确认可发布。

边界：

- 创建、切换短期分支属于可直接执行的低风险操作；但**合并到 `develop` / `main`，以及任何 `push`，必须先经用户明确确认**，遵循下方「Git 与危险操作」。
- 发现自己正处于 `main` 或 `develop` 时，先切出对应 `feature/*` / `fix/*` 分支再改动，不在长期分支上直接提交业务代码。
- 提交信息沿用下方 Conventional Commits 约定。

## Git 与危险操作

- 未经用户明确允许，禁止执行 `git push`、强推、硬重置、改写历史、删分支、批量删除文件等高风险操作。
- 涉及 Git 时，优先使用只读命令确认现场，例如 `git status`、`git diff`、`git log`。
- 不要把“修改代码”擅自扩大成“顺手整理提交历史”或“顺手清理仓库”。
- 如需提交，遵循现有 Conventional Commits 风格，例如 `feat:`、`fix:`、`docs:`、`test:`、`chore:`。

## 最终回复最低要求

发生实际改动后，回复至少说明：

1. 改了什么
2. 影响范围
3. 做了哪些验证
4. 验证结果
5. 哪些内容未验证
6. 未验证原因与风险

如果是新增功能，再补充入口位置、使用方式、依赖条件和常见扩展点。
