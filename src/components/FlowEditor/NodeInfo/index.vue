<template>
  <el-dialog
    v-model="showDlg"
    width="800px"
    title="节点属性"
    :close-on-click-modal="false"
    destroy-on-close
    @open="openDlg"
  >
    <el-tabs type="border-card">
      <el-tab-pane label="基本设置">
        <nodeInfoBasicStart v-if="CurrentNode.NodeType === 'Start'" />
        <nodeInfoBasicEnd v-else-if="CurrentNode.NodeType === 'End'" />
        <nodeInfoBasic v-else />
      </el-tab-pane>
      <el-tab-pane v-if="CurrentNode.NodeType === 'Normal'" label="审批用户">
        <nodeUser />
      </el-tab-pane>
      <el-tab-pane v-if="CurrentNode.NodeType !== 'End'" label="审批要素">
        <nodeCheckFactor ref="CheckFactor" />
      </el-tab-pane>
      <el-tab-pane v-if="CurrentNode.NodeType !== 'End'" label="审批操作权限">
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
import NodeInfoBasic from './NodeInfoBasic.vue';
import NodeInfoBasicStart from './NodeInfoBasicStart.vue';
import NodeInfoBasicEnd from './NodeInfoBasicEnd.vue';

import NodeUser from './NodeUser/index.vue';
import NodeCheckFactor from './NodeCheckFactor.vue';
import NodeCheckWindow from './NodeCheckWindow.vue';
import NodeExt from './NodeExt.vue';
import { inject, computed } from 'vue';

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
  provide() {
    return {
      CurrentNode: computed(() => this.CurrentNode),
    };
  },
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
      CurrentNode: {
        DBID: '',
        AllowEditDocument: 'N',
        AllowPrintDocument: 'N',
        AllowUnCheck: 'N',
        AppointCheckerExpression: '',
        AppointUser: '',
        AppointUserID: '',
        AutoCheckOwnDoc: 'N',
        CanAutoCheck: 'N',
        CanBackIn: 'N',
        CanReverse: 'N',
        CanSelectBackToNode: 'N',
        CheckFactorList: [],
        CheckWindowFactorList: [],
        DutyDes: '',
        EditAttacher: 'N',
        ExecutiveAfter: '',
        GroupIndex: '1',
        IsAssign: 'N',
        IsAutoNode: 'N',
        IsNeedCA: 'N',
        MaxStayTime: '',
        MustHaveAttachment: 'N',
        NodeCode: '',
        NodeUserList: [],
        NodeX: '',
        NodeY: '',
        OnlyDepartmentManager: 'N',
        ProcedureAfter: '',
        ProcedureAfterBack: '',
        ProcedureAfterReject: '',
        ProcedureBackIn: '',
        ProcedureBeforeBack: '',
        ProcedureBeforeReject: '',
        ProcedureInNode: '',
        ProcedureName: '',
        ProcessVoucher: '',
        SubWorkFlowID: '',
        SubWorkFlowName: '',
        TicketQty: '0',
        TitleDescription: '',
        DocStatus: '',
        NodeName: '',
        NodeType: '',
        ProcessName: '',
      },
    };
  },

  computed: {
    showDlg: {
      get() {
        return this.manager.node.ShowNodeInfoDlg;
      },
      set(data) {
        this.manager.node.ShowNodeInfoDlg = data;
      },
    },
  },
  methods: {
    openDlg() {
      const cell = this.manager.CurrentCell;
      this.CurrentNode = JSON.parse(JSON.stringify(cell.getData()));
    },
    handleConfirm() {
      // 重新组织审批要素 默认值的不需要保存到数据库
      const CheckFactorList = this.$refs.CheckFactor?.CheckFactorList || [];
      const newList = CheckFactorList.filter(a => {
        return a.CanEdit === 'Y' || a.NotNullable === 'Y' || a.IsHidden === 'Y';
      });
      this.CurrentNode.CheckFactorList = newList;

      // 判断审批要素中有的元素 给对应的窗口设置成 可编辑
      const EditWindow = [];
      newList.forEach(item => {
        if (item.CanEdit === 'Y') {
          const windowName = item.DispUnit.split('-')[0];
          if (EditWindow.indexOf(windowName) === -1) {
            EditWindow.push(windowName);
          }
        }
      });
      const CheckWindowFactorList = this.$refs.CheckWindow?.CheckWindowFactorList || [];
      CheckWindowFactorList.forEach(item => {
        if (EditWindow.indexOf(item.WindowName) > -1) {
          item.EditAble = 'Y';
        }
      });
      const newList2 = CheckWindowFactorList.filter(a => {
        return a.AddAble === 'Y' || a.EditAble === 'Y' || a.DeleteAble === 'Y' || a.MustHaveData === 'Y';
      });

      this.CurrentNode.CheckWindowFactorList = newList2;

      this.manager.CurrentCell.updateData(this.CurrentNode);
      this.showDlg = false;

      if (this.manager.CurrentCell.shape === 'normal') {
        this.manager.CurrentCell.label = this.CurrentNode.NodeName;
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
