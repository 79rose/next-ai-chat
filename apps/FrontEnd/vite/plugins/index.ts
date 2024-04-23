import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

import { createAutoImport } from './auto-import'

export function createVitePlugins() {
  const vitePlugins: Array<PluginOption | PluginOption[]> = [
    createAutoImport(),
    vue(),
    UnoCSS({
      configFile: 'uno.config.ts',
    }),
  ]
  return vitePlugins
}
