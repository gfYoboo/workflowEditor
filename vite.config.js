import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import config from "./config";
// https://vitejs.dev/config/
export default ({ mode }) => ({
  plugins: [vue()],
  base: config[mode].basePath,
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  base: config[mode].basePath, 
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    proxy: {
      '/api': {
        target: "http://127.0.0.1/test/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
