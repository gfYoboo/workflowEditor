export default (graph, manager) => {
  graph.on('node:added', ({ cell, index, options }) => {
    if (cell.shape === 'start' || cell.shape === 'normal' || cell.shape === 'end') {
      if (cell.getData().DBID === '') {
        const nodeData = manager.CreateNewNodeData(cell.shape);
        cell.setData(nodeData);
      }
    } else if (cell.shape === 'duty') {
      manager.addDutyCellId(cell.id);
      if (cell.getData().DBID === '') {
        const dutyData = manager.CreateNewDutyData();
        cell.setData(dutyData);
      }
      cell.setZIndex(0);
      // 职能带自动吸附
      const nodes = graph.model.getNodes();
      let maxy = 0;
      nodes.forEach((node) => {
        if (node.shape === 'duty' && cell.id !== node.id) {
          if (maxy < node.position().y) {
            maxy = node.position().y;
          }
        }
      });
      cell.position(0, maxy + 70);

      // 创建2个text
      const text1 = graph.addNode({
        shape: 'dutyorg',
        x: 0,
        y: maxy + 70,
        label: cell.getData().NoteName,
      });
      text1.setZIndex(1);
      cell.addChild(text1);

      const text2 = graph.addNode({
        shape: 'dutydes',
        x: 630,
        y: maxy + 70,
        label: cell.getData().Des,
      });
      text2.setZIndex(1);
      cell.addChild(text2);
    }
  });

  // 删除节点
  // graph.on('node:removed', ({ cell, index, options }) => {
  //   if (cell.shape === 'start' || cell.shape === 'normal' || cell.shape === 'end') {
  //     const dbId = cell.getData().DBID;
  //     manager.DeleteNode(dbId);
  //   }
  //   if (cell.shape === 'duty') {
  //     // const dbId = cell.getData().DBID;
  //     // manager.DeleteDuty(dbId);
  //   }
  // });
  // 删除边
  // graph.on('edge:removed', ({ cell, index, options }) => {
  //   const dbId = cell.getData()?.DBID;
  //   dbId && manager.DeleteCond(dbId);
  // });
  // 边连接桩变更 新增边还是修改边
  graph.on('edge:connected', ({ isNew, edge }) => {
    if (isNew) {
      const edgeData = manager.CreateNewConditionData();
      edge.setData(edgeData);
    } else {
      // const dbid = edge.getData().DBID;
      // const edgeData = manager.UpdateCond(dbid, sourceId, targetId, edge.source.port, edge.target.port);
      // edge.updateData(edgeData);
    }
  });

  // 选中的节点的是否可移动不受初始化时的逻辑控制
  graph.on('node:selected', ({ cell, node, options }) => {
    if (cell.getData()?._disableMove) {
      graph.disableSelectionMovable();
    } else {
      graph.enableSelectionMovable();
    }
  });
  graph.on('node:click', ({ node }) => {
    manager.ShowNodeQuickInfo(node.getData());
  });
  graph.on('edge:click', ({ edge }) => {
    manager.ShowEdgeQuickInfo(edge.getData());
  });
  graph.on('blank:click', () => {
    manager.ShowWorkFlowQuickInfo();
  });

  // 双击进入属性编辑页面
  graph.on('cell:dblclick', ({ e, x, y, cell, view }) => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      const cell = cells[0];
      if (cell.shape === 'dutyorg') {
        manager.states.ShowNoteSelectListDlg = true;
      } else if (cell.shape === 'dutydes') {
        manager.states.ShowDesDlg = true;
      } else if (cell.shape === 'normal' ||
        cell.shape === 'start' ||
        cell.shape === 'end') {
        manager.EditNode(cell);
      } else if (cell.shape === 'edge') {
        manager.EditEdge(cell);
      }
    }
  });

  graph.on('node:mouseenter', ({ node }) => {
    // 职能带添加删除按钮
    if (node.shape === 'duty') {
      const nodes = graph.model.getNodes();
      let temY = 0;
      let temDuty = null;
      let minY = 1000;

      nodes.forEach(item => {
        if (item.shape === 'duty') {
          if (item.position().y > temY) {
            temY = item.position().y;
            if (temY < minY) {
              minY = temY;
            }
            temDuty = item;
          }
        }
      });

      const tools = [];

      if (temDuty.id === node.id) {
        tools.push({
          name: 'button-remove',
          args: { x: 620, y: 10 },
        });
      }
      // 最上方的标题 和第一个职能带没有向上
      if (node.position().y !== minY && node.position().y !== minY + 70) {
        tools.push({
          name: 'button',
          args: {
            markup: [
              {
                tagName: 'circle',
                selector: 'button',
                attrs: {
                  r: 10,
                  stroke: '#fe854f',
                  strokeWidth: 2,
                  fill: 'white',
                  cursor: 'pointer',
                },
              },
              {
                tagName: 'text',
                textContent: 'UP',
                selector: 'icon',
                attrs: {
                  fill: '#fe854f',
                  fontSize: 8,
                  textAnchor: 'middle',
                  pointerEvents: 'none',
                  y: '0.3em',
                },
              },
            ],
            x: 620,
            y: 60,
            onClick: ({ cell }) => {
              const shapY = cell.position().y;
              const nodes = graph.model.getNodes();

              let flagDuty = false;
              for (let i = 0; i < nodes.length; i++) {
                const item = nodes[i];
                if (item.shape === 'duty' && !flagDuty) {
                  // 交换职能带的位置
                  if (shapY === item.position().y + 70) {
                    item.position(item.position().x, shapY, { deep: true });
                    cell.position(cell.position().x, shapY - 70, { deep: true });
                    flagDuty = true;
                  }
                }
                if (item.shape === 'start' || item.shape === 'normal' || item.shape === 'end') {
                  // 当前职能带上的节点上移
                  const nodeY1 = item.position().y;
                  if (nodeY1 > shapY && nodeY1 < shapY + 70) {
                    item.position(item.position().x, nodeY1 - 70);
                  }
                  // 职能带上的节点依次下移
                  if (nodeY1 < shapY && nodeY1 > shapY - 70) {
                    item.position(item.position().x, nodeY1 + 70);
                  }
                }
              }
              cell.removeTools();
            },
          },
        });
      }
      // tools.push({
      //   name: 'button',
      //   args: {
      //     markup: [
      //       {
      //         tagName: 'circle',
      //         selector: 'button',
      //         attrs: {
      //           r: 10,
      //           stroke: '#fe854f',
      //           strokeWidth: 2,
      //           fill: 'white',
      //           cursor: 'pointer',
      //         },
      //       },
      //       {
      //         tagName: 'text',
      //         textContent: 'Down',
      //         selector: 'icon',
      //         attrs: {
      //           fill: '#fe854f',
      //           fontSize: 8,
      //           textAnchor: 'middle',
      //           pointerEvents: 'none',
      //           y: '0.3em',
      //         },
      //       },
      //     ],
      //     x: 620,
      //     y: 50,
      //     onClick: ({ cell }) => {
      //       const shapY = cell.position().y;
      //       const nodes = graph.model.getNodes();

      //       let flagDuty = false;
      //       for (let i = 0; i < nodes.length; i++) {
      //         const item = nodes[i];
      //         if (item.shape === 'duty' && !flagDuty) {
      //           // 交换职能带的位置
      //           if (shapY === item.position().y - 70) {
      //             item.position(item.position().x, shapY, { deep: true });
      //             cell.position(cell.position().x, shapY + 70, { deep: true });
      //             flagDuty = true;
      //           }
      //         }
      //         if (item.shape === 'start' || item.shape === 'normal' || item.shape === 'end') {
      //           // 当前职能带上的节点下移
      //           const nodeY1 = item.position().y;
      //           if (nodeY1 > shapY && nodeY1 < shapY + 70) {
      //             item.position(item.position().x, nodeY1 - 70);
      //           }
      //           // 下个职能带上的节点上移
      //           if (nodeY1 < shapY && nodeY1 > shapY - 70) {
      //             item.position(item.position().x, nodeY1 + 70);
      //           }
      //         }
      //       }
      //     },
      //   },
      // });

      node.addTools(tools,
        'onhover',
      );
    }
  });

  graph.on('node:mouseleave', ({ node }) => {
    if (node.hasTools('onhover')) {
      node.removeTools();
    }
  });
  // 可以移动连接的节点
  graph.on('edge:mouseenter', ({ cell }) => {
    cell.addTools([
      {
        name: 'source-arrowhead',
        args: {
          tagName: 'circle',
          attrs: {
            r: 4,
            stroke: '#fe854f',
            'stroke-width': 2,
            fill: 'red',
            cursor: 'pointer',
          },
        },
      },
      {
        name: 'target-arrowhead',
        args: {
          attrs: {
            d: 'M -8 0 -12 -6 4 0 -12 6 Z', // 嗯,我是天才
            'stroke-width': 1,
            fill: 'red',
          },
        },
      },
      // {
      //   name: 'segments',
      //   args: {
      //     snapRadius: 20,
      //     attrs: {
      //       fill: '#444',
      //     },
      //   },
      // },
    ]);
  });
  graph.on('edge:mouseleave', ({ cell }) => {
    cell.removeTools();
  });

  // 选择节点 后显示属性按钮
  graph.on('selection:changed', ({ added, removed, selected }) => {
    added.forEach((cell) => {
      if (cell.isNode()) {
        cell.attr('body', {
          stroke: '#ffa940',
          strokeWidth: 2,
        });
      } else {
        cell.toFront();
        cell.attr('line/stroke', '#ffa940');
      }
    });
    removed.forEach((cell) => {
      if (cell.isNode()) {
        cell.attr('body', {
          stroke: '#7F7F7F',
          strokeWidth: 1,
        });
      } else {
        cell.attr('line/stroke', '#000000');
      }
    });
  });
  // 连接桩的显示与隐藏
  // const changePortsVisible = (visible) => {
  //     const ports = container.querySelectorAll(
  //         '.x6-port-body',
  //     )
  //     for (let i = 0, len = ports.length; i < len; i = i + 1) {
  //         ports[i].style.visibility = visible ? 'visible' : 'hidden'
  //     }
  // }
  // graph.on('node:mouseenter', () => {
  //     changePortsVisible(true)
  // })

  // graph.on('node:mouseleave', () => {
  //     changePortsVisible(false)
  // })
};
