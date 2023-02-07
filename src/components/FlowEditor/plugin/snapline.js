import { Snapline } from '@antv/x6-plugin-snapline';

// 对齐线
export default (graph) => {
  graph.use(
    new Snapline({
      // 是否开启对齐线功能
      enabled: true,
      // 附加样式名，用于定制对齐线样式
      // className: '',
      // 是否显示截断的对齐线 false
      // sharp: false,
      // 改变节点大小时是否触发对齐线 false
      // resizing:false
      // 如果为 true，则在 3s 后清除对齐线，为 false，不会清除，如果为数字(ms)，则在指定时间后清除对齐线 true
      // clean: true,
      // 节点过滤器
      // filter: null,
    }),
  );
};
