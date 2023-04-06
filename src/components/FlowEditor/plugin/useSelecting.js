import { Selection } from '@antv/x6-plugin-selection';

// 框选 不好用  太多bug
export default (graph) => {
  graph.use(
    new Selection({
      // 是否开启框选功能
      enabled: true,
      movable: true,
      // 附加样式名，用于定制对齐线样式
      // className: '',
      // 是否启用点击多选，启用后按住 ctrl 或 command 键点击节点实现多选 true
      multiple: false,
      // 是否显示节点的选择框 false
      showNodeSelectionBox: false,
      // 是否显示边的选择框 false
      showEdgeSelectionBox: false,
      // 节点过滤器 可被选中 与上个版本不一样
      filter: ['start', 'end', 'normal', 'edge', 'dutyorg', 'dutydes'],
    }),
  );
};
