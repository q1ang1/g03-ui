# 启动说明

## 目录结构

```text
apps/
  playground/   # 组件库测试台
docs/           # VitePress 文档站
packages/
  ui/      # 共享 UI 组件
```

## 本地启动

```bash
nvm use
pnpm install
pnpm dev:playground
```

启动文档站：

```bash
pnpm dev:docs
```

## 当前包含的工程能力

- `turbo run build`
- `turbo run lint`
- `turbo run typecheck`
- `turbo run test`
- `turbo run lint typecheck test build`
- GitHub Pages 文档部署工作流

## G03 命名体系

- 组件测试台：`g03-playground`
- 文档站：`g03-docs`
- UI 包：`@g03/ui`
- 预留包名：`@g03/hooks`、`@g03/utils`

后续对外安装时统一使用：

```bash
pnpm add @g03/ui
pnpm add @g03/hooks
pnpm add @g03/utils
```

目前仓库里已经落下来的只有 `@g03/ui`，`hooks` 和 `utils` 还没有单独抽包，所以暂时没有创建空包。

## 远程仓库接入建议

```bash
git remote add origin git@github.com:<your-account>/<your-repo>.git
git push -u origin main
```

如果你想先走 PR 流程，也可以在本地切 `feat/*` 分支后再推送。
