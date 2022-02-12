<template>
  <el-dialog
    v-model="showDlg"
    width="500px"
    title="边属性"
    :close-on-click-modal="false"
    destroy-on-close
    @open="openDlg"
  >
    <el-form label-position="top" label-width="85px">
      <el-form-item label="描述">
        <el-input v-model="CurrentEdge.Description" type="textarea" :rows="2" resize="none" />
      </el-form-item>
      <el-form-item label="逻辑表达式">
        <el-input
          v-model="CurrentEdge.ConditionPIM"
          :readonly="true"
          type="textarea"
          :rows="3"
          resize="none"
        />
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

<script>
import { inject } from 'vue';

export default {
  setup() {
    const graph = inject('graph');
    const manager = inject('manager');
    return {
      graph,
      manager,
    };
  },
  data() {
    return {
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
    };
  },
  computed: {
    showDlg: {
      get() {
        return this.manager.edge.ShowEdgeDlg;
      },
      set(data) {
        this.manager.edge.ShowEdgeDlg = data;
      },
    },
  },
  methods: {
    openDlg() {
      const cell = this.manager.CurrentCell;
      this.CurrentEdge = JSON.parse(JSON.stringify(cell.getData()));
    },
    handleConfirm() {
      this.manager.CurrentCell.updateData(this.CurrentEdge);
      this.showDlg = false;
    },
    handleCancel() {
      this.showDlg = false;
    },
    handleEdit() {
      this.manager.EditExp({
        Expression: this.CurrentEdge.ConditionPIM,
        PsmExpression: this.CurrentEdge.ConditionPSM,
        ParameterXml: this.CurrentEdge.Parameter,
        ResultType: 'Boolean',
        callback: this.callbackExp,
      });
    },
    callbackExp(data) {
      this.CurrentEdge.ConditionPIM = data.Expression;
      this.CurrentEdge.ConditionPSM = data.PsmExpression;
      this.CurrentEdge.Parameter = data.ParameterXml;
    },
  },
};
</script>

<style>
</style>
