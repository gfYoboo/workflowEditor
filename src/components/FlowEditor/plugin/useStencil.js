import { Stencil } from '@antv/x6-plugin-stencil';

export default (graph) => {
  // #region 初始化 stencil
  const stencil = new Stencil({
    target: graph,
    stencilGraphHeight: 400,
    stencilGraphWidth: 100,
    layoutOptions: { columns: 1, columnWidth: 100, dx: 0, dy: 0 },

    collapsable: false,
    groups: [
      {
        title: '基本图形',
        name: 'basic',
        collapsable: false,
      },
    ],

    getDragNode: (node) => {
      const n = node.clone();
      if (node.shape === 'duty') {
        n.size(910, 70);
        return n;
      } else {
        return n;
      }
    },
  });

  const normal = graph.createNode({ shape: 'normal' });
  const duty = graph.createNode({
    shape: 'duty',
    width: 80,
    height: 20,
  });

  stencil.load([normal, duty], 'basic');

  return stencil;
};
