import request from "@/utils/request";

export function GetExpressionOperatorList() {
    return request(
        {
            url: "/api/Common/GetExpressionOperatorList",
            data: { runType: 'Server' }
        })
}

export function ValidateExpression(param) {
    return request(
        {
            url: "/api/Expression/ValidateExpression",
            data: param
        }
    );
}

export function GetSheetWindowMainCardModel(sheetWindowName, useEnName) {
    return request({
        url: "/api/Model/GetSheetWindowMainCardModel",
        data: {
            SheetWindowName: sheetWindowName,
            UseEnName: useEnName
        }
    })
}