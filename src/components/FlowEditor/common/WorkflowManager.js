import { GetBasic, GetWorkFlowInfo, SaveWorkFlow } from '@/api/workflow';
import { ElMessage } from 'element-plus';

export default class WorkflowManager {
  constructor() {
    this.workflowId = '';

    this.CurrentCell = '';

    this.DocTypeAndWindow = '';
    this.ClientFunctionList = '';
    this.ServerFunctionList = '';
    this.NodeUserDesList = '';

    this.NoteList = [];
    this.CompanyList = '';
    this.RelationList = '';

    this.WorkFlowInfo = {};
    this.WorkFlowNoteList = [];
    this.NodeList = [];
    this.ConditionList = [];
    this.CurrentSheetWindowName = '';

    this.quickNodeInfo = {};
    this.quickEdgeInfo = {};
    this.quickWorkFlowInfo = {};

    this.states = {
      CurrentNextId: -10000,

      ShowDesDlg: false,
      ShowValidateDlg: false,
      ShowNodeUserDesDlg: false,
      QuickShowType: 'flow',

    };
    this.expression = {
      ShowExpDlg: false,
      ExpType: '',
      ResultType: '',
      Expression: '',
      PsmExpression: '',
      ParameterXml: '',
      callback: null,

    };
    this.edge = {
      edgeInfo: {},
      ShowEdgeDlg: false,
    };
    this.node = {
      ShowNodeInfoDlg: false,
      nodeInfo: {
        CheckFactorList: [],
        CheckWindowFactorList: [],
      },
    };

    this.ErrorCollection = [];
    this.WarningCollection = [];
  }

  getNextId() {
    return this.states.CurrentNextId++;
  }

  async GetBasic() {
    const res = await GetBasic();
    this.SetBasic(res);
    if (res.ErrorInfo) {
      ElMessage({
        message: res.ErrorInfo,
        type: 'error',
      });
    }
  }

  SetBasic(data) {
    this.DocTypeAndWindow = data.DocTypeAndWindow;
    this.ClientFunctionList = data.ClientFuntionList;
    this.ServerFunctionList = data.ServerFunctionList;
    const NodeUserDesList = data.NodeUserDesList;
    this.NodeUserDesList = NodeUserDesList.sort((a, b) => { return a.localeCompare(b, 'zh'); });

    this.NoteList = data.WorkFlowNoteList;
    this.CompanyList = data.CompanyList;
    const RelationList = data.WorkFlowRelationList;
    this.RelationList = RelationList.sort((a, b) => {
      return a.name.localeCompare(b.name, 'zh');
    });
  }

  CreateNewWorkFlowInfo() {
    this.SetWorkFlowInfo({
      WorkFlowInfo: {
        DBID: '',
        IsActive: 'Y',
        IsStandard: 'Y',
        IsSubWorkFlow: 'N',
      },
      WorkFlowNoteList: [],
      NodeList: [],
      ConditionList: [],
    });
  }

  CreateNewNodeData(shape) {
    const opt = {
      DBID: this.getNextId(),
      AllowEditDocument: 'N',
      AllowPrintDocument: 'N',
      AllowUnCheck: 'N',
      AppointCheckerExpression: '',
      AppointUser: '',
      AppointUserID: '',
      AutoCheckOwnDoc: 'N',
      CanAutoCheck: 'N',
      CanBackIn: 'N',
      CanReverse: 'N',
      CanSelectBackToNode: 'N',
      CheckFactorList: [],
      CheckWindowFactorList: [],
      DutyDes: '',
      EditAttacher: 'N',
      ExecutiveAfter: '',
      GroupIndex: '1',
      IsAssign: 'N',
      IsAutoNode: 'N',
      IsNeedCA: 'N',
      MaxStayTime: '',
      MustHaveAttachment: 'N',
      NodeCode: '',
      NodeUserList: [],
      NodeX: '',
      NodeY: '',
      OnlyDepartmentManager: 'N',
      ProcedureAfter: '',
      ProcedureAfterBack: '',
      ProcedureAfterReject: '',
      ProcedureBackIn: '',
      ProcedureBeforeBack: '',
      ProcedureBeforeReject: '',
      ProcedureInNode: '',
      ProcedureName: '',
      ProcessVoucher: '',
      SubWorkFlowID: '',
      SubWorkFlowName: '',
      TicketQty: '0',
      TitleDescription: '',
    };
    if (shape === 'start') {
      opt.DocStatus = '制单';
      opt.NodeName = '开 始';
      opt.NodeType = 'Start';
      opt.ProcessName = '提交';
      opt.CanBackIn = 'Y';
    } else if (shape === 'end') {
      opt.DocStatus = '审批结束';
      opt.NodeName = '结 束';
      opt.NodeType = 'End';
      opt.ProcessName = '';
    } else {
      opt.DocStatus = '待审批';
      opt.NodeName = '节 点';
      opt.NodeType = 'Normal';
      opt.ProcessName = '审批';
      opt.AllowUnCheck = 'Y';
    }
    return opt;
  }

