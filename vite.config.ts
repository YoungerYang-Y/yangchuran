import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import Components from "unplugin-vue-components/vite";
import { VueRouterAutoImports } from 'unplugin-vue-router'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    VueRouter({
      dts: "src/typed-router.d.ts",
    }),

    // ⚠️ Vue must be placed after VueRouter()
    vue(),

    Components({ 
      dts: "src/components.d.ts" 
    }),
  
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
      ],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true, // 允许在 <template> 直接使用自动导入的 API
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "/userBusiness": {
        target: "http://192.168.0.104:13191", // 实际请求地址
        changeOrigin: true,
        rewrite: path => path.replace(/^\/userBusiness/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
