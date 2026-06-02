import { expect, test } from '@playwright/test'

test.describe('g03 playground app shell', () => {
  test('renders the workbench route and can switch to delivery', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', { level: 2, name: '项目总览' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'G03 的本地启动盘已经搭起来了'
      })
    ).toBeVisible()
    await expect(page.getByText('Turborepo 已接入')).toBeVisible()

    await page.getByRole('link', { name: '交付方案 看分支策略、CI/CD 节点和对外发布流程。' }).click()

    await expect(
      page.getByRole('heading', { level: 2, name: '交付方案' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { level: 1, name: '远程接入后就按这套流程跑' })
    ).toBeVisible()
    await expect(page.getByText('main 禁止直接 push')).toBeVisible()
  })
})
