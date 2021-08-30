import request from "@/utils/request";

export function GetBasic() {
    return request({ url: "/api/workflow/GetBasic", method: "GET" })
}
export function GetWorkFlowInfo(workFlowId) {
    request(
        {
            url: "/api/workflow/GetWorkFlowInfo",
            method: "GET",
            params: { WorkFlowId: workFlowId }
        });
}

export function GetUserList(page, search) {
    return request({
        url: "/api/workflow/GetUserList",
        data: { page: page, text: search },
    });
}

export function CheckFactorListByDocType(DocType) {
    return request({
        url: "/api/workflow/CheckFactorListByDocType",
        data: { DocType: DocType }
    })
}

export function CheckOperationPurviewListByDocType(DocType) {
    return request({
        url: "/api/workflow/CheckOperationPurviewListByDocType",
        data: { DocType: DocType }
    })
}