import { createStore } from "vuex";
import { GetBasic, GetWorkFlowInfo } from "@/api/workflow";
import { ElMessage } from "element-plus";

import flow from "./modules/flow";
import node from "./modules/node";
import edge from "./modules/edge";
import duty from "./modules/duty";
import validate from "./modules/validate";

import expression from "./modules/expression";
export default createStore({
  state() {
    return {
      showExpDlg: false,
      ExpType: "",
      NoteList: [],
      DocTypeAndWindow: {},
      CompanyList: [],
      ClientFunctionList: [],
      ServerFunctionList: [],
      NodeUserDesList: [],
      RelationList: [],

      WorkFlowInfo: {},
      WorkFlowNoteList: [],
      NodeList: [],
      ConditionList: [],
      CurrentSheetWindowName: "",
      CurrentNextId: -10000,
      CurrentCell: {},

    };
  },
  mutations: {
    setWorkFlowNote(state, data) {
      state.NoteList = data;
    },
    setBasic(state, data) {
      state.DocTypeAndWindow = data.DocTypeAndWindow;
      state.ClientFunctionList = data.ClientFuntionList;
      state.ServerFunctionList = data.ServerFunctionList;
      state.NodeUserDesList = data.NodeUserDesList;
      state.NoteList = data.WorkFlowNoteList;
      state.CompanyList = data.CompanyList;
      state.RelationList = data.WorkFlowRelationList;
    },
    setWorkFlowInfo(state, data) {
      state.WorkFlowInfo = data.WorkFlowInfo;
      state.WorkFlowNoteList = data.WorkFlowNoteList;
      state.NodeList = data.NodeList;
      state.ConditionList = data.ConditionList;
    },
    setSheetWindowName(state) {
      if (state.WorkFlowInfo.DocTypeName) {
        state.CurrentSheetWindowName = state.DocTypeAndWindow[state.WorkFlowInfo.DocTypeName];
        if (!state.CurrentSheetWindowName) {
          alert("CurrentSheetWindowName 根据单据类型 " + state.WorkFlowInfo.DocTypeName + " 未找到对应的表单");
          console.log("state.DocTypeAndWindow", state.DocTypeAndWindow);
          console.log("state.WorkFlowInfo.DocTypeName", state.WorkFlowInfo.DocTypeName);
        }
      } else {
        console.log("按理论是不会进入这里的", state.WorkFlowInfo.DocTypeName);
      }
    },
    setCurrentNextIdInc(state) {
      state.CurrentNextId++;
    },
    updateFlow(state, data) {
      state.WorkFlowInfo = data;
    },
    addDuty(state, data) {
      state.WorkFlowNoteList.push(data);
    },
    updateDuty(state, data) {
      const index = state.WorkFlowNoteList.findIndex(item => {
        return item.DBID === data.DBID;
      });
      Object.assign(state.WorkFlowNoteList[index], data);
    },
    addNode(state, data) {
      state.NodeList.push(data);
    },
    deleteNode(state, data) {
      const index = state.NodeList.findIndex(item => item.DBID === data);
      state.NodeList.splice(index, 1);
    },
    addCond(state, data) {
      state.ConditionList.push(data);
    },
    deleteCond(state, data) {
      const index = state.ConditionList.findIndex(item => item.DBID === data);
      state.ConditionList.splice(index, 1);
    },
    updateCond(state, data) {
      const index = state.ConditionList.findIndex(edge => edge.DBID === data.DBID);
      Object.assign(state.ConditionList[index], data);
    },
    changeCondPoint(state, data) {
      const index = state.ConditionList.findIndex(edge => edge.DBID === data.DBID);
      Object.assign(state.ConditionList[index], data);
    },
  },
  actions: {
    async GetBasic({ commit }) {
      const res = await GetBasic();
      if (res.ErrorInfo) {
        ElMessage.error(res.ErrorInfo);
      }
      commit("setBasic", res);
    },
    async GetWorkFlowInfo({ commit }, workFlowId) {
      const res = await GetWorkFlowInfo(workFlowId);
      commit("setWorkFlowInfo", res);
      commit("setSheetWindowName");
    },
    async createNewWorkFlowInfo({ commit }) {
      commit("setWorkFlowInfo",
        {
          WorkFlowInfo: {
            DBID: "",
            IsActive: "Y",
            IsStandard: "Y",
            IsSubWorkFlow: "N",
          },
          WorkFlowNoteList: [],
          NodeList: [],
          ConditionList: [],
        },
      );
    },
  },
  getters: {
    getNextId: (state) => {
      // commit('setCurrentNextIdInc');
      return state.CurrentNextId++;
    },
  },
  modules: {
    flow,
    node,
    edge,
    duty,
    expression,
    validate,
  },
});
