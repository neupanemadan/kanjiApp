import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginCompression from 'vite-plugin-compression'
import ViteComponents from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginCompression({
      threshold: 1024 * 10,
    }),
    ViteComponents({
      resolvers: [NaiveUiResolver()],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
