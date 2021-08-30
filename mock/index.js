import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

import expression from "./modules/expression"
import workflow from "./modules/workflow"

export function setupProdMockServer() {
    let mocks = [];
    mocks.push(...expression)
    mocks.push(...workflow)
    console.log(mocks);
    createProdMockServer(mocks);
}
// export default [
//     ...workflow, ...expression
// ]