<template>
  <el-dialog width="300px" title="选择部门" :close-on-click-modal="false" @open="openDlg">
    <div style="height:400px">
      <div class="qyui-cell row qyui-container">
        <div class="qyui-cell row">
          <ul class="qyui-ul bd">
            <template v-for="item in manager.NoteList" :key="item.ID">
              <li :class="{ current: item.ID === data.currentItem?.ID }" @click="handleSelect(item)"
                @dblclick="handleDbClick(item)">{{ item.NoteName }}</li>
            </template>
          </ul>
        </div>
        <div class="qyui-cell" style="height:40px">
          <div>
            <el-button type="primary" @click="handleConfirm">确认</el-button>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="warning" @click="handleNull">空值</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { inject } from 'vue';
const graph = inject('graph');
const manager = inject('manager');

const data = reactive({ currentItem: {} });

const showDlg = computed({
  get() {
    return manager.states.ShowNoteSelectListDlg;
  },
  set(data) {
    manager.states.ShowNoteSelectListDlg = data;
  },
});
// ShowNoteSelectListDlg

function handleSelect(item) {
  data.currentItem = item;
}
function handleDbClick(item) {
  data.currentItem = item;
  handleConfirm();
}
function handleConfirm() {
  selected(data.currentItem);
  showDlg.value = false;
}
function handleCancel() {
  showDlg.value = false;
}
function handleNull() {
  selected(null);
  showDlg.value = false;
}
function openDlg() {
  data.currentItem = {};
}
function selected(item) {
  const cells = graph.getSelectedCells();
  if (cells.length) {
    const cell = cells[0];
    if (cell.shape === 'dutyorg') {
      cell.label = item?.NoteName || '';
      // 获取他的父级
      const pcell = cell.getParent();
      // 根据职能带ID去更新数据
      pcell.updateData({
        NoteName: item?.NoteName || '',
        NoteName_Xid: item?.ID || '',
      });

      // manager.UpdateDuty({
      //   DBID: pcell.getData().DBID,
      //   NoteName: item?.NoteName || '',
      //   NoteName_xID: item?.ID || '',
      // });
    }
  }
}

</script>

<style></style>
