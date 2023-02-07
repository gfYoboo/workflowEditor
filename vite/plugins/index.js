import vue from '@vitejs/plugin-vue';
// 帮助寻找node_modules里的包
// import nodeResolve from 'rollup-plugin-node-resolve';
import ViteMockServe from './ViteMockServe';
// 压缩包
import uglify from 'rollup-plugin-uglify';
// 配置Rollup支持CommonJS规范用以识别CommonJS规范的依赖
// import commonjs from 'rollup-plugin-commonjs';
import createAutoImport from './auto-import.js';

export default function createVitePlugins(viteEnv, mode, isBuild = false) {
  const vitePlugins = [vue()];
  vitePlugins.push(createAutoImport());

  // vitePlugins.push(nodeResolve());
  // vitePlugins.push(commonjs());
  if (mode === 'demo') {
    vitePlugins.push(ViteMockServe());
  }
  if (viteEnv === 'production') {
    vitePlugins.push(
      uglify({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    );
  }

  return vitePlugins;
}
