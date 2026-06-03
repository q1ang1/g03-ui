import { defineConfig, presetWind3 } from 'unocss'
import { g03Preset } from './src/preset/unocss'

// playground 通过 UnoCSS({ configFile }) 引用本配置。
export default defineConfig({
  presets: [
    presetWind3(),
    g03Preset(),
  ],
})
