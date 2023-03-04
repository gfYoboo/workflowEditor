<template>
  <el-dialog v-model="showDlg" title="编辑表达式" width="65%" top="10vh" :close-on-click-modal="false" destroy-on-close
    @open="dlgOpen">
    <div class="qyui-cell row qyui-container">
      <div class="qyui-cell">
        <el-input ref="exp" v-model="data.Expression" type="textarea" :rows="5" placeholder @change="handleChange" />
      </div>
      <div class="qyui-cell pd4">
        <el-button-group>
          <el-button v-for="item in data.OperatorList" :key="item.Name" @click="insertText(item.Name)">{{ item.Name
          }}</el-button>
        </el-button-group>
      </div>
      <div class="qyui-cell" style="height: 300px">
        <div class="qyui-cell col">
          <div class="qyui-cell row bd pd4">
            <el-tabs v-model="data.activeTabName" class="exp_tab" type="border-card" tab-position="left"
              style="height: 100%">
              <el-tab-pane name="data" label="数据集" style="height: 100%; overflow: auto">

                <el-tree :data="data.dataTreeData" node-key="title" :expand-on-click-node="false" default-expand-all
                  highlight-current @node-click="handleNodeClick" />

              </el-tab-pane>
              <el-tab-pane name="func" label="函数">
                <el-tree :data="data.funcTreeData" node-key="id" default-expand-all highlight-current
                  @node-click="handleFuncNodeClick" />
              </el-tab-pane>
              <el-tab-pane name="param" label="参数">
                <el-tree :data="data.ParamTreeData" node-key="title" :props="data.paramProps" default-expand-all
                  highlight-current @node-click="handleNodeClick" />
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="qyui-cell row bd pd4">
            <div v-if="data.activeTabName !== 'data'" class="qyui-cell row bdb">
              <ul class="qyui-ul">
                <li v-for="item in data.FuncList" :key="item.Name"
                  :class="{ current: data.currentItem.Name === item.Name }" @click="handleFuncClick(item)"
                  @dblclick="handleFuncDbClick(item)">{{ item.Name }}</li>
              </ul>
            </div>
            <div class="qyui-cell row">
              <div style="height: 100%; overflow: auto" v-html="data.desc"></div>
            </div>
          </div>
        </div>
        <div class="qyui-cell" style="width: 30%">
          <el-table :data="data.errorsList">
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
        <el-button type="warning" @click="handleValidateExpression">验 证</el-button>

        <el-button type="primary" @click="handleConfirm">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { inject } from 'vue';

import {
  GetExpressionOperatorList,
  GetExpressionFunctionList,
  ValidateExpression as ValidateExpressionApi,
  GetSheetWindowMainCardModel as GetSheetWindowMainCardModelApi,
} from '@/api/expression';
import { ElMessage } from 'element-plus';

const manager = inject('manager');

const exp = ref();

const data = reactive({
  Expression: '',
  PsmExpression: '',
  ParameterXml: '',
  SheetWindowName: '',
  UseEnName: false,
  Changed: false,
  Parameters: null,
  activeTabName: 'data',
  desc: '',
  timer: '',
  treeClickCount: 0,
  OperatorList: [],
  dataTreeData: [],
  funcTreeData: [],
  ParamTreeData: [],
  paramProps: {
    id: 'title',
    label: 'desc',
  },
  FuncList: [],
  errorsList: [],
  currentItem: '',
});

let showDlg = computed({
  set(val) {
    manager.states.expression.ShowExpDlg = val;
  },
  get() {
    return manager.expression.ShowExpDlg;
  },
});
watch(() => data.activeTabName, () => {
  data.desc = '';
});

