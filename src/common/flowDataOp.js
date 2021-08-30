import store from '@/store/index';
//数据层面新增职能带
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
//数据层面新增节点
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
//数据层面删除节点
export function deleteNode(dbid) {
    store.commit("deleteNode", dbid);
}
//数据层面新增边
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
//数据层面更新边 主要为更新边的连接点 
//这里也可以放在保存前  统一更新下
export function updateCond(dbid, sourceId, targetId, sourcePort, targetPort) {
    let opt = {
        DBID: dbid,
        NodeFrom_XID: sourceId,
        NodeTo_XID: targetId,
    }
    opt.PointList = getPointByPort(sourcePort) + ";" + getPointByPort(targetPort) + ";0,0"

    store.commit("changeCondPoint", opt)

}
//数据层面删除边
export function deleteCond(dbid) {
    store.commit("deleteCond", dbid);

}
//获取连接桩的位置。 0左 1下  2右 3上
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