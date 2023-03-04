<template>
  <el-dialog v-model="showDlg" width="500px" title="边属性" :close-on-click-modal="false" destroy-on-close @open="openDlg">
    <el-form label-position="top" label-width="85px">
      <el-form-item label="描述">
        <el-input v-model="data.CurrentEdge.Description" type="textarea" :rows="2" resize="none" />
      </el-form-item>
      <el-form-item label="逻辑表达式">
        <el-input v-model="data.CurrentEdge.ConditionPIM" :readonly="true" type="textarea" :rows="3" resize="none" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleEdit">编辑表达式</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { inject } from 'vue';
const graph = inject('graph');
const manager = inject('manager');
const data = reactive({
  CurrentEdge: {
    Description: '',
    ConditionPIM: '',
    ConditionPSM: '',
    Parameter: '',
    DBID: '',
    NodeFrom_XID: '',
    NodeTo_XID: '',
    PointList: '',
  },
});

let showDlg = computed({
  set(val) {
    manager.edge.ShowEdgeDlg = val;
  },
  get() {
    return manager.edge.ShowEdgeDlg;
  },
});

function openDlg() {
  const cell = manager.CurrentCell;
  data.CurrentEdge = JSON.parse(JSON.stringify(cell.getData()));
}
function handleConfirm() {
  manager.CurrentCell.updateData(data.CurrentEdge);
  showDlg.value = false;
}
function handleCancel() {
  showDlg.value = false;
}
function handleEdit() {
  manager.EditExp({
    Expression: data.CurrentEdge.ConditionPIM,
    PsmExpression: data.CurrentEdge.ConditionPSM,
    ParameterXml: data.CurrentEdge.Parameter,
    ResultType: 'Boolean',
    callback: data.callbackExp,
  });
}
function callbackExp(data) {
  data.CurrentEdge.ConditionPIM = data.Expression;
  data.CurrentEdge.ConditionPSM = data.PsmExpression;
  data.CurrentEdge.Parameter = data.ParameterXml;
}

</script>

<style></style>
