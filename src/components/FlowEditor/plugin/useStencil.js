import { Stencil } from '@antv/x6-plugin-stencil';

import NormalNode from '../shape/NormalNode';
import Duty from '../shape/Duty';

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
      if (node instanceof Duty) {
        n.size(910, 70);
        return n;
      } else {
        return n;
      }
    },
  });

  const normal = new NormalNode({
  });
  const duty = new Duty({
    width: 80,
    height: 20,
  });
  stencil.load([normal, duty], 'basic');

  return stencil;
};
