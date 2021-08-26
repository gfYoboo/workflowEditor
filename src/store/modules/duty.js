export default {
    namespaced: true,
    state() {
        return {
            showNoteDlg: false,
            showDesDlg: false,
        }
    },
    mutations: {
        setNoteDlgState(state, data) {
            state.showNoteDlg = data;
        },
        setDesDlgState(state, data) {
            state.showDesDlg = data;
        },

    },
    actions: {
        updateDutyDesData({ rootState }, data) {
            const DBID = data.DBID;
            rootState.WorkFlowNoteList.forEach(item => {
                if (item.DBID === DBID) {
                    item.Des = data.Des
                }
            });
        },
        updateDutyOrgData({ rootState }, data) {
            const DBID = data.DBID;
            rootState.WorkFlowNoteList.forEach(item => {
                if (item.DBID === DBID) {
                    item.NoteName = data.NoteName
                    item.NoteName_xID = data.NoteName_xID
                }
            });
        },
    }
}