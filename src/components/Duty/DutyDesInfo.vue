<template>
  <el-dialog v-model="showDlg"
             width="500px"
             title="岗位职责"
             :close-on-click-modal="false"
             @open="openDlg"
             destroy-on-close>
    <el-form label-position="top"
             label-width="85px">
      <el-form-item label="描述">
        <el-input type="textarea"
                  v-model="Description"
                  :rows="2"
                  resize="none"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary"
                 @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { inject } from "vue";
import { mapState } from "vuex";

export default {
  setup() {
    const graph = inject("graph");
    return {
      graph,
    };
  },
  data() {
    return {
      Description: ""
    }
  },
  computed: {
    ...mapState({
      showDesDlg: (state) => state.duty.showDesDlg,
    }),
    showDlg: {
      get() {
        return this.showDesDlg
      },
      set(data) {
        this.$store.commit("duty/setDesDlgState", data)
      },
    },
  },
  methods: {
    openDlg() {
      const cells = this.graph.getSelectedCells();
      if (cells.length) {
        const cell = cells[0];
        if (cell.shape === "dutydes") {
          this.Description = cell.label;
        }
      }
    },
    handleConfirm() {
      const cells = this.graph.getSelectedCells();
      if (cells.length) {
        const cell = cells[0];
        if (cell.shape === "dutydes") {
          cell.label = this.Description || "";
          //获取他的父级
          var pcell = cell.getParent();
          //根据职能带ID去更新数据
          this.$store.commit("updateDuty", {
            DBID: pcell.getData().DBID,
            Des: this.Description,
          });
        }
      }
      this.showDlg = false;
    },
    handleCancel() {
      this.showDlg = false;
    },

  }
}
</script>

<style>
</style>