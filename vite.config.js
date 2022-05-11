import { defineConfig, loadEnv } from 'vite';
import createVitePlugins from './vite/plugins';

import { resolve } from 'path';
import config from './config';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: config[mode].basePath,
    plugins: createVitePlugins(env, mode, command === 'build'),
    resolve: {
      alias: {
        '~': resolve(__dirname, './'),
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: {
            vue: ['vue'],
            // axios: ['axios'],
            x6: ['@antv/x6'],
            'element-plus': ['element-plus'],
            'crypto-js': ['crypto-js'],
            'plus-icons-vue': ['@element-plus/icons-vue'],
          },
        },

      },
      // manualChunks: {
      //   dir: 'dist',
      //   external: ['axios', 'vue', '@antv/x6', 'element-plus', 'lodash'],
      // },
    },
    server: {
      cors: true, // 默认启用并允许任何源
      open: true, // 在服务器启动时自动在浏览器中打开应用程序
      proxy: {
        '/dev-api': {
          target: 'http://127.0.0.1/test/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/dev-api/, ''),
        },
      },
    },
  };
});
