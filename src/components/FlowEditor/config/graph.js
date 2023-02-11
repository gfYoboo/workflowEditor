import { Graph } from '@antv/x6';
import connecting from './connecting.js';
import highlighting from './highlighting.js';

export default (el) => {
  // 初始化画布
  const graphObj = new Graph({
    container: el,
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
    // 键盘快捷键 Keyboard
    // https://antv-x6.gitee.io/zh/docs/tutorial/basic/keyboard/#gatsby-focus-wrapper

    interacting: {
      // 启用键盘事件后，节点由自定义的属性_disableMove来判断是否可移动
      nodeMovable: function (cellView) {
        if (cellView.cell.getData()?._disableMove) {
          return false;
        }
      },
    },
    connecting: { ...connecting },
    highlighting: { ...highlighting },

  });
  return graphObj;
};
