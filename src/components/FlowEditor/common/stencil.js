import { Addon } from '@antv/x6';

import NormalNode from '../shape/NormalNode';
import Duty from '../shape/Duty';

export default function (graph) {
  const stencil = new Addon.Stencil({
    target: graph,
    stencilGraphHeight: 400,
    stencilGraphWidth: 100,
    layoutOptions: { columns: 1, columnWidth: 100, dx: 0, dy: 0 },
    groups: [
      {
        name: '基本图形',
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

  document.getElementById('stencilContainer').appendChild(stencil.container);
  stencil.load([normal, duty], '基本图形');
}
