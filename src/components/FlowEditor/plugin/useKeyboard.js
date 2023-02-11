import { Keyboard } from '@antv/x6-plugin-keyboard';

export default (graph) => {
  graph.use(
    new Keyboard({
      enabled: true,
      global: true,
    }),
  );

  // 删除
  graph.bindKey(['delete', 'backspace'], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      cells.forEach(item => {
        if (item.shape === 'normal' || item.shape === 'duty' || item.shape === 'edge') {
          graph.removeCell(item);
        }
      });
    }
    return false;
  }, 'keydown');

  graph.bindKey(['left'], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      cells.forEach(item => {
        const px = item.position().x;
        const py = item.position().y;
        item.position(px - 1, py);
      });
    }
    return false;
  }, 'keydown');

  graph.bindKey(['right'], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      cells.forEach(item => {
        const px = item.position().x;
        const py = item.position().y;
        item.position(px + 1, py);
      });
    }
    return false;
  }, 'keydown');
  graph.bindKey(['up'], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      cells.forEach(item => {
        const px = item.position().x;
        const py = item.position().y;
        item.position(px, py - 1);
      });
    }
    return false;
  }, 'keydown');
  graph.bindKey(['down'], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      cells.forEach(item => {
        const px = item.position().x;
        const py = item.position().y;
        item.position(px, py + 1);
      });
    }
    return false;
  }, 'keydown');
};
