# G03 Docs

G03 的文档站入口，线上会发布在 `/docs/`。

这个仓库当前已经具备：

- `Turborepo` monorepo 结构
- `apps/playground` 组件库测试界面
- `packages/ui` 共享 UI 包
- `docs` 文档站
- GitHub Actions 的 CI 与 Pages 部署工作流

你可以先在本地把界面和结构跑起来，再去 GitHub 新建远程仓库并连接。
现在默认访问的就是组件测试台首页：[https://q1ang1.github.io/G03-UI/](https://q1ang1.github.io/G03-UI/)
文档入口放在这里：[https://q1ang1.github.io/G03-UI/docs/](https://q1ang1.github.io/G03-UI/docs/)

## 现在最适合做的事

1. 建 GitHub 仓库并连接 `origin`
2. 打开 GitHub Pages，Source 选择 `GitHub Actions`
3. 为 `main` 添加 branch protection
4. 开始用 `feat/*` 分支推进真实业务页面
