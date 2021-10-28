
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
    beforeSave({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        if (state.ErrorCollection.length === 0 && state.WarningCollection.length === 0) {
          resolve(true);
        } else {
          commit("setValidateDlgState", true);
          resolve(false);
        }
      });
    },

  },
}
;