function handleCancel() {
  showDlg.value = false;
}
function dlgOpen() {
  manager.SetSheetWindowName();

  data.SheetWindowName = manager.CurrentSheetWindowName;
  data.Expression = manager.expression.Expression;
  data.PsmExpression = manager.expression.PsmExpression;
  data.ParameterXml = manager.expression.ParameterXml;
  init();
}
async function init() {
  if (data.OperatorList.length === 0) {
    const res = await GetExpressionOperatorList();
    data.OperatorList = res.Data;
  }
  if (data.funcTreeData.length === 0) {
    const resFunc = await GetExpressionFunctionList();
    if (resFunc.Data && resFunc.Data.length > 0) {
      const funcList = [];
      resFunc.Data.forEach((item) => {
        funcList.push({
          id: item.Catalog,
          label: item.Catalog,
          list: item.Data,
        });
      });
      data.funcTreeData = funcList;
    }
  }
  if (data.ParamTreeData.length === 0) {
    data.ParamTreeData = [
      { title: 'CurrentUserName', desc: '当前用户名', type: '字符串' },
      { title: 'CurrentUserCode', desc: '当前用户编码', type: '字符串' },
      { title: 'CurrentUserID', desc: '当前用户ID', type: '数字' },
      { title: 'CurrentUserRole', desc: '当前角色名', type: '字符串' },
      {
        title: 'CurrentUserRoleCode',
        desc: '当前角色编码',
        type: '字符串',
      },
      { title: 'CurrentUserRoleID', desc: '当前角色ID', type: '字符串' },
      { title: 'CurrentWindowRecordID', desc: '当前记录ID', type: '数字' },
      { title: 'CurrentDocType', desc: '当前单据类型', type: '字符串' },
    ];
  }

  const dataTree = await GetSheetWindowMainCardModel();
  dataTree.forEach((item) => {
    item.label = item.title;
    item.children.forEach((child) => {
      child.label = child.title.replace(item.title + '.', '');
    });
  });
  data.dataTreeData = dataTree;
}

