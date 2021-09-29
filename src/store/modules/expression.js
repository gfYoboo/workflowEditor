
export default {
  namespaced: true,
  state: {
    showExpDlg: false,
    ExpType: "",

    Expression: "",
    PsmExpression: "",
    ParameterXml: "",
    ResultType: "",
    callback: null,
  },
  mutations: {
    setExpDlgState(state, data) {
      state.showExpDlg = data;
    },
    setExp(state, data) {
      state.ExpType = data.ExpType;
      state.Expression = data.Expression;
      state.PsmExpression = data.PsmExpression;
      state.ParameterXml = data.ParameterXml;
      state.ResultType = data.ResultType;
      state.callback = data.callback;
    },
  },
  actions: {
    editExp({ commit }, data) {
      commit("setExpDlgState", true);
      commit("setExp", data);
    },
    callback({ commit, state }, data) {
      state.callback(data);
    },
  },
}
;
