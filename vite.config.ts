import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'src/types/typed-router.d.ts',
      importMode: 'async', // 启用路由懒加载
    }),

    // ⚠️ Vue must be placed after VueRouter()
    vue(),

    Components({
      dts: 'src/types/components.d.ts',
    }),

    AutoImport({
      imports: ['vue', VueRouterAutoImports],
      dts: 'src/types/auto-imports.d.ts',
      vueTemplate: true, // 允许在 <template> 直接使用自动导入的 API
    }),

    Layouts(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          // 将 node_modules 中的依赖分离到 vendor chunk
          if (id.includes('node_modules')) {
            // 将大型库分离到独立的 chunk
            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vue-vendor'
            }
            if (id.includes('axios')) {
              return 'axios-vendor'
            }
            if (id.includes('@vueuse')) {
              return 'vueuse-vendor'
            }
            // 其他 node_modules 依赖
            return 'vendor'
          }
        },
      },
    },
    // 启用压缩
    minify: 'esbuild',
    // 启用 source map（生产环境可选）
    sourcemap: false,
    // 优化 chunk 大小警告阈值
    chunkSizeWarningLimit: 1000,
  },
})
