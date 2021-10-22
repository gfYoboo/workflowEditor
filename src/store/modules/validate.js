import { ElMessage } from "element-plus";
import request from "@/utils/request";
export default {
  namespaced: true,
  state() {
    return {
      ShowValidateDlg: false,
      ErrorCollection: [],
      WarningCollection: [],
    };
  },
  mutations: {
    init(state) {
      state.ErrorCollection = [];
      state.WarningCollection = [];
    },
    addError(state, data) {
      state.ErrorCollection.push(data);
    },
    addWarning(state, data) {
      state.WarningCollection.push(data);
    },
    setValidateDlgState(state, data) {
      state.ShowValidateDlg = data;
    },

  },
  actions: {
    async SaveWorkFlow({ state, rootState }) {
      const res = await request(
        {
          url: "/api/workflow/SaveWorkFlow",
          data: {
            WorkFlowInfo: rootState.WorkFlowInfo,
            NodeList: rootState.NodeList,
            ConditionList: rootState.ConditionList,
            WorkFlowNoteList: rootState.WorkFlowNoteList,
          },
        });
      return res;
    },
  },
}
;