async function GetSheetWindowMainCardModel() {
  const backInfo = await GetSheetWindowMainCardModelApi(
    data.SheetWindowName,
    data.UseEnName,
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
      obj.title = collObj.title + '.' + fieldListNode[i].CName;
      obj.type = TranslateFieldType(fieldListNode[i].Type);
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
}
function insertText(text) {
  console.log('exp.value', exp.value);
  const textarea = exp.value.$refs.textarea;
  if (textarea.selectionStart || textarea.selectionStart === 0) {
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    data.Expression =
      textarea.value.substring(0, startPos) +
      text +
      textarea.value.substring(endPos, textarea.value.length);
    nextTick(() => {
      textarea.focus();
      textarea.setSelectionRange(
        endPos + text.length,
        endPos + text.length,
      );
    });
  } else {
    data.Expression += text;
  }
}
function handleChange() {
  data.Changed = true;
}
function handleNodeClick(nodeData, node) {
  data.treeClickCount++;
  data.timer = window.setTimeout(() => {
    if (data.treeClickCount === 1) {
      // 把次数归零
      data.treeClickCount = 0;
      // 单击事件处理
      let dataCollDescHtml = '<dt>' + nodeData.title + '</dt>';
      if (nodeData.type) {
        dataCollDescHtml += '<dt>类型：' + nodeData.type + '</dt>';
      }
      if (data.desc) {
        dataCollDescHtml += '<dt>描述：' + nodeData.desc + '</dt>';
      }
      data.desc = dataCollDescHtml;
    } else if (data.treeClickCount > 1) {
      // 把次数归零
      data.treeClickCount = 0;
      if (nodeData.children && nodeData.children.length > 0) {
        return false;
      } else {
        insertText(nodeData.title);
      }
    }
  }, 300);
}
function handleFuncNodeClick(d, n) {
  data.FuncList = d.list;
}
function handleFuncClick(item) {
  data.currentItem = item;
  let html = '<p>' + item.Name + ' ' + item.Description + '</p>';
  if (item.UseTypes && item.UseTypes.length > 0) {
    for (let i = 0; i < item.UseTypes.length; i++) {
      html += '<p>---------- 用法(' + i + ') ----------</p>';
      html +=
        '<p>返回值类型：' +
        TranslateReturnValueType(item.UseTypes[i].ReturnValueType) +
        '.</p>';
      html += '<dl class="parameter"><dt>参数:</dt>';
      const paras = item.UseTypes[i].Parameters;
      if (paras && paras.length > 0) {
        for (let j = 0; j < paras.length; j++) {
          html +=
            '<dd>' +
            (j + 1) +
            ') ' +
            TranslateReturnValueType(paras[j].ValueType) +
            ' ' +
            paras[j].Description +
            '</dd>';
        }
      }
      html += ' </dl>';
    }
  }
  data.desc = html;
}
function handleFuncDbClick(item) {
  insertText(item.Name);
}
async function handleValidateExpression() {
  data.errorsList = [];
  const result = await ValidateExpressionApi();
  if (result && result.Succeed) {
    data.errorsList = [{ text: '验证成功！' }];

    data.Changed = false;
    // data.Expression = data.Expression;
    data.PsmExpression = Escape2Html(result.PsmExpression);
    data.ParameterXml = Escape2Html(result.ParameterXml);
  } else {
    data.Changed = true;
    data.errorsList = result.Errors;
    ElMessage({
      message: '验证失败，请看错误信息进行修改！',
      type: 'info',
    });
  }
}

async function ValidateExpression() {
  if (data.Expression) {
    const param = {
      SheetWindowName: data.SheetWindowName,
      Expression: data.Expression,
      ResultType: manager.expression.ResultType,
      Parameters: data.Parameters,
      UseDefaultParameters: true,
      UseEnName: data.UseEnName,
      RunOnDB: false,
      RunOnServer: true,
      RunAsJS: true,
    };
    const res = await ValidateExpression(param);
    if (res && res.Code === 'S') {
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
        PsmExpression: '',
        ParameterXml: '',
        Errors: [{ text: '调用服务器端程序发生异常' }],
      };
    }
  } else {
    return {
      Succeed: true,
      PsmExpression: '',
      ParameterXml: '',
      Errors: [],
    };
  }
}
function TranslateFieldType(type) {
  switch (type.toLowerCase()) {
    case 'string': {
      return '字符串';
    }
    case 'date': {
      return '日期';
    }
    case 'time':
    case 'datetime': {
      return '时间';
    }
    case 'decimal':
    case 'integer':
    case 'long':
    case 'number':
    case 'longinteger':
    case 'size':
    case 'double':
    case 'float': {
      return '数字';
    }
    case 'bool':
    case 'boolean': {
      return '是/否';
    }
    default: {
      ElMessage({
        message: 'Error: GetCardFieldType ' + type,
        type: 'error',
      });

      return '字符串';
    }
  }
}
function TranslateReturnValueType(type) {
  switch (type.toLowerCase()) {
    case 'boolexpression': {
      return '是/否';
    }
    case 'numberexpression': {
      return '数字';
    }
    case 'stringexpression': {
      return '字符串';
    }
    case 'dateexpression': {
      return '日期';
    }
    case 'TimeExpression': {
      return '时间';
    }
    default: {
      return '';
    }
  }
}
function Escape2Html(str) {
  const arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
    return arrEntities[t];
  });
}
async function handleConfirm() {
  await handleValidateExpression();
  if (data.errorsList.length > 0) {
    if (data.Changed) {
      ElMessage({
        message: '表达式存在错误，请先修改正确',
        type: 'info',
      });
      return;
    }
  }
  manager.expcallback({
    Expression: data.Expression,
    PsmExpression: data.PsmExpression,
    ParameterXml: data.ParameterXml,
  });

  showDlg.value = false;
}

</script>

<style scoped >
.exp_tab .el-tabs__content {
  height: 100% !important;
  overflow: auto !important;
  padding: 0 !important;
}

.exp_tab .el-tabs__header.is-left {
  margin-right: 0 !important;
}

.exp_tab .el-tree-node.is-expanded.is-current>.el-tree-node__content>.el-tree-node__label {
  color: #1e9fff;
}
</style>
