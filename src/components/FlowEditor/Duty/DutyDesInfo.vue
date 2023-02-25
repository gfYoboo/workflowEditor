<template>
  <el-dialog v-model="showDlg" width="500px" title="岗位职责" :close-on-click-modal="false" destroy-on-close @open="openDlg">
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

<script setup>
import { inject } from 'vue';
const graph = inject('graph');
const manager = inject('manager');
const Description = ref('');

const showDlg = computed({
  get() {
    return manager.states.ShowDesDlg;
  },
  set(data) {
    manager.states.ShowDesDlg = data;
  },
});

function openDlg() {
  const cells = graph.getSelectedCells();
  if (cells.length) {
    const cell = cells[0];
    if (cell.shape === 'dutydes') {
      Description.value = cell.label;
    }
  }
}
function handleConfirm() {
  const cells = graph.getSelectedCells();
  if (cells.length) {
    const cell = cells[0];
    if (cell.shape === 'dutydes') {
      cell.label = Description.value || '';
      // 获取他的父级
      const pcell = cell.getParent();
      // 根据职能带ID去更新数据
      pcell.updateData({
        Des: Description.value,
      });
    }
  }
  showDlg.value = false;
}
function handleCancel() {
  showDlg.value = false;
}

</script>

<style></style>
