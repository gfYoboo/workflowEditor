import { GetBasic, GetWorkFlowInfo, SaveWorkFlow } from '@/api/workflow';
import { ElMessage } from 'element-plus';
import ValidateWorkFlow from './ValidateWorkFlow.js';

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

    this.validate = new ValidateWorkFlow(this);

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
      opt.DocStatus = '??????';
      opt.NodeName = '??? ???';
      opt.NodeType = 'Start';
      opt.ProcessName = '??????';
      opt.CanBackIn = 'Y';
    } else if (shape === 'end') {
      opt.DocStatus = '????????????';
      opt.NodeName = '??? ???';
      opt.NodeType = 'End';
      opt.ProcessName = '';
    } else {
      opt.DocStatus = '?????????';
      opt.NodeName = '??? ???';
      opt.NodeType = 'Normal';
      opt.ProcessName = '??????';
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
        alert('CurrentSheetWindowName ?????????????????? ' + this.WorkFlowInfo.DocTypeName + ' ????????????????????????');
        console.log('state.DocTypeAndWindow', this.DocTypeAndWindow);
        console.log('state.WorkFlowInfo.DocTypeName', this.WorkFlowInfo.DocTypeName);
      }
    } else {
      console.log('?????????????????????????????????', this.WorkFlowInfo.DocTypeName);
    }
  }

  SetWorkFlowNote(data) {
    this.NodeList = data;
  }

  async SaveWorkFlow() {
    const data = {
      WorkFlowInfo: this.WorkFlowInfo,
      NodeList: this.validate.NodeList,
      ConditionList: this.validate.ConditionList,
      WorkFlowNoteList: this.WorkFlowNoteList,
    };
    // ???????????????????????????
    console.log(data);
    const res = await SaveWorkFlow(data);
    if (res) {
      ElMessage({
        message: '????????????',
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
      ElMessage({ message: '?????????????????????????????????????????????', type: 'warning' });
    } else {
      this.CurrentCell = cell;
      this.node.ShowNodeInfoDlg = true;
    }
  }

  DeleteNode(dbid) {
    const index = this.NodeList.findIndex(item => item.DBID === dbid);
    if (index > -1) {
      console.log('????????????', this.NodeList[index]);
    } else {
      console.log('????????????????????????' + dbid);
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
      ElMessage({ message: '?????????????????????????????????????????????', type: 'warning' });
    } else {
      this.edge.edgeInfo = cell.getData();
      this.CurrentCell = cell;
      this.edge.ShowEdgeDlg = true;
    }
  }

  // ????????????????????? ??????????????????????????????
  // ??????????????????????????????  ???????????????
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
