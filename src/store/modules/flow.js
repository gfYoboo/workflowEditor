
export default {
  namespaced: true,
  state() {
    return {
      showFlowDlg: false,
    };
  },
  mutations: {
    setFlowDlgState(state, data) {
      state.showFlowDlg = data;
    },
  },
}
;
