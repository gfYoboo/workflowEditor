export default (graph, manager) => {
  // var data = {
  //     "WorkFlowInfo": { "DBID": "100000113", "Code": "100000000109", "Name": "接待申请", "Organization_xID": "100000000", "Organization": "山东中医药大学附属医院", "DocTypeName": "接待申请", "IsSubWorkFlow": "N",   "IsActive": "Y" },
  //     "WorkFlowNoteList": [
  //         { "NoteName": "", "NoteName_Xid": "0", "DispX": "20", "DispY": "158", "Des": "" },
  //         { "NoteName": "业务部门", "NoteName_Xid": "100000000", "DispX": "20", "DispY": "217", "Des": "" },
  //         { "NoteName": "院办", "NoteName_Xid": "100000016", "DispX": "20", "DispY": "276", "Des": "" },
  //         { "NoteName": "分管业务领导", "NoteName_Xid": "100000001", "DispX": "20", "DispY": "335", "Des": "" },
  //         { "NoteName": "", "NoteName_Xid": "0", "DispX": "20", "DispY": "394", "Des": "" },
  //     ],
  //     "ConditionList": [
  //         { "DBID": "100038525", "ConditionPIM": "", "ConditionPSM": "", "Parameter": "", "Description": "", "NodeFrom_XID": "100000895", "NodeTo_XID": "100000796", "PointList": "1,0.5,0;3,0.5,1;0,0" },
  //         { "DBID": "100038524", "ConditionPIM": "", "ConditionPSM": "", "Parameter": "", "Description": "", "NodeFrom_XID": "100000795", "NodeTo_XID": "100000895", "PointList": "1,0.5,0;3,0.5,1;0,0" },
  //         { "DBID": "100038523", "ConditionPIM": "", "ConditionPSM": "", "Parameter": "", "Description": "", "NodeFrom_XID": "100000796", "NodeTo_XID": "100000794", "PointList": "1,0.5,0;3,0.5,1;0,0" },
  //         { "DBID": "100038522", "ConditionPIM": "", "ConditionPSM": "", "Parameter": "", "Description": "", "NodeFrom_XID": "100000793", "NodeTo_XID": "100000795", "PointList": "1,0.5,0;3,0.5,1;0,0" }],

  //     "NodeList": [
  //         {
  //             "DBID": "100000796", "NodeName": "分管院领导审批", "NodeX": "420", "NodeY": "340", "NodeCode": "100000000507", "MaxStayTime": "", "IsAutoNode": "N", "IsNeedCA": "Y", "TicketQty": "1", "DutyDes": "", "DocStatus": "待分管院领导审批", "ProcessName": "审批", "EditAttacher": "N", "CanReverse": "N", "CanAutoCheck": "N", "AllowPrintDocument": "N", "AllowEditDocument": "N", "AllowUnCheck": "Y", "AutoCheckOwnDoc": "N", "NodeType": "Normal", "OnlyDepartmentManager": "N", "IsAssign": "N", "MustHaveAttachment": "N", "AppointCheckerExpression": "BudgetGKCheckers2()", "TitleDescription": "分管业务领导", "CanSelectBackToNode": "N", "GroupIndex": "1", "CanBackIn": "N", "AppointUser": "", "AppointUserID": "", "ProcessVoucher": "", "ExecutiveAfter": "", "ProcedureName": "", "ProcedureAfter": "", "ProcedureBeforeReject": "", "ProcedureAfterReject": "", "ProcedureBeforeBack": "", "ProcedureAfterBack": "", "ProcedureInNode": "", "ProcedureBackIn": "", "SubWorkFlowName": "", "SubWorkFlowID": "",
  //             "NodeUserList": [],
  //             "CheckFactorList": [],
  //             "CheckWindowFactorList": [
  //                 { "ID": "100041220", "WindowName": "接待申请", "AddAble": "Y", "DeleteAble": "Y", "EditAble": "N", "MustHaveData": "N" },
  //                 { "ID": "100041221", "WindowName": "来宾人员信息", "AddAble": "Y", "DeleteAble": "Y", "EditAble": "N", "MustHaveData": "N" },
  //                 { "ID": "100041222", "WindowName": "陪同人员信息", "AddAble": "Y", "DeleteAble": "Y", "EditAble": "N", "MustHaveData": "N" }
  //             ]
  //         },
  //         {
  //             "DBID": "100000795", "NodeName": "部门负责人审批", "NodeX": "420", "NodeY": "230", "NodeCode": "100000000506", "MaxStayTime": "", "IsAutoNode": "N", "IsNeedCA": "Y", "TicketQty": "1", "DutyDes": "", "DocStatus": "待部门负责人审批", "ProcessName": "审批", "EditAttacher": "N", "CanReverse": "Y", "CanAutoCheck": "N", "AllowPrintDocument": "N", "AllowEditDocument": "N", "AllowUnCheck": "Y", "AutoCheckOwnDoc": "N", "NodeType": "Normal", "OnlyDepartmentManager": "N", "IsAssign": "N", "MustHaveAttachment": "N", "AppointCheckerExpression": "TreasurerCheck", "TitleDescription": "科室主任", "CanSelectBackToNode": "N", "GroupIndex": "1", "CanBackIn": "N", "AppointUser": "部门负责人（多人且不允许自审）", "AppointUserID": "100000008", "ProcessVoucher": "", "ExecutiveAfter": "", "ProcedureName": "写入预算项目维护_001课题\r\n年度预算结转\r\n预算调整后在途单据数据\r\n预算调整", "ProcedureAfter": "分期付款台账写入", "ProcedureBeforeReject": "", "ProcedureAfterReject": "", "ProcedureBeforeBack": "", "ProcedureAfterBack": "", "ProcedureInNode": "", "ProcedureBackIn": "", "SubWorkFlowName": "", "SubWorkFlowID": "",
  //             "NodeUserList": [],
  //             "CheckFactorList": [],
  //             "CheckWindowFactorList": [
  //                 { "ID": "100041223", "WindowName": "接待申请", "AddAble": "Y", "DeleteAble": "Y", "EditAble": "N", "MustHaveData": "N" },
  //                 { "ID": "100041224", "WindowName": "来宾人员信息", "AddAble": "Y", "DeleteAble": "Y", "EditAble": "N", "MustHaveData": "N" },
  //                 { "ID": "100041225", "WindowName": "陪同人员信息", "AddAble": "Y", "DeleteAble": "Y", "EditAble": "N", "MustHaveData": "N" }
  //             ]
  //         },
  //         {
  //             "DBID": "100000794", "NodeName": "结 束", "NodeX": "422", "NodeY": "404", "NodeCode": "100000000505", "MaxStayTime": "", "IsAutoNode": "N", "IsNeedCA": "Y", "TicketQty": "0", "DutyDes": "", "DocStatus": "审批结束", "ProcessName": "提交", "EditAttacher": "N", "CanReverse": "N", "CanAutoCheck": "N", "AllowPrintDocument": "N", "AllowEditDocument": "N", "AllowUnCheck": "Y", "AutoCheckOwnDoc": "N", "NodeType": "End", "OnlyDepartmentManager": "N", "IsAssign": "N", "MustHaveAttachment": "N", "AppointCheckerExpression": "", "TitleDescription": "", "CanSelectBackToNode": "N", "GroupIndex": "1", "CanBackIn": "N", "AppointUser": "", "AppointUserID": "", "ProcessVoucher": "", "ExecutiveAfter": "", "ProcedureName": "", "ProcedureAfter": "", "ProcedureBeforeReject": "", "ProcedureAfterReject": "", "ProcedureBeforeBack": "", "ProcedureAfterBack": "", "ProcedureInNode": "事前申请台账写入", "ProcedureBackIn": "", "SubWorkFlowName": "", "SubWorkFlowID": "",
  //             "NodeUserList": [],
  //             "CheckFactorList": [],
  //             "CheckWindowFactorList": []
  //         },
  //         {
  //             "DBID": "100000793", "NodeName": "开 始", "NodeX": "423", "NodeY": "170", "NodeCode": "100000000504", "MaxStayTime": "", "IsAutoNode": "N", "IsNeedCA": "Y", "TicketQty": "0", "DutyDes": "", "DocStatus": "制单", "ProcessName": "提交", "EditAttacher": "N", "CanReverse": "Y", "CanAutoCheck": "N", "AllowPrintDocument": "N", "AllowEditDocument": "N", "AllowUnCheck": "Y", "AutoCheckOwnDoc": "N", "NodeType": "Start", "OnlyDepartmentManager": "N", "IsAssign": "N", "MustHaveAttachment": "N", "AppointCheckerExpression": "", "TitleDescription": "", "CanSelectBackToNode": "N", "GroupIndex": "1", "CanBackIn": "N", "AppointUser": "", "AppointUserID": "", "ProcessVoucher": "", "ExecutiveAfter": "", "ProcedureName": "预算申请提交前2", "ProcedureAfter": "预算申请扣减2", "ProcedureBeforeReject": "", "ProcedureAfterReject": "", "ProcedureBeforeBack": "", "ProcedureAfterBack": "", "ProcedureInNode": "", "ProcedureBackIn": "预算申请返还2", "SubWorkFlowName": "", "SubWorkFlowID": "",
  //             "NodeUserList": [],
  //             "CheckFactorList": [],
  //             "CheckWindowFactorList": [
  //                 { "ID": "100041226", "WindowName": "接待申请", "AddAble": "Y", "DeleteAble": "Y", "EditAble": "Y", "MustHaveData": "N" },
  //                 { "ID": "100041227", "WindowName": "来宾人员信息", "AddAble": "Y", "DeleteAble": "Y", "EditAble": "Y", "MustHaveData": "N" },
  //                 { "ID": "100041228", "WindowName": "陪同人员信息", "AddAble": "Y", "DeleteAble": "Y", "EditAble": "Y", "MustHaveData": "N" }
  //             ]
  //         },
  //         {
  //             "DBID": "100000895", "NodeName": "办公室负责人审批", "NodeX": "420", "NodeY": "287", "NodeCode": "100000000606", "MaxStayTime": "", "IsAutoNode": "N", "IsNeedCA": "Y", "TicketQty": "1", "DutyDes": "", "DocStatus": "待办公室负责人审批", "ProcessName": "审批", "EditAttacher": "N", "CanReverse": "Y", "CanAutoCheck": "N", "AllowPrintDocument": "N", "AllowEditDocument": "N", "AllowUnCheck": "Y", "AutoCheckOwnDoc": "N", "NodeType": "Normal", "OnlyDepartmentManager": "N", "IsAssign": "N", "MustHaveAttachment": "N", "AppointCheckerExpression": "", "TitleDescription": "办公室主任", "CanSelectBackToNode": "N", "GroupIndex": "1", "CanBackIn": "N", "AppointUser": "", "AppointUserID": "", "ProcessVoucher": "", "ExecutiveAfter": "", "ProcedureName": "预算申请返还2", "ProcedureAfter": "", "ProcedureBeforeReject": "", "ProcedureAfterReject": "", "ProcedureBeforeBack": "", "ProcedureAfterBack": "", "ProcedureInNode": "", "ProcedureBackIn": "", "SubWorkFlowName": "", "SubWorkFlowID": "",
  //             "NodeUserList": [
  //                 { "ID": "100022621", "UserCode": "71000021", "UserName": "周风云", "UserName_xID": "100000017", "ConPSM": "", "ConPIM": "", "ConPara": "", "DoesOwnCompany": "Y", "ComName": "山东中医药大学附属医院", "OrgName": "办公室", "NodeID": "100000895" }],
  //             "CheckFactorList": [],
  //             "CheckWindowFactorList": [
  //                 { "ID": "100041229", "WindowName": "接待申请", "AddAble": "Y", "DeleteAble": "Y", "EditAble": "N", "MustHaveData": "N" },
  //                 { "ID": "100041230", "WindowName": "来宾人员信息", "AddAble": "Y", "DeleteAble": "Y", "EditAble": "N", "MustHaveData": "N" },
  //                 { "ID": "100041231", "WindowName": "陪同人员信息", "AddAble": "Y", "DeleteAble": "Y", "EditAble": "N", "MustHaveData": "N" }]
  //         }
  //     ]
  // }
  // { "NoteName": "业务部门", "NoteName_Xid": "100000000", "DispX": "20", "DispY": "217", "Des": "" },
  manager.WorkFlowNoteList.forEach(note => {
    graph.addNode({
      shape: 'duty',
      data: note,
    });
  });
  manager.NodeList.forEach(node => {
    if (node.NodeType === 'Start') {
      graph.addNode({
        shape: 'start',
        x: Number(node.NodeX),
        y: Number(node.NodeY),
        data: node,
      });
    } else if (node.NodeType === 'End') {
      graph.addNode({
        shape: 'end',
        x: Number(node.NodeX),
        y: Number(node.NodeY),
        data: node,
      });
    } else {
      graph.addNode({
        shape: 'normal',
        label: node.NodeName,
        x: Number(node.NodeX),
        y: Number(node.NodeY),
        data: node,
      });
    }
  });
  manager.ConditionList.forEach(cond => {
    // 判断连接桩
    // 1,0.5,0; 3,0.5,1 ; 0,0
    const points = cond.PointList.split(';');
    const vertices = [];
    if (points[2] !== '0,0') {
      for (let i = 2; i < points.length; i++) {
        if (points[i] !== '') {
          const item = points[i].split(',');
          vertices.push({ x: Number(item[0]), y: Number(item[1]) });
        }
      }
    }

    graph.addEdge({
      source: { cell: getNodeByDBID(graph, cond.NodeFrom_XID), port: GetProtID(points[0]) },
      target: { cell: getNodeByDBID(graph, cond.NodeTo_XID), port: GetProtID(points[1]) },
      data: cond,
      // vertices: vertices,
    });
  });
};
export function getNodeByDBID(graph, DBID) {
  const nodes = graph.getNodes();

  const node = nodes.find(node => {
    if (node.shape === 'start' || node.shape === 'normal' || node.shape === 'end') {
      return node.getData().DBID === DBID;
    } else {
      return false;
    }
  });
  return node;
}
export function GetProtID(point) {
  if (point.startsWith('0,')) {
    return 'port_left';
  } else if (point.startsWith('1,')) {
    return 'port_bottom';
  } else if (point.startsWith('2,')) {
    return 'port_right';
  } else if (point.startsWith('3,')) {
    return 'port_top';
  }
}
