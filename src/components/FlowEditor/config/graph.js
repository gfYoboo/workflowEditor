import { Graph } from '@antv/x6';
import connecting from './connecting.js';
import highlighting from './highlighting.js';
import useHistory from '../plugin/useHistory.js';
import useKeyboard from '../plugin/useKeyboard.js';
import useSelecting from '../plugin/useSelecting.js';
import useStencil from '../plugin/useStencil.js';

export default function createGraph(id, stencilConId, manager) {
  // 初始化画布
  const graphObj = new Graph({
    container: document.getElementById(id),
    width: 911,
    height: 1401,
    background: {
      color: '#ffffff', // 设置画布背景颜色
    },
    snapline: {
      enabled: true, // 对齐线
      sharp: true,
    },
    grid: {
      size: 10,
      visible: true,
      type: 'doubleMesh',
      args: [
        {
          color: '#aaaaaa',
          thickness: 0.5,
        },
        {
          color: '#888888',
          thickness: 1,
          factor: 5,
        },
      ],
    },
    interacting: {
      // 启用键盘事件后，节点由自定义的属性_disableMove来判断是否可移动
      nodeMovable: function (cellView) {
        if (cellView.cell.getData()?._disableMove) {
          return false;
        }
      },
    },
    connecting: connecting(manager),
    highlighting: { ...highlighting },

  });
  const stencil = useStencil(graphObj);
  document.getElementById(stencilConId).appendChild(stencil.container);

  useHistory(graphObj);
  useSelecting(graphObj);
  useKeyboard(graphObj);
  return graphObj;
};
