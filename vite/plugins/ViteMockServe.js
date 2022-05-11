import { viteMockServe } from 'vite-plugin-mock';

export default function ViteMockServe() {
  return viteMockServe({
    supportTs: false,
    mockPath: 'mock',
    localEnabled: true,
    prodEnabled: true,
    injectCode: `
    import { setupProdMockServer } from '../mock/index';
    setupProdMockServer();
    `,
  });
}
