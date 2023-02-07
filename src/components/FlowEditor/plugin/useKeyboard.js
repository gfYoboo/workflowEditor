import { Keyboard } from '@antv/x6-plugin-keyboard';

export default (graph) => {
  graph.use(
    new Keyboard({
      enabled: true,
    }),
  );
};
