import store from "@/store/index";
export function validate() {
  return new Promise((resolve, reject) => {
    const ErrorCollection = [];
    const WarningCollection = [];
    if (!store.state.WorkFlowInfo.Name) {
      ErrorCollection.push("流程的名称不能为空");
    }
    if (!store.state.WorkFlowInfo.Organization_xID) {
      ErrorCollection.push("流程的部门名称不能为空");
    }
    if (!store.state.WorkFlowInfo.DocTypeName) {
      ErrorCollection.push("流程的此单据类型不存在");
    }

    store.state.NodeList.forEach(node => {
      if (store.state.WorkFlowInfo.IsStandard === "Y") {
      // 开始节点 1-只能有出边(至少有一个出边，并且出边的条件有且只能有一个为空)；2-窗口名称不能为空，并且必须存在；
        if (node.NodeType === "Start") {
        // 只能有出边(至少有一个出边，并且出边的条件有且只能有一个为空)
          let startNodeConOutCount = 0;// 记录开始节点的出边个数
          let startNodeConNullPIMOutCount = 0;// 记录开始节点的出边条件为空的个数
          store.state.ConditionList.forEach(con => {
            if (con.NodeTo_XID === node.DBID) {
              ErrorCollection.push("流程的开始节点\"" + node.NodeName + "\"不能有入边" + con.ConditionName);
            }
            if (con.NodeFrom_XID === node.DBID) {
              startNodeConOutCount++;
              if (!con.ConditionPIM) {
                startNodeConNullPIMOutCount++;
              }
            }
          });

          if (startNodeConOutCount < 1) {
            ErrorCollection.push("流程的开始节点\"" + node.NodeName + "\"至少应该有一条出边");
          } else if (startNodeConNullPIMOutCount !== 1) { // 在开始节点具有出边的前提下验证出边条件
            ErrorCollection.push("流程的开始节点\"" + node.NodeName + "\"有且只能有一条出边条件表达式为空");
          }
        }

        // 结束节点 1-只能有入边(至少有一个入边)。-------[***结束节点可以同时有多条条件为空的入边***]
        if (node.NodeType === "End") { // 结束节点
          let endNodeConInCount = 0;// 记录结束节点的入边个数
          store.state.ConditionList.forEach(con => {
            if (con.NodeFrom_XID === node.DBID) {
              ErrorCollection.push("流程的结束节点\"" + node.NodeName + "\"不能有出边" + con.ConditionName);
            }

            if (con.NodeTo_XID === node.DBID) {
              endNodeConInCount++;
            }
          });

          if (endNodeConInCount < 1) {
            ErrorCollection.push("流程的结束节点\"" + node.NodeName + "\"至少应该有一条入边");
          }
        }

        // 中间结点
        if (node.NodeType === "Normal") {
        // 处理名称不能为空 add by lyh 20080719
          if (!node.NodeName) {
            ErrorCollection.push("流程的节点\"" + node.NodeName + "\"的“节点名称”属性不能为空");
          }
          if (!node.ProcessName) {
            ErrorCollection.push("流程的节点\"" + node.ProcessName + "\"的“按钮名称”属性不能为空");
          }

          // 必须既有出边也有入边,并且出边的条件有且只能有一个为空
          let conInCount = 0;// 记录中间节点的入边个数
          let conOutCount = 0;// 记录中间节点的出边个数
          let conOutNullPIMCount = 0;// 记录中间节点的出边PIM表达式为空的个数（空值或空字符串都可以）
          store.state.ConditionList.forEach(con => {
            if (con.NodeFrom_XID === node.DBID) { // 出边
              conOutCount++;
              if (!con.ConditionPIM) {
                conOutNullPIMCount++;
              }
            }

            if (con.NodeTo_XID === node.DBID) { // 入边
              conInCount++;
            }
          });

          if (conInCount < 1) {
            ErrorCollection.push("流程的节点\"" + node.NodeName + "\"至少应该有一条入边");
          }
          if (conOutCount < 1) {
            ErrorCollection.push("流程的节点\"" + node.NodeName + "\"至少应该有一条出边");
          } else if (conOutNullPIMCount !== 1) {
            ErrorCollection.push("流程的节点\"" + node.NodeName + "\"有且只能有一条出边条件表达式为空");
          }
        }
      }

      // 验证扩展用的表达式或处理功能 added by lixin 20100720
      let client = [];
      Object.values(store.state.ClientFunctionList).forEach(list => {
        client = client.concat(list);
      });

      let server = [];
      Object.values(store.state.ServerFunctionList).forEach(list => {
        server = server.concat(list);
      });

      // 验证扩展用的处理功能、存储过程等是否合法
      let HaveExternalFunc = false;
      if (node.ProcessVoucher !== "") {
        const arr = CheckExecutive(client, node.ProcessVoucher);
        if (arr.length > 0) {
          arr.forEach(str => {
            ErrorCollection.push("流程的节点\"" + node.NodeName + "\"指定的流转前客户端功能:" + str + " 不存在");
          });
        }
        HaveExternalFunc = true;
      }
      if (node.ExecutiveAfter !== "") {
        const arr = CheckExecutive(client, node.ExecutiveAfter);
        if (arr.length > 0) {
          arr.forEach(str => {
            ErrorCollection.push("流程的节点\"" + node.NodeName + "\"指定的流转后客户端功能:" + str + " 不存在");
          });
        }
        HaveExternalFunc = true;
      }
      if (node.ProcedureAfter !== "") {
        const arr = CheckExecutive(server, node.ProcedureAfter);
        if (arr.length > 0) {
          arr.forEach(str => {
            ErrorCollection.push("流程的节点\"" + node.NodeName + "\"指定的流转后存储过程:" + str + " 不存在");
          });
        }
        HaveExternalFunc = true;
      }
      if (node.ProcedureAfterBack !== "") {
        const arr = CheckExecutive(server, node.ProcedureAfterBack);
        if (arr.length > 0) {
          arr.forEach(str => {
            ErrorCollection.push("流程的节点\"" + node.NodeName + "\"指定的返回后存储过程:" + str + " 不存在");
          });
        }
        HaveExternalFunc = true;
      }
      if (node.ProcedureBeforeBack !== "") {
        const arr = CheckExecutive(server, node.ProcedureBeforeBack);
        if (arr.length > 0) {
          arr.forEach(str => {
            ErrorCollection.push("流程的节点\"" + node.NodeName + "\"指定的返回前存储过程:" + str + " 不存在");
          });
        }
        HaveExternalFunc = true;
      }
      if (node.ProcedureAfterReject !== "") {
        const arr = CheckExecutive(server, node.ProcedureAfterReject);
        if (arr.length > 0) {
          arr.forEach(str => {
            ErrorCollection.push("流程的节点\"" + node.NodeName + "\"指定的退回后存储过程:" + str + " 不存在");
          });
        }
        HaveExternalFunc = true;
      }
      if (node.ProcedureBeforeReject !== "") {
        const arr = CheckExecutive(server, node.ProcedureBeforeReject);
        if (arr.length > 0) {
          arr.forEach(str => {
            ErrorCollection.push("流程的节点\"" + node.NodeName + "\"指定的退回前存储过程:" + str + " 不存在");
          });
        }
        HaveExternalFunc = true;
      }
      if (node.ProcedureInNode !== "") {
        const arr = CheckExecutive(server, node.ProcedureInNode);
        if (arr.length > 0) {
          arr.forEach(str => {
            ErrorCollection.push("流程的节点\"" + node.NodeName + "\"指定的流转至存储过程:" + str + " 不存在");
          });
        }
        HaveExternalFunc = true;
      }
      if (node.ProcedureBackIn !== "") {
        const arr = CheckExecutive(server, node.ProcedureBackIn);
        if (arr.length > 0) {
          arr.forEach(str => {
            ErrorCollection.push("流程的节点\"" + node.NodeName + "\"指定的退回至存储过程:" + str + " 不存在");
          });
        }
        HaveExternalFunc = true;
      }
      if (node.ProcedureName !== "") {
        const arr = CheckExecutive(server, node.ProcedureName);
        if (arr.length > 0) {
          arr.forEach(str => {
            ErrorCollection.push("流程的节点\"" + node.NodeName + "\"指定的流转前存储过程:" + str + " 不存在");
          });
        }
        HaveExternalFunc = true;
      }
      // 警告信息--外接程序与"是否可取回"属性同时设置时的警告提示 added by lyh 2011-02-24
      if (HaveExternalFunc) {
        if (node.CanReverse === "Y") {
          // 退回至还没有程序
          if (node.ProcedureBackIn === "") { WarningCollection.push("节点\"" + node.NodeName + "\"挂接了外部程序/处理功能，并设置允许返回单据，这样可能会造成未知的问题。"); }
        }
      }
    });

    if (store.state.WorkFlowInfo.IsStandard === "Y") {
    // 验证流程图--任意2节点之间不能存在多余1条(直接)连接线 added by lyh 20090424
      WfNodeConNodeIsLegal(ErrorCollection);
      // 整个审批流程所有的节点不能构成环
      ExistloopOfWorkFlow(ErrorCollection);
    }
    resolve({ ErrorCollection, WarningCollection });
  });
}
function CheckExecutive(list, name, errorinfo) {
  const p = "\n";
  const arr = [];
  const checklist = name.replace(new RegExp(p, "gm"), "&").split("&");
  checklist.forEach(str => {
    if (list.indexOf(str.trim()) === -1) {
      arr.push(str.trim());
    }
  });
  return arr;
}

