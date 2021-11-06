import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";

import path from "path";
import config from "./config";
// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const enableMock = mode === "demo";
  return {
    plugins: [
      vue(),
      viteMockServe({
        supportTs: false,
        mockPath: "mock",
        localEnabled: enableMock,
        prodEnabled: true,
        injectCode: `
        import { setupProdMockServer } from '../mock/index';
  
        setupProdMockServer();
        `,
      }),
    ],
    base: config[mode].basePath,
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./"),
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      cors: true, // 默认启用并允许任何源
      open: true, // 在服务器启动时自动在浏览器中打开应用程序
      proxy: {
        "/api": {
          target: "http://127.0.0.1/test/",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ""),
        },
      },
    },
  };
};
