
export default {
  namespaced: true,
  state() {
    return {
      showFlowDlg: false,
      showFlowNoteDlg: false,
    };
  },
  mutations: {
    setFlowDlgState(state, data) {
      state.showFlowDlg = data;
    },
    setFlowNoteDlgState(state, data) {
      state.showFlowNoteDlg = data;
    },
  },
};