  CreateNewConditionData() {
    const opt = {
      DBID: this.getNextId(),
      ConditionPIM: '',
      ConditionPSM: '',
      Description: '',
      NodeFrom_XID: '',
      NodeTo_XID: '',
      Parameter: '',
      PointList: '',
    };
    return opt;
  }

  CreateNewDutyData() {
    const data = {
      DBID: this.getNextId(),
      NoteName: '',
      NoteName_xID: '',
      DispX: '',
      DispY: '',
      Des: '',
    };
    return data;
  }

  async GetWorkFlowInfo(workflowId) {
    this.workflowId = workflowId;
    const res = await GetWorkFlowInfo(workflowId);
    this.SetWorkFlowInfo(res);
    this.SetSheetWindowName();
  }

  SetWorkFlowInfo(data) {
    this.WorkFlowInfo = data.WorkFlowInfo;
    this.WorkFlowNoteList = data.WorkFlowNoteList;
    this.NodeList = data.NodeList;
    this.ConditionList = data.ConditionList;
  }

  UpdateWorkFlowInfo(data) {
    this.WorkFlowInfo = data;
    this.SetSheetWindowName();
  }

  SetSheetWindowName() {
    if (this.WorkFlowInfo.DocTypeName) {
      this.CurrentSheetWindowName = this.DocTypeAndWindow[this.WorkFlowInfo.DocTypeName];
      if (!this.CurrentSheetWindowName) {
        alert('CurrentSheetWindowName 根据单据类型 ' + this.WorkFlowInfo.DocTypeName + ' 未找到对应的表单');
        console.log('state.DocTypeAndWindow', this.DocTypeAndWindow);
        console.log('state.WorkFlowInfo.DocTypeName', this.WorkFlowInfo.DocTypeName);
      }
    } else {
      console.log('按理论是不会进入这里的', this.WorkFlowInfo.DocTypeName);
    }
  }

  SetWorkFlowNote(data) {
    this.NodeList = data;
  }

