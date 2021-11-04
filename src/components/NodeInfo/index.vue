<template>
  <el-dialog
    v-model="showDlg"
    width="800px"
    title="节点属性"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <el-tabs type="border-card">
      <el-tab-pane label="基本设置">
        <nodeInfoBasicStart v-if="node.NodeType === 'Start'" />
        <nodeInfoBasicEnd v-else-if="node.NodeType === 'End'" />
        <nodeInfoBasic v-else />
      </el-tab-pane>
      <el-tab-pane v-if="node.NodeType === 'Normal'" label="审批用户">
        <nodeUser />
      </el-tab-pane>
      <el-tab-pane v-if="node.NodeType !== 'End'" label="审批要素">
        <nodeCheckFactor ref="CheckFactor" />
      </el-tab-pane>
      <el-tab-pane v-if="node.NodeType !== 'End'" label="审批操作权限">
        <nodeCheckWindow ref="CheckWindow" />
      </el-tab-pane>
      <el-tab-pane label="扩展功能">
        <nodeExt />
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import NodeInfoBasic from "./NodeInfoBasic.vue";
import NodeInfoBasicStart from "./NodeInfoBasicStart.vue";
import NodeInfoBasicEnd from "./NodeInfoBasicEnd.vue";

import NodeUser from "./NodeUser/index.vue";
import NodeCheckFactor from "./NodeCheckFactor.vue";
import NodeCheckWindow from "./NodeCheckWindow.vue";
import NodeExt from "./NodeExt.vue";
import { inject } from "vue";
import { mapState } from "vuex";

export default {
  components: {
    NodeInfoBasic,
    NodeInfoBasicStart,
    NodeInfoBasicEnd,
    NodeUser,
    NodeCheckFactor,
    NodeCheckWindow,
    NodeExt,
  },
  setup() {
    const graph = inject("graph");
    return {
      graph,
    };
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapState({
      node: (state) => state.node.CurrentNode,
      showNodeInfoDlg: (state) => state.node.showNodeInfoDlg,
    }),
    showDlg: {
      get() {
        return this.showNodeInfoDlg;
      },
      set(data) {
        this.$store.commit("node/setNodeInfoDlgState", data);
      },
    },
  },
  methods: {
    handleConfirm() {
      // 重新组织审批要素 默认值的不需要保存到数据库
      const CheckFactorList = this.$refs.CheckFactor?.CheckFactorList || [];
      const newList = CheckFactorList.filter(a => {
        return a.CanEdit === "Y" || a.NotNullable === "Y" || a.IsHidden === "Y";
      });
      this.node.CheckFactorList = newList;

      // 判断审批要素中有的元素 给对应的窗口设置成 可编辑
      const EditWindow = [];
      newList.forEach(item => {
        if (item.CanEdit === "Y") {
          const windowName = item.DispUnit.split("-")[0];
          if (EditWindow.indexOf(windowName) === -1) {
            EditWindow.push(windowName);
          }
        }
      });
      const CheckWindowFactorList = this.$refs.CheckWindow?.CheckWindowFactorList || [];
      CheckWindowFactorList.forEach(item => {
        if (EditWindow.indexOf(item.WindowName) > -1) {
          item.EditAble = "Y";
        }
      });
      const newList2 = CheckWindowFactorList.filter(a => {
        return a.AddAble === "Y" || a.EditAble === "Y" || a.DeleteAble === "Y" || a.MustHaveData === "Y";
      });

      this.node.CheckWindowFactorList = newList2;

      this.$store.dispatch("node/updateNode");
      const cells = this.graph.getSelectedCells();
      if (cells.length) {
        const cell = cells[0];
        if (cell.shape === "normal") {
          cell.label = this.node.NodeName;
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
