<template>
  <el-dialog
    v-model="showDlg"
    width="300px"
    title="选择部门"
    :close-on-click-modal="false"
    @open="openDlg"
  >
    <div style="height:400px">
      <div class="qyui-cell row qyui-container">
        <div class="qyui-cell row">
          <ul class="qyui-ul bd">
            <template v-for="item in manager.NoteList" :key="item.ID">
              <li
                :class="{ current: item.ID === currentItem.ID }"
                @click="handleSelect(item)"
                @dblclick="handleDbClick(item)"
              >{{ item.NoteName }}</li>
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
      currentItem: {},
    };
  },
  computed: {

    showDlg: {
      get() {
        return this.manager.states.ShowNoteSelectListDlg;
      },
      set(data) {
        this.manager.states.ShowNoteSelectListDlg = data;
      },
    },
  },
  methods: {
    handleSelect(item) {
      this.currentItem = item;
    },
    handleDbClick(item) {
      this.currentItem = item;
      this.handleConfirm();
    },
    handleConfirm() {
      this.selected(this.currentItem);
      this.showDlg = false;
    },
    handleCancel() {
      this.showDlg = false;
    },
    handleNull() {
      this.selected(null);
      this.showDlg = false;
    },
    openDlg() {
      this.currentItem = {};
    },
    selected(item) {
      const cells = this.graph.getSelectedCells();
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

          // this.manager.UpdateDuty({
          //   DBID: pcell.getData().DBID,
          //   NoteName: item?.NoteName || '',
          //   NoteName_xID: item?.ID || '',
          // });
        }
      }
    },
  },
};
</script>

<style>
</style>
