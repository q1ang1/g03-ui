import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

/**
 * Resolve the playground app base path so GitHub Pages opens the showcase shell by default.
 */
function resolveBasePath() {
  if (process.env.GITHUB_ACTIONS !== 'true') {
    return '/'
  }

  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]
  return repository ? `/${repository}/` : '/'
}

export default defineConfig({
  base: resolveBasePath(),
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS({
      configFile: fileURLToPath(new URL('../../packages/theme/uno.config.ts', import.meta.url))
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '127.0.0.1',
    port: 4173
  }
})
