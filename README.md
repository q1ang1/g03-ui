# G03

一个面向 Vue 3 中后台场景的 G03 开源仓库起步盘。

当前版本先解决三件事：

- 用 `Turborepo` 把 monorepo 结构搭起来
- 用 `apps/playground` 提供一个组件库测试界面
- 用 `docs` 和 GitHub Actions 把文档站与流程打通

## 目录

```text
apps/
  playground/
docs/
packages/
  ui/
```

## 本地开发

```bash
nvm use
pnpm install
pnpm dev:playground
pnpm dev:docs
```

## 可用脚本

```bash
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm check
```

## 命名统一

- 组件测试台：`g03-playground`
- 文档站：`g03-docs`
- 组件包：`@g03/ui`
- 预留包名：`@g03/hooks`、`@g03/utils`

后续抽离发布时，对外安装名统一为：

```bash
pnpm add @g03/ui
pnpm add @g03/hooks
pnpm add @g03/utils
```

## 分支方案

建议使用 `GitHub Flow`：

- `main` 为唯一长期分支
- 日常开发使用 `feat/*`、`fix/*`、`docs/*` 等短分支
- 合并后删除远程分支

更多说明见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## GitHub 接入步骤

1. 在 GitHub 创建仓库
2. 在仓库设置里把 Pages Source 设为 `GitHub Actions`
3. 添加远程仓库

```bash
git remote add origin git@github.com:<your-account>/<your-repo>.git
git push -u origin main
```

4. 为 `main` 配置 branch protection
5. 后续所有改动都通过 PR 合并

## 当前状态

仓库已经统一到 G03 命名体系。  
后续如果你继续新增 hooks / utils 包，直接沿用 `@g03/*` 即可。
