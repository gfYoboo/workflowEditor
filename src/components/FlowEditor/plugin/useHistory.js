import { History } from '@antv/x6-plugin-history';

export default (graph) => {
  graph.use(
    new History({
      enabled: true,
      // ignoreAdd 如果为 true，添加添加元素不会被记录到历史记录
      ignoreAdd: false,
      // ignoreRemove 如果为 true，删除元素不会被记录到历史记录
      ignoreRemove: false,
      // ignoreChange 如果为 true，元素属性变化是否被记录到历史记录
      ignoreChange: true,
    }),
  );
};
