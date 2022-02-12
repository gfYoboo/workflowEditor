
export default (graph) => {
  graph.addNode({
    shape: 'shapeimg',
    x: 0,
    y: 0,
  });
  graph.addNode({
    shape: 'shapetext',
    x: 80,
    y: 0,
    width: 830,
    height: 40,
    label: '内控流程体系-业务流程图',
    attrs: {
      label: {
        fontSize: 15,
        fontWeight: 'bold',
      },
    },

  });
  graph.addNode({
    shape: 'shapetext',
    id: 'head_flowcode',
    x: 80,
    y: 40,
    width: 415,
    height: 40,
    label: '流程编号:',
    attrs: {
      label: {
        refX: '0',
        refX2: '10',
        textAnchor: 'start',
      },
    },
  });
  graph.addNode({
    shape: 'shapetext',
    id: 'head_flowname',
    x: 495,
    y: 40,
    width: 415,
    height: 40,
    label: '流程名称:',
    attrs: {
      label: {
        refX: '0',
        refX2: '10',
        textAnchor: 'start',
      },
    },
  });

  graph.addNode({
    x: 0,
    y: 80,
    width: 910,
    height: 70,
    shape: 'duty',
    attrs: {
      body: {
        fill: '#bfbfbf',
      },
    },
  });
  graph.addNode({
    shape: 'shapetext',
    x: 0,
    y: 80,
    width: 260,
    height: 70,
    label: '部门',
    attrs: {
      body: {
        fill: 'none',
      },
      label: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
  });
  graph.addNode({
    shape: 'shapetext',
    x: 260,
    y: 80,
    width: 370,
    height: 70,
    label: '流程图',
    attrs: {
      body: {
        fill: 'none',
      },
      label: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
  });
  graph.addNode({
    shape: 'shapetext',
    x: 630,
    y: 80,
    width: 280,
    height: 70,
    label: '岗位职责',
    attrs: {
      body: {
        fill: 'none',
      },
      label: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
  });
};
