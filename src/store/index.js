import { createStore } from "vuex";
import request from "@/utils/request";

import flow from './modules/flow'
import node from './modules/node'
import edge from './modules/edge'
import duty from './modules/duty'
import validate from './modules/validate'

import expression from './modules/expression'
export default createStore({
    state() {
        return {
            showExpDlg: false,
            ExpType: "",
            NoteList: [],
            DocTypeAndWindowList: [],
            UserInfoList: [],
            CompanyList: [],
            ClientFunctionList: [],
            ServerFunctionList: [],
            NodeUserDesList: [],
            RelationList: [],

            WorkFlowInfo: {},
            WorkFlowNoteList: [],
            NodeList: [],
            ConditionList: [],

            DocTypeInfo: {},
            CurrentNextId: -10000,
            CurrentCell: {},

        }
    },
    mutations: {
        setBasic(state, data) {
            state.DocTypeAndWindowList = data.DocTypeAndWindowList;
            state.ClientFunctionList = data.ClentFuntionList;
            state.ServerFunctionList = data.ServerFunctionList;
            state.UserInfoList = data.UserInfoList;
            state.NodeUserDesList = data.NodeUserDesList;

            for (const key in data.DicWorkFlowNoteList) {
                state.NoteList.push({
                    label: key,
                    value: data.DicWorkFlowNoteList[key],
                });
            }

            for (const key in data.DicCompanyList) {
                state.CompanyList.push({
                    label: key,
                    value: data.DicCompanyList[key],
                });
            }

            for (const key in data.DicWorkFlowRelationList) {
                state.RelationList.push({
                    label: key,
                    value: data.DicWorkFlowRelationList[key],
                });
            }

        },
        setWorkFlowInfo(state, data) {
            state.WorkFlowInfo = data.WorkFlowInfo;
            state.WorkFlowNoteList = data.WorkFlowNoteList;
            state.NodeList = data.NodeList;
            state.ConditionList = data.ConditionList;
        },
        setSheetWindowName(state) {
            if (state.WorkFlowInfo.DocTypeName) {
                state.DocTypeAndWindowList.forEach(item => {
                    if (item.doctype === state.WorkFlowInfo.DocTypeName) {
                        state.DocTypeInfo = item;
                    }
                })
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
                return item.DBID === data.DBID
            });
            Object.assign(state.WorkFlowNoteList[index], data);
        },
        addNode(state, data) {
            state.NodeList.push(data);
        },
        deleteNode(state, data) {
            const index = state.NodeList.findIndex(item => item.DBID === data)
            state.NodeList.splice(index, 1);
        },
        addCond(state, data) {
            state.ConditionList.push(data);
        },
        deleteCond(state, data) {
            const index = state.ConditionList.findIndex(item => item.DBID === data)
            state.ConditionList.splice(index, 1);
        },
        updateCond(state, data) {
            const index = state.ConditionList.findIndex(edge => edge.DBID === data.DBID)
            Object.assign(state.ConditionList[index], data);
        },
        changeCondPoint(state, data) { 
            const index = state.ConditionList.findIndex(edge => edge.DBID === data.DBID)
            Object.assign(state.ConditionList[index], data);
        }
    },
    actions: {
        async GetBasic({ commit }) {
            const res = await request({ url: "/api/WorkFlow/GetBasic", method: "GET" })
            commit('setBasic', res);
        },
        async GetWorkFlowInfo({ commit }, data) {
            const res = await request({ url: "/api/WorkFlow/GetWorkFlowInfo", method: "GET", params: { WorkFlowId: data } });
            commit('setWorkFlowInfo', res);
            commit('setSheetWindowName');
        },
        async createNewWorkFlowInfo({ commit }) {
            commit('setWorkFlowInfo',
                {
                    WorkFlowInfo: {
                        DBID: "",
                        IsActive: "Y",
                        IsStandard: "Y",
                        IsSubWorkFlow: "N",
                    },
                    WorkFlowNoteList: [],
                    NodeList: [],
                    ConditionList: []
                }
            );
        }
    },
    getters: {
        getNextId: (state) => {
            // commit('setCurrentNextIdInc');
            return state.CurrentNextId++;
        }
    },
    modules: {
        flow,
        node,
        edge,
        duty,
        expression,
        validate
    }
});