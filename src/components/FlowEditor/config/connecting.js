export default {
  // 自动吸附
  snap: {
    radius: 20,
  },
  // 不允许连接到画布空白位置的点
  allowBlank: false,
  // 是否允许在相同的起始节点和终止之间创建多条边
  allowMulti: false,
  // 是否允许创建循环连线
  allowLoop: false,
  // 是否允许边链接到节点
  allowNode: false,
  // 是否允许边链接到另一个边
  allowEdge: false,
  // 高亮显示所有可用的连接桩或节点
  highlight: true,
  anchor: 'center',
  connectionPoint: {
    name: 'boundary',
  },

  // 路由将边的路径点 vertices 做进一步转换处理，并在必要时添加额外的点，然后返回处理后的点，默认值为 normal。
  router: {
    name: 'manhattan',
    args: {
      // 路由算法步进步长，其值越小计算量越大。推荐使用画布的网格大小
      step: 5,
      // 设置锚点距离转角的最小距离，和 orth 路由配置一致。20
      padding: 5,
      // 忽略起始或终止节点，忽略后不参与障碍物计算。
      excludeTerminals: ['source' | 'target'],
      // 排除职能带 部门 描述
      excludeShapes: ['duty', 'dutyorg', 'dutydes'],
      // 忽略隐藏的节点，忽略后不参与障碍物计算。
      excludeHiddenNodes: true,
    },
  },
  connector: { name: 'rounded' },

};