  // 验证流程图相关
  Validate(WorkFlowNodeList, WorkFlowConditionList) {
    this.ErrorCollection = [];
    this.WarningCollection = [];

    if (!this.WorkFlowInfo.Name) {
      this.ErrorCollection.push('流程的名称不能为空');
    }
    if (!this.WorkFlowInfo.Organization_xID) {
      this.ErrorCollection.push('流程的部门名称不能为空');
    }
    if (!this.WorkFlowInfo.DocTypeName) {
      this.ErrorCollection.push('流程的此单据类型不存在');
    }

    WorkFlowNodeList.forEach(node => {
      if (this.WorkFlowInfo.IsStandard === 'Y') {
        // 开始节点 1-只能有出边(至少有一个出边，并且出边的条件有且只能有一个为空)；2-窗口名称不能为空，并且必须存在；
        if (node.NodeType === 'Start') {
          // 只能有出边(至少有一个出边，并且出边的条件有且只能有一个为空)
          let startNodeConOutCount = 0;// 记录开始节点的出边个数
          let startNodeConNullPIMOutCount = 0;// 记录开始节点的出边条件为空的个数
          WorkFlowConditionList.forEach(con => {
            if (con.NodeTo_XID === node.DBID) {
              this.ErrorCollection.push('流程的开始节点"' + node.NodeName + '"不能有入边' + con.ConditionName);
            }
            if (con.NodeFrom_XID === node.DBID) {
              startNodeConOutCount++;
              if (!con.ConditionPIM) {
                startNodeConNullPIMOutCount++;
              }
            }
          });

          if (startNodeConOutCount < 1) {
            this.ErrorCollection.push('流程的开始节点"' + node.NodeName + '"至少应该有一条出边');
          } else if (startNodeConNullPIMOutCount !== 1) { // 在开始节点具有出边的前提下验证出边条件
            this.ErrorCollection.push('流程的开始节点"' + node.NodeName + '"有且只能有一条出边条件表达式为空');
          }
        }

        // 结束节点 1-只能有入边(至少有一个入边)。-------[***结束节点可以同时有多条条件为空的入边***]
        if (node.NodeType === 'End') { // 结束节点
          let endNodeConInCount = 0;// 记录结束节点的入边个数
          WorkFlowConditionList.forEach(con => {
            if (con.NodeFrom_XID === node.DBID) {
              this.ErrorCollection.push('流程的结束节点"' + node.NodeName + '"不能有出边' + con.ConditionName);
            }

            if (con.NodeTo_XID === node.DBID) {
              endNodeConInCount++;
            }
          });

          if (endNodeConInCount < 1) {
            this.ErrorCollection.push('流程的结束节点"' + node.NodeName + '"至少应该有一条入边');
          }
        }

        // 中间结点
        if (node.NodeType === 'Normal') {
          // 处理名称不能为空 add by lyh 20080719
          if (!node.NodeName) {
            this.ErrorCollection.push('流程的节点"' + node.NodeName + '"的“节点名称”属性不能为空');
          }
          if (!node.ProcessName) {
            this.ErrorCollection.push('流程的节点"' + node.ProcessName + '"的“按钮名称”属性不能为空');
          }

          // 必须既有出边也有入边,并且出边的条件有且只能有一个为空
          let conInCount = 0;// 记录中间节点的入边个数
          let conOutCount = 0;// 记录中间节点的出边个数
          let conOutNullPIMCount = 0;// 记录中间节点的出边PIM表达式为空的个数（空值或空字符串都可以）
          WorkFlowConditionList.forEach(con => {
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
            this.ErrorCollection.push('流程的节点"' + node.NodeName + '"至少应该有一条入边');
          }
          if (conOutCount < 1) {
            this.ErrorCollection.push('流程的节点"' + node.NodeName + '"至少应该有一条出边');
          } else if (conOutNullPIMCount !== 1) {
            this.ErrorCollection.push('流程的节点"' + node.NodeName + '"有且只能有一条出边条件表达式为空');
          }
        }
      }

      // 验证扩展用的表达式或处理功能 added by lixin 20100720
      let client = [];
      Object.values(this.ClientFunctionList).forEach(list => {
        client = client.concat(list);
      });

      let server = [];
      Object.values(this.ServerFunctionList).forEach(list => {
        server = server.concat(list);
      });

      // 验证扩展用的处理功能、存储过程等是否合法
      let HaveExternalFunc = false;
      if (node.ProcessVoucher !== '') {
        this.CheckExecutive(client, node.ProcessVoucher, '流程的节点"' + node.NodeName + '"指定的流转前客户端功能:{0} 不存在');
        HaveExternalFunc = true;
      }
      if (node.ExecutiveAfter !== '') {
        this.CheckExecutive(client, node.ExecutiveAfter, '流程的节点"' + node.NodeName + '"指定的流转后客户端功能:{0} 不存在');
        HaveExternalFunc = true;
      }
      if (node.ProcedureAfter !== '') {
        this.CheckExecutive(server, node.ProcedureAfter, '流程的节点"' + node.NodeName + '"指定的流转后存储过程:{0} 不存在');
        HaveExternalFunc = true;
      }
      if (node.ProcedureAfterBack !== '') {
        this.CheckExecutive(server, node.ProcedureAfterBack, '流程的节点"' + node.NodeName + '"指定的返回后存储过程:{0} 不存在');
      }
      if (node.ProcedureBeforeBack !== '') {
        this.CheckExecutive(server, node.ProcedureBeforeBack, '流程的节点"' + node.NodeName + '"指定的返回前存储过程:{0} 不存在');
        HaveExternalFunc = true;
      }
      if (node.ProcedureAfterReject !== '') {
        this.CheckExecutive(server, node.ProcedureAfterReject, '流程的节点"' + node.NodeName + '"指定的退回后存储过程:{0} 不存在');
        HaveExternalFunc = true;
      }
      if (node.ProcedureBeforeReject !== '') {
        this.CheckExecutive(server, node.ProcedureBeforeReject, '流程的节点"' + node.NodeName + '"指定的退回前存储过程:{0} 不存在');
        HaveExternalFunc = true;
      }
      if (node.ProcedureInNode !== '') {
        this.CheckExecutive(server, node.ProcedureInNode, '流程的节点"' + node.NodeName + '"指定的流转至存储过程:{0} 不存在');
        HaveExternalFunc = true;
      }
      if (node.ProcedureBackIn !== '') {
        this.CheckExecutive(server, node.ProcedureBackIn, '流程的节点"' + node.NodeName + '"指定的退回至存储过程:{0} 不存在');
        HaveExternalFunc = true;
      }
      if (node.ProcedureBackIn !== '') {
        this.CheckExecutive(server, node.ProcedureBackIn, '流程的节点"' + node.NodeName + '"指定的流转前存储过程:{0} 不存在');
        HaveExternalFunc = true;
      }
      // 警告信息--外接程序与"是否可取回"属性同时设置时的警告提示 added by lyh 2011-02-24
      if (HaveExternalFunc) {
        if (node.CanReverse === 'Y') {
          this.WarningCollection.push('节点"' + node.NodeName + '"挂接了外部程序/处理功能，并设置允许返回单据，这样可能会造成未知的问题。');
        }
      }
    });

    if (this.WorkFlowInfo.IsStandard === 'Y') {
      // 验证流程图--任意2节点之间不能存在多余1条(直接)连接线 added by lyh 20090424
      this.WfNodeConNodeIsLegal();
      // 整个审批流程所有的节点不能构成环
      this.ExistloopOfWorkFlow();
    }
    if (this.ErrorCollection.length === 0 && this.WarningCollection.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  WfNodeConNodeIsLegal(WorkFlowNodeList, WorkFlowConditionList) {
    let wfNodeConNodeIsLegal = true;

    WorkFlowNodeList.forEach(nodeA => {
      WorkFlowNodeList.forEach(nodeB => {
        if (this.GetConListFromNodeAtoNodeB(nodeA, nodeB, WorkFlowNodeList, WorkFlowConditionList).Count > 1) {
          this.ErrorCollection.push('节点-' + nodeA.NodeName + ' 到 节点-' + nodeB.NodeName + '最多只允许有一条边');

          wfNodeConNodeIsLegal = false;
        }
      });
    });
    return wfNodeConNodeIsLegal;
  }

  GetConListFromNodeAtoNodeB(nodeA, nodeB, WorkFlowNodeList, WorkFlowConditionList) {
    const conList = [];
    WorkFlowConditionList.forEach(con => {
      const nodeFrom = WorkFlowNodeList.find(node => node.DBID === con.DBID);

      if (nodeFrom != null && nodeFrom.DBID === nodeA.DBID) {
        const nodeTo = WorkFlowNodeList.find(node => node.DBID === con.DBID);
        if (nodeTo != null && nodeTo.DBID === nodeB.DBID) {
          conList.push(con);
        }
      }
    });
    return conList;
  }

  // 验证流程图--判断审批流程中是否存在环--利用拓扑排序进行检测
  ExistloopOfWorkFlow(WorkFlowNodeList, WorkFlowConditionList) {
    let outIllegalNodesListStr = '';
    const workFlowNodeList = JSON.parse(JSON.stringify(WorkFlowNodeList));
    const workFlowConditionList = JSON.parse(JSON.stringify(WorkFlowConditionList));

    // const topologyNodeList = [];
    let NeedDeletedConTemp = [];

    let NeedContinue = true;// 判断是否继续循环检测--如果检测不出还有入度为0的节点，就停止循环检测
    while (NeedContinue) {
      const nodeHt = this.CalculateNodeInDegree(workFlowNodeList, workFlowConditionList);

      let IncludeNodeOfZeroInDegree = false;// 是否包含入度为0的节点
      for (const de in nodeHt) {
        if (nodeHt[de] === 0) {
          IncludeNodeOfZeroInDegree = true;// 标记

          // topologyNodeList.push(de);

          const deIndex = workFlowNodeList.findIndex(item => Number(item.DBID) === Number(de));
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
      outIllegalNodesListStr += outIllegalNodesListStr === '' ? '"' + node.NodeName + '"' : ',' + '"' + node.NodeName + '"';
    });
    if (outIllegalNodesListStr) {
      this.ErrorCollection.push('流程中不应该存在环状结构! 以下节点:' + outIllegalNodesListStr + '中存在环状结构');
    }
  }

  CalculateNodeInDegree(workFlowNodeList, workFlowConditionList) {
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

  CheckExecutive(list, name, errorinfo) {
    const checklist = name.split(';');
    checklist.forEach(str => {
      if (list.indexOf(str.trim()) === -1) {
        this.ErrorCollection.push(errorinfo.replace('{0}', str.trim()));
      }
    });
  }

  // 保存流程图
  async SaveWorkFlow(WorkFlowNodeList, WorkFlowConditionList) {
    // 验证流程是否存在循环节点等
    let isChecked = this.Validate(WorkFlowNodeList, WorkFlowConditionList);
    if (!isChecked) {
      this.states.ShowValidateDlg = true;
      return;
    }
    const data = {
      WorkFlowInfo: this.WorkFlowInfo,
      NodeList: WorkFlowNodeList,
      ConditionList: WorkFlowConditionList,
      WorkFlowNoteList: this.WorkFlowNoteList,
    };
    // 处理下审批窗口权限
    const res = await SaveWorkFlow(data);
    if (res) {
      ElMessage({
        message: '保存成功',
        type: 'success',
      });
    }
  }

  expcallback(data) {
    this.expression.callback(data);
    this.expression.ShowExpDlg = false;
  }

  EditExp(data) {
    this.expression.ShowExpDlg = true;

    this.expression.ExpType = data.ExpType;
    this.expression.Expression = data.Expression;
    this.expression.PsmExpression = data.PsmExpression;
    this.expression.ParameterXml = data.ParameterXml;
    this.expression.ResultType = data.ResultType;
    this.expression.callback = data.callback;
  }

  EditNode(cell) {
    if (!this.WorkFlowInfo.DocTypeName) {
      ElMessage({ message: '请先配置流程属性，选择单据类型', type: 'warning' });
    } else {
      this.CurrentCell = cell;
      this.node.ShowNodeInfoDlg = true;
    }
  }

  DeleteNode(dbid) {
    const index = this.NodeList.findIndex(item => item.DBID === dbid);
    if (index > -1) {
      console.log('删除节点', this.NodeList[index]);
    } else {
      console.log('找不到删除节点：' + dbid);
    }
    this.NodeList.splice(index, 1);
  }

  UpdateNode() {
    const index = this.NodeList.findIndex(node => node.DBID === this.node.nodeInfo.DBID);
    this.NodeList[index] = this.node.nodeInfo.DBID;
  }

  SetNodeUserDes(data) {

  }

  SetEditNodeUserExp(data) {
    // this.edge.ConditionPIM = data.Expression;
    // this.CurrentEdge.ConditionPSM = data.PsmExpression;
    // this.CurrentEdge.Parameter = data.ParameterXml;
  }

  EditEdge(cell) {
    if (!this.WorkFlowInfo.DocTypeName) {
      ElMessage({ message: '请先配置流程属性，选择单据类型', type: 'warning' });
    } else {
      this.edge.edgeInfo = cell.getData();
      this.CurrentCell = cell;
      this.edge.ShowEdgeDlg = true;
    }
  }

  // 数据层面更新边 主要为更新边的连接点
  // 这里也可以放在保存前  统一更新下
  // UpdateCond(dbid, sourceId, targetId, sourcePort, targetPort) {
  //   const opt = {
  //     DBID: dbid,
  //     NodeFrom_XID: sourceId,
  //     NodeTo_XID: targetId,
  //   };
  //   opt.PointList = this.getPointByPort(sourcePort) + ';' + this.getPointByPort(targetPort) + ';0,0';
  //   const index = this.ConditionList.findIndex(edge => edge.DBID === opt.DBID);
  //   Object.assign(this.ConditionList[index], opt);
  //   return opt;
  // }

  // DeleteCond(dbid) {
  //   const index = this.ConditionList.findIndex(item => item.DBID === dbid);
  //   this.ConditionList.splice(index, 1);
  // }

  // updateEdge(data) {
  //   const index = this.ConditionList.findIndex(edge => edge.DBID === data.DBID);
  //   Object.assign(this.ConditionList[index], data);
  // }

  getPointByPort(port) {
    switch (port) {
      case 'port_left':
        return '0,0.5';
      case 'port_bottom':
        return '1,0.5';
      case 'port_right':
        return '2,0.5';
      case 'port_top':
        return '3,0.5';
    }
  }

  // UpdateDuty(data) {
  //   const index = this.WorkFlowNoteList.findIndex(item => {
  //     return item.DBID === data.DBID;
  //   });
  //   Object.assign(this.WorkFlowNoteList[index], data);
  // }

  // DeleteDuty(dutyId) {
  //   const index = this.WorkFlowNoteList.findIndex(item => {
  //     return item.DBID === dutyId;
  //   });
  //   this.WorkFlowNoteList.splice(index, 1);
  // }
  ShowNodeQuickInfo(node) {
    this.quickNodeInfo = node;
    this.states.QuickShowType = 'node';
  }

  ShowEdgeQuickInfo(edge) {
    this.quickEdgeInfo = edge;
    this.states.QuickShowType = 'edge';
  }

  ShowWorkFlowQuickInfo() {
    this.quickWorkFlowInfo = this.WorkFlowInfo;
    this.states.QuickShowType = 'flow';
  }
}
