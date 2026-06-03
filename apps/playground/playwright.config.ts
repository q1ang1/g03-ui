import { existsSync } from 'node:fs'
import { dirname } from 'node:path'
import { chromium, defineConfig } from '@playwright/test'

/**
 * 浏览器选择策略:
 * 1. 优先用 Playwright 自带的 Chromium —— 它是打过补丁的构建,支持稳定录屏(video)。
 * 2. 自带的没安装 / 不可用时,回退到系统安装的 Chromium / Chrome。
 *
 * 注:这里的「回退」依据是「自带浏览器是否已安装」(静态可判定)。
 * 运行时浏览器「卡住/无响应」无法在配置里自动切换,需要时手动改用系统浏览器。
 */
function resolveBundledChromium(): string | undefined {
  try {
    const path = chromium.executablePath()
    return path && existsSync(path) ? path : undefined
  }
  catch {
    return undefined
  }
}

const systemBrowserCandidates = [
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
]

function resolveSystemBrowser(): string | undefined {
  return systemBrowserCandidates.find((candidate) => existsSync(candidate))
}

const bundledAvailable = Boolean(resolveBundledChromium())
// 仅在回退到系统浏览器时才覆盖 executablePath;用自带浏览器时留空(Playwright 默认即自带)。
const systemExecutablePath = bundledAvailable ? undefined : resolveSystemBrowser()
const usingSystemBrowser = Boolean(systemExecutablePath)

const nodeBinDirectory = dirname(process.execPath)
const shouldSkipWebServer = process.env.PLAYWRIGHT_SKIP_WEBSERVER === 'true'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    // 自带 chromium 可用时用 channel:'chromium',让 headless 也走完整 chromium
    // (避免依赖独立的 chromium_headless_shell);否则回退到系统浏览器(指定 executablePath)。
    ...(bundledAvailable
      ? { channel: 'chromium' }
      : systemExecutablePath
        ? { launchOptions: { executablePath: systemExecutablePath } }
        : {}),
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // 自带 Chromium 支持稳定录屏 → 失败时录屏;回退到系统浏览器时关闭录屏(否则 teardown 死锁)。
    video: usingSystemBrowser ? 'off' : 'retain-on-failure'
  },
  ...(shouldSkipWebServer
    ? {}
    : {
        webServer: {
          command: `PATH="${nodeBinDirectory}:$PATH" pnpm dev -- --strictPort`,
          url: 'http://127.0.0.1:4173',
          reuseExistingServer: !process.env.CI,
          stdout: 'pipe',
          stderr: 'pipe'
        }
      })
})
