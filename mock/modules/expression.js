
export default [
  {
    url: "/api/Common/GetExpressionOperatorList",
    method: "post",
    response: (data) => {
      return { Code: "S", Success: true, Data: [{ Description: "逗号，可以用于间隔参数", Type: "CommaExpression", Name: ",", IsOperator: "true" }, { Description: "乘号，数值数据相乘", Type: "MultiplyDivideExpression", Name: "*", IsOperator: "true" }, { Description: "使两个数字相除, 返回浮点结果", Type: "MultiplyDivideExpression", Name: "/", IsOperator: "true" }, { Description: "两个数字相加,也可用于连接两个字符串", Type: "PlusExpression", Name: "+", IsOperator: "true" }, { Description: "得出两个数字的差或指示数值表达式的负值", Type: "MinusExpression", Name: "-", IsOperator: "true" }, { Description: "小于", Type: "WhetherEqualExpression", Name: "<", IsOperator: "true" }, { Description: "大于", Type: "WhetherEqualExpression", Name: ">", IsOperator: "true" }, { Description: "等于", Type: "EqualUnequalExpression", Name: "=", IsOperator: "true" }, { Description: "不等于", Type: "EqualUnequalExpression", Name: "<>", IsOperator: "true" }, { Description: "大于或等于", Type: "WhetherEqualExpression", Name: ">=", IsOperator: "true" }, { Description: "", Type: "WhetherEqualExpression", Name: "<=", IsOperator: "true" }, { Description: "并且, 连接布尔类型", Type: "AndOrExpression", Name: "AND", IsOperator: "true" }, { Description: "或者, 连接布尔类型", Type: "AndOrExpression", Name: "OR", IsOperator: "true" }, { Description: "是", Type: "BoolExpression", Name: "TRUE", IsOperator: "false" }, { Description: "否", Type: "BoolExpression", Name: "FALSE", IsOperator: "false" }, { Description: "括号", Type: "ErrorExpression", Name: "(", IsOperator: "true" }, { Description: "括号", Type: "ErrorExpression", Name: ")", IsOperator: "true" }] };
    },
  },
  {
    url: "/api/Common/GetExpressionFunctionList",
    method: "post",
    response: (data) => {
      return { Success: true, Data: [{ Data: [{ UseTypes: [{ ReturnValueType: "BoolExpression", Parameters: [{ Description: "布尔类型", IsField: "false", ValueType: "BoolExpression" }], ReturnParameterType: "-1" }], Description: "非运算", Category: "真假", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "Not" }], Catalog: "真假" }, { Data: [{ UseTypes: [{ ReturnValueType: "BoolExpression", Parameters: [{ Description: "布尔类型", IsField: "true", ValueType: "BoolExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "BoolExpression", Parameters: [{ Description: "日期类型", IsField: "true", ValueType: "DateExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "BoolExpression", Parameters: [{ Description: "时间类型", IsField: "true", ValueType: "TimeExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "BoolExpression", Parameters: [{ Description: "数值类型", IsField: "true", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "BoolExpression", Parameters: [{ Description: "字符串类型", IsField: "true", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "是否为空", Category: "其他", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "IsNull" }], Catalog: "其他" }, { Data: [{ UseTypes: [{ ReturnValueType: "NumberExpression", Parameters: [{ Description: "数字", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }], Description: "返回给定数字表达式的绝对值。", Category: "数字", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "Abs" }, { UseTypes: [{ ReturnValueType: "NumberExpression", Parameters: [{ Description: "数字", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }], Description: "返回大于或等于所给数字表达式的最小整数。", Category: "数字", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "Ceiling" }, { UseTypes: [{ ReturnValueType: "NumberExpression", Parameters: [{ Description: "数字", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }], Description: "返回小于或等于所给数字表达式的最大整数。", Category: "数字", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "Floor" }, { UseTypes: [{ ReturnValueType: "NumberExpression", Parameters: [{ Description: "数字", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "NumberExpression", Parameters: [{ Description: "数字", IsField: "false", ValueType: "NumberExpression" }, { Description: "精度", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }], Description: "返回数字表达式并四舍五入为指定的长度或精度。", Category: "数字", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "Round" }, { UseTypes: [{ ReturnValueType: "NumberExpression", Parameters: [{ Description: "字符串", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "转换成数字", Category: "数字", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "To_Number" }], Catalog: "数字" }, { Data: [{ UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "字符串", IsField: "false", ValueType: "StringExpression" }, { Description: "长度", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }], Description: "返回从字符串左边开始指定个数的字符。", Category: "字符", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "Left" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "字符串", IsField: "false", ValueType: "StringExpression" }, { Description: "长度", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }], Description: "返回字符串中从右边开始指定个数的字符。", Category: "字符", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "Right" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "字符串", IsField: "false", ValueType: "StringExpression" }, { Description: "起始位置", IsField: "false", ValueType: "NumberExpression" }, { Description: "长度", IsField: "false", ValueType: "NumberExpression" }, { Description: "替换字符串", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "删除指定长度的字符并在指定的起始点插入另一组字符。", Category: "字符", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "Stuff" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "字符串", IsField: "false", ValueType: "StringExpression" }, { Description: "起始位置", IsField: "false", ValueType: "NumberExpression" }, { Description: "长度", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }], Description: "截取子串", Category: "字符", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "SubString" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "字符串", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "将大写字符数据转换为小写字符数据后返回字符表达式。", Category: "字符", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "Lower" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "字符串", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "返回将小写字符数据转换为大写的字符表达式。", Category: "字符", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "Upper" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "字符串", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "删除起始空格后返回字符表达式。", Category: "字符", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "LTrim" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "字符串", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "截断所有尾随空格后返回一个字符串。", Category: "字符", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "RTrim" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "个数", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }], Description: "返回由重复的空格组成的字符串。", Category: "字符", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "Space" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "原始串", IsField: "false", ValueType: "StringExpression" }, { Description: "匹配串", IsField: "false", ValueType: "StringExpression" }, { Description: "替换串", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "用第三个表达式替换第一个字符串表达式中出现的所有第二个给定字符串表达式。", Category: "字符", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "Replace" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "字符串", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "截断所有首尾空格后返回一个字符串。", Category: "字符", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "Trim" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "数字", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "StringExpression", Parameters: [{ Description: "日期", IsField: "false", ValueType: "DateExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "StringExpression", Parameters: [{ Description: "时间", IsField: "false", ValueType: "TimeExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "StringExpression", Parameters: [{ Description: "日期", IsField: "false", ValueType: "DateExpression" }, { Description: "格式", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "StringExpression", Parameters: [{ Description: "时间", IsField: "false", ValueType: "TimeExpression" }, { Description: "格式", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "转换成字符串", Category: "字符", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "To_Char" }], Catalog: "字符" }, { Data: [{ UseTypes: [{ ReturnValueType: "DateExpression", Parameters: [], ReturnParameterType: "-1" }], Description: "获取系统日期", Category: "日期和时间", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "SysDate" }, { UseTypes: [{ ReturnValueType: "TimeExpression", Parameters: [], ReturnParameterType: "-1" }], Description: "获取系统时间", Category: "日期和时间", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "SysTime" }, { UseTypes: [{ ReturnValueType: "DateExpression", Parameters: [{ Description: "字符串", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "转换成日期", Category: "日期和时间", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "To_Date" }, { UseTypes: [{ ReturnValueType: "TimeExpression", Parameters: [{ Description: "字符串", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "转换成时间", Category: "日期和时间", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "To_Time" }, { UseTypes: [{ ReturnValueType: "NumberExpression", Parameters: [{ Description: "起始日期时间", IsField: "false", ValueType: "TimeExpression" }, { Description: "结束日期时间", IsField: "false", ValueType: "TimeExpression" }, { Description: "计算单位(年、月、天、小时)", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "计算日期时间差", Category: "日期和时间", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "DateTime_Diff" }, { UseTypes: [{ ReturnValueType: "NumberExpression", Parameters: [{ Description: "起始日期", IsField: "false", ValueType: "DateExpression" }, { Description: "结束日期", IsField: "false", ValueType: "DateExpression" }, { Description: "计算单位(年、月、天)", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "计算日期差", Category: "日期和时间", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "Date_Diff" }], Catalog: "日期和时间" }, { Data: [{ UseTypes: [{ ReturnValueType: "NumberExpression", Parameters: [{ Description: "判断条件", IsField: "false", ValueType: "BoolExpression" }, { Description: "数字", IsField: "false", ValueType: "NumberExpression" }, { Description: "数字", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "BoolExpression", Parameters: [{ Description: "判断条件", IsField: "false", ValueType: "BoolExpression" }, { Description: "bool类型返回值", IsField: "false", ValueType: "BoolExpression" }, { Description: "bool类型返回值", IsField: "false", ValueType: "BoolExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "StringExpression", Parameters: [{ Description: "判断条件", IsField: "false", ValueType: "BoolExpression" }, { Description: "字符串", IsField: "false", ValueType: "StringExpression" }, { Description: "字符串", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "DateExpression", Parameters: [{ Description: "判断条件", IsField: "false", ValueType: "BoolExpression" }, { Description: "日期", IsField: "false", ValueType: "DateExpression" }, { Description: "日期", IsField: "false", ValueType: "DateExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "TimeExpression", Parameters: [{ Description: "判断条件", IsField: "false", ValueType: "BoolExpression" }, { Description: "时间", IsField: "false", ValueType: "TimeExpression" }, { Description: "时间", IsField: "false", ValueType: "TimeExpression" }], ReturnParameterType: "-1" }], Description: "枚举情况", Category: "集合", NamespaceName: "PanRunExpressionFunction", AssemblyName: "PanRunExpressionFunction", ClassName: "ExpressionRunFunction", Name: "IIF" }], Catalog: "集合" }, { Data: [{ UseTypes: [{ ReturnValueType: "BoolExpression", Parameters: [{ Description: "SQL语句", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "在数据库中执行SQL，返回布尔类型单值", Category: "数据库操作", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "DBProcess", Name: "ExecuteSqlReturnBool" }, { UseTypes: [{ ReturnValueType: "TimeExpression", Parameters: [{ Description: "SQL语句", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "在数据库中执行SQL，返回时间单值", Category: "数据库操作", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "DBProcess", Name: "ExecuteSqlReturnTime" }, { UseTypes: [{ ReturnValueType: "DateExpression", Parameters: [{ Description: "SQL语句", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "在数据库中执行SQL，返回日期单值", Category: "数据库操作", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "DBProcess", Name: "ExecuteSqlReturnDate" }, { UseTypes: [{ ReturnValueType: "NumberExpression", Parameters: [{ Description: "SQL语句", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "在数据库中执行SQL，返回数值单值", Category: "数据库操作", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "DBProcess", Name: "ExecuteSqlReturnNumber" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "SQL语句", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "在数据库中执行SQL，返回字符串单值", Category: "数据库操作", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "DBProcess", Name: "ExecuteSqlReturnString" }, { UseTypes: [{ ReturnValueType: "BoolExpression", Parameters: [{ Description: "存储过程名称", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "运行存储过程", Category: "数据库操作", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "DBProcess", Name: "RunWorkflowProcedure" }], Catalog: "数据库操作" }, { Data: [{ UseTypes: [{ ReturnValueType: "BoolExpression", Parameters: [{ Description: "单据类型", IsField: "false", ValueType: "StringExpression" }, { Description: "业务表记录ID", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "BoolExpression", Parameters: [], ReturnParameterType: "-1" }], Description: "判断制单人是否是其部门的负责人", Category: "工作流流转判断条件", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "WorkflowCondition", Name: "CheckCreatorIsOrgManager" }], Catalog: "工作流流转判断条件" }, { Data: [{ UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "角色编码", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "获取角色对应的用户ID", Category: "指定审批人", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "AppointCheckerOnServer", Name: "FindUserByRoleCode" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "部门编码", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "根据部门编码获取部门负责人ID", Category: "指定审批人", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "AppointCheckerOnServer", Name: "FindManagerByOrgCode" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "部门Id", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }], Description: "根据部门ID获取部门负责人ID", Category: "指定审批人", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "AppointCheckerOnServer", Name: "FindManagerByOrgId" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "单据类型", IsField: "false", ValueType: "StringExpression" }, { Description: "业务表记录ID", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }], Description: "获取单据制单人所属部门的部门负责人ID", Category: "指定审批人", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "AppointCheckerOnServer", Name: "FindDocumentCreatorOrgManager" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "部门ID", IsField: "false", ValueType: "NumberExpression" }, { Description: "岗位ID", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "StringExpression", Parameters: [{ Description: "部门ID", IsField: "false", ValueType: "NumberExpression" }, { Description: "岗位名称", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "StringExpression", Parameters: [{ Description: "部门名称", IsField: "false", ValueType: "StringExpression" }, { Description: "岗位名称", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }, { ReturnValueType: "StringExpression", Parameters: [{ Description: "部门ID", IsField: "false", ValueType: "NumberExpression" }, { Description: "所属公司‘@’", IsField: "false", ValueType: "StringExpression" }, { Description: "岗位名称", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "获取某部门中，某岗位上对应的审批人ID（+4重载）", Category: "指定审批人", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "AppointCheckerOnServer", Name: "GetApproverByOrgAndJob" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "表名", IsField: "false", ValueType: "StringExpression" }, { Description: "查询字段名", IsField: "false", ValueType: "StringExpression" }, { Description: "查询值", IsField: "false", ValueType: "StringExpression" }, { Description: "返回字段名", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "根据某字段值查询某数据表中对应的值", Category: "指定审批人", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "AppointCheckerOnServer", Name: "GetApproverByQueryValue" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "项目Id", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }], Description: "根据项目ID获取项目负责人ID，并指定为审批人", Category: "指定审批人", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "AppointCheckerOnServer", Name: "FindManagerByProId" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "用户Code,可以输入多个用户Code,中间要用,隔开", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "按照用户方式设置审批人表达式", Category: "指定审批人", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "AppointCheckerOnServer", Name: "AppointCheckerByUserCode" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "单据类型", IsField: "false", ValueType: "StringExpression" }, { Description: "单据ID", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }], Description: "根据单据ID获取制单人ID", Category: "指定审批人", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "AppointCheckerOnServer", Name: "GetDocCreator" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "BPM流程节点编码", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "根据单据ID获取制单人ID", Category: "指定审批人", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "AppointCheckerOnServer", Name: "AppointByCheckerGroup" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "部门Code,不可以输入多个", IsField: "false", ValueType: "StringExpression" }, { Description: "岗位Code,不可以输入多个", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "根据部门编码、岗位编码获取审批人", Category: "指定审批人", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "AppointCheckerOnServer", Name: "AppointByPostCode" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "部门id,不可以输入多个", IsField: "false", ValueType: "NumberExpression" }, { Description: "岗位id,不可以输入多个", IsField: "false", ValueType: "NumberExpression" }], ReturnParameterType: "-1" }], Description: "根据部门编码、岗位编码获取审批人", Category: "指定审批人", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "AppointCheckerOnServer", Name: "AppointByPost" }], Catalog: "指定审批人" }, { Data: [{ UseTypes: [{ ReturnValueType: "BoolExpression", Parameters: [{ Description: "处理功能名称", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "运行处理功能", Category: "处理功能", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "ProcessExecutive", Name: "RunServerExecutive" }], Catalog: "处理功能" }, { Data: [{ UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [], ReturnParameterType: "-1" }], Description: "获取所有部门负责人", Category: "OA指定审批人", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "OAGetChecker", Name: "GetALLManager" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [], ReturnParameterType: "-1" }], Description: "获取本部门员工", Category: "OA指定审批人", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "OAGetChecker", Name: "GetALLUserByOrg" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [], ReturnParameterType: "-1" }], Description: "获取本部门负责人", Category: "OA指定审批人", NamespaceName: "PanSchema.Server.Common", AssemblyName: "PanSchema.Server.Common", ClassName: "OAGetChecker", Name: "GetMyOrgManager" }], Catalog: "OA指定审批人" }, { Data: [{ UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "处理方式(0:申请1:支付2:其他付款3:集中付款)", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "根据单据处理方式找到预算归口部门负责人", Category: "预算审批人", NamespaceName: "BudgetManChecker", AssemblyName: "BudgetManChecker", ClassName: "BudgetManagerChecker", Name: "BMOrgCheckers" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "处理方式(0:申请1:支付2:其他付款3:集中付款)", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "根据单据处理方式找到预算项目负责人", Category: "预算审批人", NamespaceName: "BudgetManChecker", AssemblyName: "BudgetManChecker", ClassName: "BudgetManagerChecker", Name: "BMLeadCheckers" }], Catalog: "预算审批人" }, { Data: [{ UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [], ReturnParameterType: "-1" }], Description: "找到预算归口负责人（多人）", Category: "预算归口负责人审批人", NamespaceName: "BudgetManChecker", AssemblyName: "BudgetManChecker", ClassName: "BudgetManagerChecker", Name: "BudgetGKCheckers" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [], ReturnParameterType: "-1" }], Description: "找到预算归口负责领导（多人）", Category: "预算归口负责人审批人", NamespaceName: "BudgetManChecker", AssemblyName: "BudgetManChecker", ClassName: "BudgetManagerChecker", Name: "BudgetGKCheckers2" }], Catalog: "预算归口负责人审批人" }, { Data: [{ UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [], ReturnParameterType: "-1" }], Description: "财务主任审批过滤", Category: "财务主任审批", NamespaceName: "BudgetManChecker", AssemblyName: "BudgetManChecker", ClassName: "BudgetManagerChecker", Name: "TreasurerCheck" }], Catalog: "财务主任审批" }, { Data: [{ UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [], ReturnParameterType: "-1" }], Description: "课题分类归口审批人审批", Category: "课题分类归口审批", NamespaceName: "BudgetManChecker", AssemblyName: "BudgetManChecker", ClassName: "BudgetManagerChecker", Name: "TopicGKChecker" }, { UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [], ReturnParameterType: "-1" }], Description: "课题分类归口分管领导审批", Category: "课题分类归口审批", NamespaceName: "BudgetManChecker", AssemblyName: "BudgetManChecker", ClassName: "BudgetManagerChecker", Name: "TopicGKLeaderChecker" }], Catalog: "课题分类归口审批" }, { Data: [{ UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "部门id，多个id请用逗号分隔", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "根据部门id找部门负责人", Category: "特定部门审批人", NamespaceName: "BudgetManChecker", AssemblyName: "BudgetManChecker", ClassName: "BudgetManagerChecker", Name: "BMDeptManager" }], Catalog: "特定部门审批人" }, { Data: [{ UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [{ Description: "岗位名称", IsField: "false", ValueType: "StringExpression" }], ReturnParameterType: "-1" }], Description: "获取制单人所在部门的经费管理员", Category: "经费管理员", NamespaceName: "SpecifyCheckUser", AssemblyName: "SpecifyCheckUser", ClassName: "CheckUser", Name: "GetOrgAgent" }], Catalog: "经费管理员" }, { Data: [{ UseTypes: [{ ReturnValueType: "BoolExpression", Parameters: [], ReturnParameterType: "-1" }], Description: "单据是否包含某预算", Category: "单据是否包含某预算", NamespaceName: "BudgetManChecker", AssemblyName: "BudgetManChecker", ClassName: "BudgetManagerChecker", Name: "IsHasSomeBudget" }], Catalog: "单据是否包含某预算" }, { Data: [{ UseTypes: [{ ReturnValueType: "StringExpression", Parameters: [], ReturnParameterType: "-1" }], Description: "合同审批使用部门负责人", Category: "合同审批使用部门负责人", NamespaceName: "BudgetManChecker", AssemblyName: "BudgetManChecker", ClassName: "BudgetManagerChecker", Name: "ContractApprovalUserOrgPeo" }], Catalog: "合同审批使用部门负责人" }] };
    },
  },
  {
    url: "/api/Expression/ValidateExpression",
    method: "POST",
    response: () => {
      return { Code: "S", Success: true, Message: "", Result: null, data: { Succeed: true, PSM: " @Field_PaymentAmount > 10000", ParameterXml: "<SideParameter><Parameter Name=\"Field_PaymentAmount\" FieldName=\"PaymentAmount\" Type=\"decimal\" /></SideParameter>", UsedFields: ["Rate_ExpendApply.PaymentAmount"], UsedParameters: [] } };
    },
  },
  {
    url: "/api/Model/GetSheetWindowMainCardModel",
    method: "POST",
    response: () => {
      return { Name: "Rate_ExpendApply", CName: "出差报销", Description: "出差报销", Fields: [{ Name: "BillCode", CName: "单据编号", Type: "String", Description: "单据编号" }, { Name: "CreateDate", CName: "报销日期", Type: "Date", Description: "报销日期" }, { Name: "CreateCode", CName: "报销人编号", Type: "String", Description: "报销人编号" }, { Name: "CreateCode_Xid", CName: "报销人编号_Xid", Type: "LongInteger", Description: "Key:报销人编号" }, { Name: "CreateMan", CName: "报销人", Type: "String", Description: "报销人" }, { Name: "OrgCode", CName: "部门编码", Type: "String", Description: "部门编码" }, { Name: "OrgCode_Xid", CName: "部门编码_Xid", Type: "LongInteger", Description: "Key:部门编码" }, { Name: "OrgName", CName: "部门名称", Type: "String", Description: "部门名称" }, { Name: "ApplyReason", CName: "详细事由", Type: "String", Description: "详细事由" }, { Name: "PaymentAmount", CName: "报销金额", Type: "Size", Description: "报销金额" }, { Name: "Notes", CName: "备注", Type: "String", Description: "备注" }, { Name: "AnnexPage", CName: "附件张数", Type: "Size", Description: "附件张数" }, { Name: "BillPrefix", CName: "单据前缀", Type: "String", Description: "单据前缀" }, { Name: "ApplyAmount", CName: "申请金额", Type: "Size", Description: "申请金额" }, { Name: "ID", CName: "ID", Type: "LongInteger", Description: "ID" }, { Name: "ComCode", CName: "单位编码", Type: "String", Description: "单位编码" }, { Name: "ComCode_Xid", CName: "单位编码_Xid", Type: "LongInteger", Description: "Key:单位编码" }, { Name: "Company", CName: "所属单位", Type: "String", Description: "所属单位" }, { Name: "ApplyCode", CName: "事前申请单号", Type: "String", Description: "事前申请单号" }, { Name: "ApplyCode_Xid", CName: "事前申请单号_Xid", Type: "LongInteger", Description: "Key:事前申请单号" }, { Name: "CapitalAmount", CName: "金额大写", Type: "String", Description: "金额大写" }, { Name: "ApplyDate", CName: "申请日期", Type: "Date", Description: "申请日期" }, { Name: "ApplyMan", CName: "申请人", Type: "String", Description: "申请人" }, { Name: "ApplyOrgName", CName: "申请部门", Type: "String", Description: "申请部门" }, { Name: "InCityCount", CName: "市内行程数", Type: "Size", Description: "市内行程数" }, { Name: "InProvinceCount", CName: "省内行程数", Type: "Size", Description: "省内行程数" }, { Name: "OutProvinceCount", CName: "省外行程数", Type: "Size", Description: "省外行程数" }, { Name: "IsKYJF", CName: "是否科研经费", Type: "Boolean", Description: "是否科研经费" }] };
    },
  },
];
