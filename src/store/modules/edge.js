import { ElMessage } from "element-plus";
export default {
    namespaced: true,
    state() {
        return {
            showEdgeDlg: false,
            CurrentEdge: {}
        }
    },
    mutations: {
        setCurrentEdge(state, data) {
            state.CurrentEdge = JSON.parse(JSON.stringify(data));
        },
        setEdgeDlgState(state, data) {
            state.showEdgeDlg = data;
        },
    },
    actions: {
        editEdge({ commit, rootState }, dbid) {
            if (!rootState.WorkFlowInfo.DocTypeName) {
                ElMessage({ message: "请先配置流程属性，选择单据类型", type: "warning" })
            }
            else {
                const index = rootState.ConditionList.findIndex(
                    cond => cond.DBID === dbid
                )
                commit("setCurrentEdge", rootState.ConditionList[index])
                commit("setEdgeDlgState", true)
            }
        },
        updateExp({ commit }, data) {
            commit("setEdgeExp", data);
        },
        addEdge({ commit }, data) {
            commit("addCond", data, { root: true });
        },
        updateEdge({ commit }, data) {
            commit("updateCond", data, { root: true });
        },
    }
}