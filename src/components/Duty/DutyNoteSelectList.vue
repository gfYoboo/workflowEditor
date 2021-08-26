<template>
  <el-dialog v-model="showDlg"
             width="300px"
             title="选择部门"
             :close-on-click-modal="false"
             @open="openDlg">
    <div style="height:400px">
      <div class="qyui-cell row qyui-container">
        <div class="qyui-cell row">
          <ul class="qyui-ul bd">
            <template v-for="item in NoteList"
                      :key="item.value">
              <li :class="{ active: item.value === currentItem.value }"
                  @click="handleSelect(item)"
                  @dblclick="handleDbClick(item)">{{item.label}}</li>
            </template>
          </ul>
        </div>
        <div class="qyui-cell"
             style="height:40px">
          <div>
            <el-button @click="handleConfirm"
                       type="primary">确认</el-button>
            <el-button @click="handleCancel">取消</el-button>
            <el-button @click="handleNull"
                       type="warning">空值</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import { inject } from "vue";

export default {
  setup() {
    const graph = inject("graph");
    return {
      graph,
    };
  },
  data() {
    return {
      currentItem: {},
    };
  },
  computed: {
    ...mapState({
      showNoteDlg: (state) => state.duty.showNoteDlg,
      NoteList: (state) => state.NoteList,
    }),
    showDlg: {
      get() {
        return this.showNoteDlg
      },
      set(data) {
        this.$store.commit("duty/setNoteDlgState", data)
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
        if (cell.shape === "dutyorg") {
          cell.label = item?.label || "";
          //获取他的父级
          var pcell = cell.getParent();
          //根据职能带ID去更新数据
          this.$store.commit("updateDuty", {
            DBID: pcell.getData().DBID,
            NoteName: item?.label || "",
            NoteName_xID: item?.value || "",
          });
        }
      }
    },
  },
};
</script>

<style>
</style>