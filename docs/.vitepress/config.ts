import { defineConfig } from 'vitepress'

/**
 * Resolve the docs base path so the public site can keep the admin app at the root entry.
 */
function resolveBasePath() {
  if (process.env.GITHUB_ACTIONS !== 'true') {
    return '/'
  }

  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]
  return repository ? `/${repository}/docs/` : '/docs/'
}

/**
 * Resolve the published admin URL so VitePress treats it as an external link during build.
 */
function resolveAdminLink() {
  const [owner, repository] = process.env.GITHUB_REPOSITORY?.split('/') ?? []

  if (owner && repository) {
    return `https://${owner}.github.io/${repository}/`
  }

  return '/'
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'G03 Docs',
  description: 'G03 的工程文档与启动说明',
  base: resolveBasePath(),
  themeConfig: {
    nav: [
      { text: '组件测试台', link: resolveAdminLink() },
      { text: '开始使用', link: '/guide/getting-started' },
      { text: '配色系统', link: '/design/color-system' },
      { text: '分支策略', link: '/process/branch-strategy' }
    ],
    sidebar: [
      {
        text: '指引',
        items: [
          { text: '启动说明', link: '/guide/getting-started' },
          { text: '分支策略', link: '/process/branch-strategy' }
        ]
      },
      {
        text: '设计',
        items: [
          { text: '配色系统', link: '/design/color-system' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/q1ang1/G03-UI' }
    ]
  }
})
