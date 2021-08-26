export default (graph) => {
  //新建流程自动创建开始 结束节点
  graph.addNode({
    x: 0,
    y: 140,
    width: 910,
    height: 70,
    shape: "duty",
  });

  graph.addNode({
    x: 0,
    y: 200,
    width: 910,
    height: 70,
    shape: "duty",
  });
  const source = graph.addNode({
    x: 410,
    y: 165,
    shape: "start",
  });

  const target = graph.addNode({
    x: 410,
    y: 235,
    shape: "end",
  });
}