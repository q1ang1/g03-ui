import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
  plugins: [vue()],
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
