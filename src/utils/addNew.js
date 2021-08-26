import store from '@/store/index';
export function addDuty(nextId) {
    store.commit("addDuty",
        {
            DBID: nextId,
            NoteName: "",
            NoteName_xID: "",
            DispX: "",
            DispY: "",
            Des: ""
        });
}
export function addNode(nextId, shape) {
    var opt = {
        DBID: nextId,
        AllowEditDocument: "N",
        AllowPrintDocument: "N",
        AllowUnCheck: "N",
        AppointCheckerExpression: "",
        AppointUser: "",
        AppointUserID: "",
        AutoCheckOwnDoc: "N",
        CanAutoCheck: "N",
        CanBackIn: "N",
        CanReverse: "N",
        CanSelectBackToNode: "N",
        CheckFactorList: [],
        CheckWindowFactorList: [],
        DutyDes: "",
        EditAttacher: "N",
        ExecutiveAfter: "",
        GroupIndex: "1",
        IsAssign: "N",
        IsAutoNode: "N",
        IsNeedCA: "N",
        MaxStayTime: "",
        MustHaveAttachment: "N",
        NodeCode: "",
        NodeUserList: [],
        NodeX: "",
        NodeY: "",
        OnlyDepartmentManager: "N",
        ProcedureAfter: "",
        ProcedureAfterBack: "",
        ProcedureAfterReject: "",
        ProcedureBackIn: "",
        ProcedureBeforeBack: "",
        ProcedureBeforeReject: "",
        ProcedureInNode: "",
        ProcedureName: "",
        ProcessVoucher: "",
        SubWorkFlowID: "",
        SubWorkFlowName: "",
        TicketQty: "0",
        TitleDescription: ""
    }
    if (shape === "start") {
        opt.DocStatus = "制单";
        opt.NodeName = "开 始";
        opt.NodeType = "Start";
        opt.ProcessName = "提交";
        opt.CanBackIn = "Y"

    }
    else if (shape === "end") {
        opt.DocStatus = "审批结束";
        opt.NodeName = "结 束";
        opt.NodeType = "End";
        opt.ProcessName = "";
    }
    else {
        opt.DocStatus = "待审批";
        opt.NodeName = "节 点";
        opt.NodeType = "Normal";
        opt.ProcessName = "审批";
        opt.AllowUnCheck = "Y";
    }

    store.commit("addNode", opt);
}
export function deleteNode(dbid) {
    store.commit("deleteNode", dbid);
}

export function addCond(nextId, sourceId, targetId, sourcePort, targetPort) {
    let opt = {
        ConditionPIM: "",
        ConditionPSM: "",
        DBID: nextId,
        Description: "",
        NodeFrom_XID: sourceId,
        NodeTo_XID: targetId,
        Parameter: "",
        PointList: "",
    }
    opt.PointList = getPointByPort(sourcePort) + ";" + getPointByPort(targetPort) + ";0,0"
    store.dispatch("edge/addEdge", opt);
}
export function updateCond(dbid, sourceId, targetId, sourcePort, targetPort) {
    let opt = {
        DBID: dbid,
        NodeFrom_XID: sourceId,
        NodeTo_XID: targetId,
    }
    opt.PointList = getPointByPort(sourcePort) + ";" + getPointByPort(targetPort) + ";0,0"

    store.commit("changeCondPoint", opt)

}
export function deleteCond(dbid) {
    store.commit("deleteCond", dbid);

}
export function getPointByPort(port) {
    switch (port) {
        case "port_left":
            return "0,0.5";
        case "port_bottom":
            return "1,0.5";
        case "port_right":
            return "2,0.5";
        case "port_top":
            return "3,0.5";
    }

}