function WfNodeConNodeIsLegal(ErrorCollection) {
  let wfNodeConNodeIsLegal = true;

  store.state.NodeList.forEach(nodeA => {
    store.state.NodeList.forEach(nodeB => {
      if (GetConListFromNodeAtoNodeB(nodeA, nodeB).Count > 1) {
        ErrorCollection.push("节点-" + nodeA.NodeName + " 到 节点-" + nodeB.NodeName + "最多只允许有一条边");

        wfNodeConNodeIsLegal = false;
      }
    });
  });
  return wfNodeConNodeIsLegal;
}
function GetConListFromNodeAtoNodeB(nodeA, nodeB) {
  const conList = [];
  store.state.ConditionList.forEach(con => {
    const nodeFrom = store.state.NodeList.find(node => node.DBID === con.DBID);

    if (nodeFrom != null && nodeFrom.DBID === nodeA.DBID) {
      const nodeTo = store.state.NodeList.find(node => node.DBID === con.DBID);
      if (nodeTo != null && nodeTo.DBID === nodeB.DBID) {
        conList.push(con);
      }
    }
  });
  return conList;
}
// 验证流程图--判断审批流程中是否存在环--利用拓扑排序进行检测
function ExistloopOfWorkFlow(ErrorCollection) {
  let outIllegalNodesListStr = "";

  const workFlowNodeList = JSON.parse(JSON.stringify(store.state.NodeList));
  const workFlowConditionList = JSON.parse(JSON.stringify(store.state.ConditionList));

  const topologyNodeList = [];
  let NeedDeletedConTemp = [];

  let NeedContinue = true;// 判断是否继续循环检测--如果检测不出还有入度为0的节点，就停止循环检测
  while (NeedContinue) {
    const nodeHt = CalculateNodeInDegree(workFlowNodeList, workFlowConditionList);

    let IncludeNodeOfZeroInDegree = false;// 是否包含入度为0的节点
    for (const de in nodeHt) {
      if (nodeHt[de] === 0) {
        IncludeNodeOfZeroInDegree = true;// 标记

        topologyNodeList.push(de);
        const deIndex = workFlowNodeList.findIndex(item => item.DBID === de);
        workFlowNodeList.splice(deIndex, 1);

        NeedDeletedConTemp = [];//

        workFlowConditionList.forEach(con => {
          // fixed 这里nodeHt key会变成String类型 转成同等类型比较
          if (Number(con.NodeFrom_XID) === Number(de)) {
            NeedDeletedConTemp.push(con);
          }
        });
        NeedDeletedConTemp.forEach(con => {
          const conIndex = workFlowConditionList.findIndex(item => item.DBID === con.DBID);
          workFlowConditionList.splice(conIndex, 1);//
        });
      }
    }

    if (!IncludeNodeOfZeroInDegree) {
      NeedContinue = false;
    }
  }
  workFlowNodeList.forEach(node => {
    outIllegalNodesListStr += outIllegalNodesListStr === "" ? "\"" + node.NodeName + "\"" : "," + "\"" + node.NodeName + "\"";
  });
  if (outIllegalNodesListStr) {
    ErrorCollection.push("流程中不应该存在环状结构! 以下节点:" + outIllegalNodesListStr + "中存在环状结构");
  }
}
function CalculateNodeInDegree(workFlowNodeList, workFlowConditionList) {
  const nodeHt = {};
  workFlowNodeList.forEach(node => {
    let nodeInDegree = 0;// 节点的入度
    workFlowConditionList.forEach(con => {
      if (con.NodeTo_XID === node.DBID) {
        nodeInDegree++;
      }
    });
    nodeHt[node.DBID] = nodeInDegree;
  });
  return nodeHt;
}
