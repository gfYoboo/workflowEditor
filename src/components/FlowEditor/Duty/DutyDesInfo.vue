<template>
  <el-dialog
    v-model="showDlg"
    width="500px"
    title="岗位职责"
    :close-on-click-modal="false"
    destroy-on-close
    @open="openDlg"
  >
    <el-form label-position="top" label-width="85px">
      <el-form-item label="描述">
        <el-input v-model="Description" type="textarea" :rows="2" resize="none" />
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
      Description: '',
    };
  },
  computed: {

    showDlg: {
      get() {
        return this.manager.states.ShowDesDlg;
      },
      set(data) {
        this.manager.states.ShowDesDlg = data;
      },
    },
  },
  methods: {
    openDlg() {
      const cells = this.graph.getSelectedCells();
      if (cells.length) {
        const cell = cells[0];
        if (cell.shape === 'dutydes') {
          this.Description = cell.label;
        }
      }
    },
    handleConfirm() {
      const cells = this.graph.getSelectedCells();
      if (cells.length) {
        const cell = cells[0];
        if (cell.shape === 'dutydes') {
          cell.label = this.Description || '';
          // 获取他的父级
          const pcell = cell.getParent();
          // 根据职能带ID去更新数据
          pcell.updateData({
            Des: this.Description,
          });
          // this.manager.UpdateDuty({
          //   DBID: pcell.getData().DBID,
          // });
        }
      }
      this.showDlg = false;
    },
    handleCancel() {
      this.showDlg = false;
    },

  },
};
</script>

<style>
</style>
