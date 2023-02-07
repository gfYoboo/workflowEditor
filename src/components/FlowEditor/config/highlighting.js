export default {
  // 当链接桩可以被链接时，在链接桩外围渲染一个 2px 宽的红色矩形框
  magnetAvailable: {
    name: 'stroke',
    args: {
      padding: 4,
      attrs: {
        'stroke-width': 4,
        stroke: 'skyblue',
      },
    },
  },
  // 连线过程中，自动吸附到链接桩时被使用
  magnetAdsorbed: {
    name: 'stroke',
    args: {
      padding: 4,
      attrs: {
        'stroke-width': 8,
        stroke: 'skyblue',
      },
    },
  },
};
