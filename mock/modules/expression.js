
export default [
    {
        url: "/api/Common/GetExpressionOperatorList",
        method: "post",
        response: (data) => {
            return { "Code": "S", "Success": true, "Data": [{ "Description": "逗号，可以用于间隔参数", "Type": "CommaExpression", "Name": ",", "IsOperator": "true" }, { "Description": "乘号，数值数据相乘", "Type": "MultiplyDivideExpression", "Name": "*", "IsOperator": "true" }, { "Description": "使两个数字相除, 返回浮点结果", "Type": "MultiplyDivideExpression", "Name": "/", "IsOperator": "true" }, { "Description": "两个数字相加,也可用于连接两个字符串", "Type": "PlusExpression", "Name": "+", "IsOperator": "true" }, { "Description": "得出两个数字的差或指示数值表达式的负值", "Type": "MinusExpression", "Name": "-", "IsOperator": "true" }, { "Description": "小于", "Type": "WhetherEqualExpression", "Name": "<", "IsOperator": "true" }, { "Description": "大于", "Type": "WhetherEqualExpression", "Name": ">", "IsOperator": "true" }, { "Description": "等于", "Type": "EqualUnequalExpression", "Name": "=", "IsOperator": "true" }, { "Description": "不等于", "Type": "EqualUnequalExpression", "Name": "<>", "IsOperator": "true" }, { "Description": "大于或等于", "Type": "WhetherEqualExpression", "Name": ">=", "IsOperator": "true" }, { "Description": "", "Type": "WhetherEqualExpression", "Name": "<=", "IsOperator": "true" }, { "Description": "并且, 连接布尔类型", "Type": "AndOrExpression", "Name": "AND", "IsOperator": "true" }, { "Description": "或者, 连接布尔类型", "Type": "AndOrExpression", "Name": "OR", "IsOperator": "true" }, { "Description": "是", "Type": "BoolExpression", "Name": "TRUE", "IsOperator": "false" }, { "Description": "否", "Type": "BoolExpression", "Name": "FALSE", "IsOperator": "false" }, { "Description": "括号", "Type": "ErrorExpression", "Name": "(", "IsOperator": "true" }, { "Description": "括号", "Type": "ErrorExpression", "Name": ")", "IsOperator": "true" }] }
        }
    },
    {
        url: "/api/Expression/ValidateExpression",
        method: "POST",
        response: () => {
            return { "Code": "S", "Success": true, "Message": "", "Result": null, "data": { "Succeed": true, "PSM": " @Field_PaymentAmount > 10000", "ParameterXml": "<SideParameter><Parameter Name=\"Field_PaymentAmount\" FieldName=\"PaymentAmount\" Type=\"decimal\" /></SideParameter>", "UsedFields": ["Rate_ExpendApply.PaymentAmount"], "UsedParameters": [] } }
        }
    },
    {
        url: "/api/Model/GetSheetWindowMainCardModel",
        method: "POST",
        response: () => {
            return { "Name": "Rate_ExpendApply", "CName": "出差报销", "Description": "出差报销", "Fields": [{ "Name": "BillCode", "CName": "单据编号", "Type": "String", "Description": "单据编号" }, { "Name": "CreateDate", "CName": "报销日期", "Type": "Date", "Description": "报销日期" }, { "Name": "CreateCode", "CName": "报销人编号", "Type": "String", "Description": "报销人编号" }, { "Name": "CreateCode_Xid", "CName": "报销人编号_Xid", "Type": "LongInteger", "Description": "Key:报销人编号" }, { "Name": "CreateMan", "CName": "报销人", "Type": "String", "Description": "报销人" }, { "Name": "OrgCode", "CName": "部门编码", "Type": "String", "Description": "部门编码" }, { "Name": "OrgCode_Xid", "CName": "部门编码_Xid", "Type": "LongInteger", "Description": "Key:部门编码" }, { "Name": "OrgName", "CName": "部门名称", "Type": "String", "Description": "部门名称" }, { "Name": "ApplyReason", "CName": "详细事由", "Type": "String", "Description": "详细事由" }, { "Name": "PaymentAmount", "CName": "报销金额", "Type": "Size", "Description": "报销金额" }, { "Name": "Notes", "CName": "备注", "Type": "String", "Description": "备注" }, { "Name": "AnnexPage", "CName": "附件张数", "Type": "Size", "Description": "附件张数" }, { "Name": "BillPrefix", "CName": "单据前缀", "Type": "String", "Description": "单据前缀" }, { "Name": "ApplyAmount", "CName": "申请金额", "Type": "Size", "Description": "申请金额" }, { "Name": "ID", "CName": "ID", "Type": "LongInteger", "Description": "ID" }, { "Name": "ComCode", "CName": "单位编码", "Type": "String", "Description": "单位编码" }, { "Name": "ComCode_Xid", "CName": "单位编码_Xid", "Type": "LongInteger", "Description": "Key:单位编码" }, { "Name": "Company", "CName": "所属单位", "Type": "String", "Description": "所属单位" }, { "Name": "ApplyCode", "CName": "事前申请单号", "Type": "String", "Description": "事前申请单号" }, { "Name": "ApplyCode_Xid", "CName": "事前申请单号_Xid", "Type": "LongInteger", "Description": "Key:事前申请单号" }, { "Name": "CapitalAmount", "CName": "金额大写", "Type": "String", "Description": "金额大写" }, { "Name": "ApplyDate", "CName": "申请日期", "Type": "Date", "Description": "申请日期" }, { "Name": "ApplyMan", "CName": "申请人", "Type": "String", "Description": "申请人" }, { "Name": "ApplyOrgName", "CName": "申请部门", "Type": "String", "Description": "申请部门" }, { "Name": "InCityCount", "CName": "市内行程数", "Type": "Size", "Description": "市内行程数" }, { "Name": "InProvinceCount", "CName": "省内行程数", "Type": "Size", "Description": "省内行程数" }, { "Name": "OutProvinceCount", "CName": "省外行程数", "Type": "Size", "Description": "省外行程数" }, { "Name": "IsKYJF", "CName": "是否科研经费", "Type": "Boolean", "Description": "是否科研经费" }] }
        }
    }
]

