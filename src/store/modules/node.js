import { ElMessage } from "element-plus";
export default {
  namespaced: true,
  state() {
    return {
      showNodeInfoDlg: false,
      CurrentNode: {},
    };
  },
  mutations: {
    setNodeInfoDlgState(state, data) {
      state.showNodeInfoDlg = data;
    },
    setCurrentNode(state, data) {
      state.CurrentNode = JSON.parse(JSON.stringify(data));
    },
    SetEditNodeUserExp(state, data) {
      state.CurrentEdge.ConditionPIM = data.Expression;
      state.CurrentEdge.ConditionPSM = data.PsmExpression;
      state.CurrentEdge.Parameter = data.ParameterXml;
    },

  },
  actions: {
    showNodeInfoDlg({ commit }) {
      commit("setNodeInfoDlgState", true);
    },
    hideNodeInfoDlg({ commit }) {
      commit("setNodeInfoDlgState", false);
    },
    editNode({ commit, rootState }, dbid) {
      if (!rootState.WorkFlowInfo.DocTypeName) {
        ElMessage({ message: "请先配置流程属性，选择单据类型", type: "warning" });
      } else {
        // 设置当前节点
        const index = rootState.NodeList.findIndex(node => node.DBID === dbid);
        commit("setCurrentNode", rootState.NodeList[index]);
        // 显示节点信息框
        commit("setNodeInfoDlgState", true);
      }
    },
    updateNode({ commit, state, rootState }) {
      const index = rootState.NodeList.findIndex(node => node.DBID === state.CurrentNode.DBID);
      rootState.NodeList[index] = state.CurrentNode;
    },
    updateNodeUserExp({ commit }, data) {
      commit("SetEditNodeUserExp", data);
    },
  },
}
;
