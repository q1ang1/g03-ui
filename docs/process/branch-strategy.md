# 分支策略

`G03-UI` 这个仓库建议使用 `GitHub Flow`。

## 推荐规则

- `main` 作为唯一长期分支
- 所有开发走短生命周期分支
- 分支命名统一使用：
  - `feat/*`
  - `fix/*`
  - `docs/*`
  - `chore/*`
  - `refactor/*`

## 为什么不用 Git Flow

这个项目当前阶段更需要轻量、稳定、持续发布的节奏，而不是复杂的 `develop / release / hotfix` 体系。

## main 保护建议

- Require a pull request before merging
- Require status checks before merging
- Require conversation resolution before merging
- Require linear history
- Automatically delete head branches

## 关于“只对外暴露 main”

公开仓库无法真正把其他分支完全隐藏。

最接近这个目标的做法是：

- 只保留 `main` 为长期远程分支
- feature 分支只在开发和 PR 期间存在
- 合并后立刻删除远程分支
