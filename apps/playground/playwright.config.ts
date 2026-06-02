import { existsSync } from 'node:fs'
import { dirname } from 'node:path'
import { defineConfig } from '@playwright/test'

const browserCandidates = [
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
]

function resolveExecutablePath() {
  return browserCandidates.find((candidate) => existsSync(candidate))
}

const executablePath = resolveExecutablePath()
const nodeBinDirectory = dirname(process.execPath)
const shouldSkipWebServer = process.env.PLAYWRIGHT_SKIP_WEBSERVER === 'true'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    ...(executablePath
      ? {
          launchOptions: {
            executablePath
          }
        }
      : {}),
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
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
