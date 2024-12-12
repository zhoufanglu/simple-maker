import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { ConfigEnv } from 'vite'
import * as path from 'path'
import DefineOptions from 'unplugin-vue-define-options/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd()) // 获取.env文件里定义的环境变量
  return defineConfig({
    base: './',
    plugins: [
      vue({ script: { defineModel: true } }),
      DefineOptions(),
      vueSetupExtend(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/auto-import.d.ts', // 生成 `auto-import.d.ts` 全局声明
        dirs: ['src/store/**/index.ts', 'src/tools'],
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
        ],
        vueTemplate: true, // 是否在 vue 模板中自动导入
        eslintrc: {
          enabled: true, // 会在项目根目录自动生成.eslintrc-auto-import.json
        },
      }),
      Components({
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        dirs: ['src/components', 'src/**/components'],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/index.scss";',
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 4444,
    },
    build: {
      sourcemap: false,
      outDir: env.VITE_OUTPUT_DIR,
      assetsDir: 'assets',
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
    },
  })
}
