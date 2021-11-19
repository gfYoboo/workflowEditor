<template>
  <el-dialog
    v-model="showDlg"
    title="编辑表达式"
    width="65%"
    :close-on-click-modal="false"
    destroy-on-close
    @open="dlgOpen"
  >
    <div class="qyui-cell row qyui-container">
      <div class="qyui-cell">
        <el-input
          ref="exp"
          v-model="Expression"
          type="textarea"
          :rows="5"
          placeholder
          @change="handleChange"
        />
      </div>
      <div class="qyui-cell pd4">
        <el-button-group>
          <el-button
            v-for="item in OperatorList"
            :key="item.Name"
            @click="insertText(item.Name)"
          >{{ item.Name }}</el-button>
        </el-button-group>
      </div>
      <div class="qyui-cell col" style="height: 300px">
        <div class="qyui-cell col">
          <div class="qyui-cell row bd pd4">
            <el-tabs
              v-model="activeTabName"
              class="exp_tab"
              type="border-card"
              tab-position="left"
              style="height: 100%"
            >
              <el-tab-pane
                name="data"
                label="数据集"
                style="height: 100%; overflow: auto"
              >
                <el-scrollbar>
                  <el-tree
                    :data="dataTreeData"
                    node-key="title"
                    :expand-on-click-node="false"
                    default-expand-all
                    highlight-current
                    @node-click="handleNodeClick"
                  />
                </el-scrollbar>
              </el-tab-pane>
              <el-tab-pane name="func" label="函数">
                <el-tree
                  :data="funcTreeData"
                  node-key="id"
                  default-expand-all
                  highlight-current
                  @node-click="handleFuncNodeClick"
                />
              </el-tab-pane>
              <el-tab-pane name="param" label="参数">
                <el-tree
                  :data="ParamTreeData"
                  node-key="title"
                  :props="paramProps"
                  default-expand-all
                  highlight-current
                  @node-click="handleNodeClick"
                />
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="qyui-cell row bd pd4">
            <div v-if="activeTabName !== 'data'" class="qyui-cell row bdb">
              <ul class="qyui-ul">
                <li
                  v-for="item in FuncList"
                  :key="item.Name"
                  :class="{ current: currentItem.Name === item.Name }"
                  @click="handleFuncClick(item)"
                  @dblclick="handleFuncDbClick(item)"
                >
                  {{ item.Name }}
                </li>
              </ul>
            </div>
            <div class="qyui-cell row">
              <div style="height: 100%; overflow: auto" v-html="desc"></div>
            </div>
          </div>
        </div>
        <div class="qyui-cell" style="width: 30%">
          <el-table :data="errorsList">
            <el-table-column type="index" label="序号" width="60px" />
            <el-table-column label="信息" prop="text" />
          </el-table>
        </div>
      </div>
      <!-- <div class="qyui-cell bdt"
           style="height: 40px;">
        <div class="qyui-cell row"
             style="align-items: flex-end;">
          <div>
            <el-button type="warning"
                       @click="handleValidateExpression">验 证</el-button>
            <el-button type="primary"
                       @click="handleConfirm">确 定</el-button>
            <el-button @click="handleCancel">取 消</el-button>
          </div>

        </div>
      </div>-->
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="warning"
          @click="handleValidateExpression"
        >验 证</el-button>

        <el-button type="primary" @click="handleConfirm">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import {
  GetExpressionOperatorList,
  GetExpressionFunctionList,
  ValidateExpression,
  GetSheetWindowMainCardModel,
} from "@/api/expression";
export default {
  data() {
    return {
      Expression: "",
      PsmExpression: "",
      ParameterXml: "",

      SheetWindowName: "",
      UseEnName: false,
      Changed: false,
      Parameters: null,
      activeTabName: "data",
      desc: "",
      timer: "",
      treeClickCount: 0,
      OperatorList: [],
      dataTreeData: [],
      funcTreeData: [],
      ParamTreeData: [],
      paramProps: {
        id: "title",
        label: "desc",
      },
      FuncList: [],
      errorsList: [],
      currentItem: "",
    };
  },
  computed: {
    ...mapState({
      showExpDlg: (state) => state.expression.showExpDlg,
      ExpType: (state) => state.expression.ExpType,
      ResultType: (state) => state.expression.ResultType,
      ExpressionStore: (state) => state.expression.Expression,
      PsmExpressionStore: (state) => state.expression.PsmExpression,
      ParameterXmlStore: (state) => state.expression.ParameterXml,
      CurrentSheetWindowName: (state) => state.CurrentSheetWindowName,
    }),
    showDlg: {
      get() {
        return this.showExpDlg;
      },
      set(data) {
        this.$store.commit("expression/setExpDlgState", data);
      },
    },
  },
  watch: {
    activeTabName() {
      this.desc = "";
    },
  },
  methods: {
    handleCancel() {
      this.showDlg = false;
    },
    dlgOpen() {
      this.$store.commit("setSheetWindowName");
      this.SheetWindowName = this.CurrentSheetWindowName;
      this.Expression = this.ExpressionStore;
      this.PsmExpression = this.PsmExpressionStore;
      this.ParameterXml = this.ParameterXmlStore;
      this.init();
    },
    async init() {
      if (this.OperatorList.length === 0) {
        const res = await GetExpressionOperatorList();
        this.OperatorList = res.Data;
      }
      if (this.funcTreeData.length === 0) {
        const resFunc = await GetExpressionFunctionList();
        if (resFunc.Success && resFunc.Data && resFunc.Data.length > 0) {
          const funcList = [];
          resFunc.Data.forEach((item) => {
            funcList.push({
              id: item.Catalog,
              label: item.Catalog,
              list: item.Data,
            });
          });
          this.funcTreeData = funcList;
        }
      }
      if (this.ParamTreeData.length === 0) {
        this.ParamTreeData = [
          { title: "CurrentUserName", desc: "当前用户名", type: "字符串" },
          { title: "CurrentUserCode", desc: "当前用户编码", type: "字符串" },
          { title: "CurrentUserID", desc: "当前用户ID", type: "数字" },
          { title: "CurrentUserRole", desc: "当前角色名", type: "字符串" },
          {
            title: "CurrentUserRoleCode",
            desc: "当前角色编码",
            type: "字符串",
          },
          { title: "CurrentUserRoleID", desc: "当前角色ID", type: "字符串" },
          { title: "CurrentWindowRecordID", desc: "当前记录ID", type: "数字" },
          { title: "CurrentDocType", desc: "当前单据类型", type: "字符串" },
        ];
      }

      const dataTree = await this.GetSheetWindowMainCardModel();
      dataTree.forEach((item) => {
        item.label = item.title;
        item.children.forEach((child) => {
          child.label = child.title.replace(item.title + ".", "");
        });
      });
      this.dataTreeData = dataTree;
    },
    async GetSheetWindowMainCardModel() {
      const backInfo = await GetSheetWindowMainCardModel(
        this.SheetWindowName,
        this.UseEnName,
      );

      if (backInfo) {
        const CardModelList = [];
        const collObj = {};
        collObj.title = backInfo.CName;
        collObj.cardName = backInfo.Name;
        collObj.desc = backInfo.Description;
        const childArr = [];
        const fieldListNode = backInfo.Fields;
        for (let i = 0; i < fieldListNode.length; i++) {
          const obj = {};
          obj.title = collObj.title + "." + fieldListNode[i].CName;
          obj.type = this.TranslateFieldType(fieldListNode[i].Type);
          obj.desc = fieldListNode[i].Description;
          obj.children = [];
          childArr.push(obj);
        }
        collObj.children = childArr;
        CardModelList.push(collObj);

        return CardModelList;
      } else {
        return [];
      }
    },
    insertText(text) {
      const textarea = this.$refs.exp.$refs.textarea;
      if (textarea.selectionStart || textarea.selectionStart === 0) {
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        this.Expression =
          textarea.value.substring(0, startPos) +
          text +
          textarea.value.substring(endPos, textarea.value.length);
        this.$nextTick(function() {
          textarea.focus();
          textarea.setSelectionRange(
            endPos + text.length,
            endPos + text.length,
          );
        });
      } else {
        this.Expression += text;
      }
    },
    handleChange() {
      this.Changed = true;
    },
    handleNodeClick(data, node) {
      this.treeClickCount++;
      const self = this;
      this.timer = window.setTimeout(function() {
        if (self.treeClickCount === 1) {
          // 把次数归零
          self.treeClickCount = 0;
          // 单击事件处理
          let dataCollDescHtml = "<dt>" + data.title + "</dt>";
          if (data.type) {
            dataCollDescHtml += "<dt>类型：" + data.type + "</dt>";
          }
          if (data.desc) {
            dataCollDescHtml += "<dt>描述：" + data.desc + "</dt>";
          }
          self.desc = dataCollDescHtml;
        } else if (self.treeClickCount > 1) {
          // 把次数归零
          self.treeClickCount = 0;
          if (data.children && data.children.length > 0) {
            return false;
          } else {
            self.insertText(data.title);
          }
        }
      }, 300);
    },
    handleFuncNodeClick(data, node) {
      this.FuncList = data.list;
    },
    handleFuncClick(item) {
      this.currentItem = item;
      let html = "<p>" + item.Name + " " + item.Description + "</p>";
      if (item.UseTypes && item.UseTypes.length > 0) {
        for (let i = 0; i < item.UseTypes.length; i++) {
          html += "<p>---------- 用法(" + i + ") ----------</p>";
          html +=
            "<p>返回值类型：" +
            this.TranslateReturnValueType(item.UseTypes[i].ReturnValueType) +
            ".</p>";
          html += '<dl class="parameter"><dt>参数:</dt>';
          const paras = item.UseTypes[i].Parameters;
          if (paras && paras.length > 0) {
            for (let j = 0; j < paras.length; j++) {
              html +=
                "<dd>" +
                (j + 1) +
                ") " +
                this.TranslateReturnValueType(paras[j].ValueType) +
                " " +
                paras[j].Description +
                "</dd>";
            }
          }
          html += " </dl>";
        }
      }
      this.desc = html;
    },
    handleFuncDbClick(item) {
      this.insertText(item.Name);
    },
    async handleValidateExpression() {
      this.errorsList = [];
      const result = await this.ValidateExpression();
      if (result && result.Succeed) {
        this.errorsList = [{ text: "验证成功！" }];

        this.Changed = false;
        // this.Expression = this.Expression;
        this.PsmExpression = this.Escape2Html(result.PsmExpression);
        this.ParameterXml = this.Escape2Html(result.ParameterXml);
      } else {
        this.Changed = true;
        this.errorsList = result.Errors;
        this.$message({
          message: "验证失败，请看错误信息进行修改！",
          type: "info",
        });
      }
    },

    async ValidateExpression() {
      const param = {
        SheetWindowName: this.SheetWindowName,
        Expression: this.Expression,
        ResultType: this.ResultType,
        Parameters: this.Parameters,
        UseDefaultParameters: true,
        UseEnName: this.UseEnName,
        RunOnDB: false,
        RunOnServer: true,
        RunAsJS: false,
      };
      const res = await ValidateExpression(param);
      if (res && res.Code === "S") {
        const info = res.data;
        const psm = info.PSM;
        const parameterXml = info.ParameterXml;
        const errors = [];
        if (!info.Succeed) {
          const errorNodeList = info.Errors;
          for (let i = 0; i < errorNodeList.length; i++) {
            errors.push({ text: errorNodeList[i] });
          }
        }
        return {
          Succeed: info.Succeed,
          PsmExpression: psm,
          ParameterXml: parameterXml,
          Errors: errors,
        };
      } else {
        return {
          Succeed: false,
          PsmExpression: "",
          ParameterXml: "",
          Errors: [{ text: "调用服务器端程序发生异常" }],
        };
      }
    },
    TranslateFieldType(type) {
      switch (type.toLowerCase()) {
        case "string": {
          return "字符串";
        }
        case "date": {
          return "日期";
        }
        case "time":
        case "datetime": {
          return "时间";
        }
        case "decimal":
        case "integer":
        case "long":
        case "number":
        case "longinteger":
        case "size":
        case "double":
        case "float": {
          return "数字";
        }
        case "bool":
        case "boolean": {
          return "是/否";
        }
        default: {
          this.$message({
            message: "Error: GetCardFieldType " + type,
            type: "error",
          });

          return "字符串";
        }
      }
    },
    TranslateReturnValueType(type) {
      switch (type.toLowerCase()) {
        case "boolexpression": {
          return "是/否";
        }
        case "numberexpression": {
          return "数字";
        }
        case "stringexpression": {
          return "字符串";
        }
        case "dateexpression": {
          return "日期";
        }
        case "TimeExpression": {
          return "时间";
        }
        default: {
          return "";
        }
      }
    },
    Escape2Html(str) {
      const arrEntities = { lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"' };
      return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
        return arrEntities[t];
      });
    },
    handleConfirm() {
      this.handleValidateExpression();
      if (this.errorsList.length > 0) {
        if (this.Changed) {
          this.$message({
            message: "表达式存在错误，请先修改正确",
            type: "info",
          });

          return false;
        }
      }
      // if (this.Changed) {
      //     layer.msg("先点击“验证”进行验证，验证通过后点击确定按钮！");
      //     return false;
      // }

      this.$store.dispatch("expression/callback", {
        Expression: this.Expression,
        PsmExpression: this.PsmExpression,
        ParameterXml: this.ParameterXml,
      });

      this.$store.commit("expression/setExpDlgState", false);
    },

  },
};
</script>

<style  >
.exp_tab .el-tabs__content {
  height: 100% !important;
  overflow: auto !important;
  padding: 0 !important;
}
.exp_tab .el-tabs__header.is-left {
  margin-right: 0 !important;
}
.exp_tab
  .el-tree-node.is-expanded.is-current
  > .el-tree-node__content
  > .el-tree-node__label {
  color: #1e9fff;
}
</style>
