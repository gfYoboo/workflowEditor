<template>
  <el-form label-width="110px">
    <el-row v-if="CurrentNode.NodeType !== 'End'">
      <nodeExtInput
        label="服务端处理功能(流转前)"
        field="ProcedureName"
        @select="PopSelect('ProcedureName')"
      />
      <nodeExtInput
        label="服务端处理功能(流转后)"
        field="ProcedureAfter"
        @select="PopSelect('ProcedureAfter')"
      />
    </el-row>
    <el-row>
      <nodeExtInput
        v-if="CurrentNode.NodeType === 'Normal'"
        label="服务端处理功能(退回前)"
        field="ProcedureBeforeReject"
        @select="PopSelect('ProcedureBeforeReject')"
      />
      <nodeExtInput
        v-if="CurrentNode.NodeType === 'Normal'"
        label="服务端处理功能(退回后)"
        field="ProcedureAfterReject"
        @select="PopSelect('ProcedureAfterReject')"
      />
    </el-row>
    <el-row>
      <nodeExtInput
        v-if="CurrentNode.NodeType !== 'Start'"
        label="服务端处理功能(流转至)"
        field="ProcedureInNode"
        @select="PopSelect('ProcedureInNode')"
      />
      <nodeExtInput
        v-if="CurrentNode.NodeType !== 'End'"
        label="服务端处理功能(退回至)"
        field="ProcedureBackIn"
        @select="PopSelect('ProcedureBackIn')"
      />
    </el-row>
    <el-row v-if="CurrentNode.NodeType !== 'End'">
      <nodeExtInput
        label="服务端处理功能(取回前)"
        field="ProcedureBeforeBack"
        @select="PopSelect('ProcedureBeforeBack')"
      />
      <nodeExtInput
        label="服务端处理功能(取回后)"
        field="ProcedureAfterBack"
        @select="PopSelect('ProcedureAfterBack')"
      />
    </el-row>
    <el-row v-if="CurrentNode.NodeType !== 'End'">
      <nodeExtInput
        label="客户端处理功能(提交、审批前)"
        field="ProcessVoucher"
        @select="PopSelectClient('ProcessVoucher')"
      />
      <nodeExtInput
        label="客户端处理功能(提交、审批后)"
        field="ExecutiveAfter"
        @select="PopSelectClient('ExecutiveAfter')"
      />
    </el-row>
  </el-form>
  <el-dialog v-model="showDlg" title="处理功能">
    <div class="qyui-cell col qyui-container" style="height:500px">
      <div class="qyui-cell row bdr" style="overflow: auto;">
        <el-tree :data="treeList" highlight-current accordion @currentChange="currentTreeChange" />
      </div>
      <div class="qyui-cell" style="width:80px">
        <div class="qyui-cell row">
          <div class="qyui-cell row">
            <div class="qyui-cell" style="height:36px;align-self:center">
              <span>
                <el-button @click="handleAdd">增加</el-button>
              </span>
            </div>
            <div class="qyui-cell" style="height:36px;align-self:center">
              <span>
                <el-button @click="handleDelete">删除</el-button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="qyui-cell row bdl">
        <ul class="qyui-ul">
          <template v-for="item in list" :key="item">
            <li :class="{ current: item === currentItem }" @click="handleClick(item)">{{ item }}</li>
          </template>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { inject } from 'vue';

import NodeExtInput from './NodeExtInput.vue';
export default {
  components: { NodeExtInput },
  setup() {
    const CurrentNode = inject('CurrentNode');
    const manager = inject('manager');

    return {
      CurrentNode,
      manager,
    };
  },
  data() {
    return {
      showDlg: false,
      treeList: [],
      currentTreeRow: {},
      list: [],
      currentFieldName: '',
      currentItem: '',

    };
  },

  methods: {
    PopSelect(fieldName) {
      this.currentFieldName = fieldName;
      this.showDlg = true;
      this.treeList = [];
      for (const el in this.manager.ServerFunctionList) {
        const item = { label: el, isFunc: false, children: [] };
        for (let i = 0; i < this.manager.ServerFunctionList[el].length; i++) {
          item.children.push({ label: this.manager.ServerFunctionList[el][i], isFunc: true });
        }
        this.treeList.push(item);
      }
      if (this.CurrentNode[fieldName]) {
        this.list = this.CurrentNode[fieldName].split(';');
      } else {
        this.list = [];
      }
    },
    PopSelectClient(fieldName) {
      this.currentFieldName = fieldName;
      this.showDlg = true;
      this.treeList = [];
      for (const el in this.manager.ClientFunctionList) {
        const item = { label: el, isFunc: false, children: [] };
        for (let i = 0; i < this.manager.ClientFunctionList[el].length; i++) {
          item.children.push({ label: this.manager.ClientFunctionList[el][i], isFunc: true });
        }
        this.treeList.push(item);
      }
      if (this.CurrentNode[fieldName]) {
        this.list = this.CurrentNode[fieldName].split(';');
      } else {
        this.list = [];
      }
    },
    currentTreeChange(row) {
      this.currentTreeRow = row;
    },
    handleAdd() {
      if (this.currentTreeRow.isFunc) {
        this.list.push(this.currentTreeRow.label);
      } else {
        this.$message({ message: '无法选择目录' });
      }
    },
    handleDelete() {
      if (this.currentItem) {
        const index = this.list.findIndex(item => item === this.currentItem);
        this.list.splice(index, 1);
      }
    },
    handleConfirm() {
      this.CurrentNode[this.currentFieldName] = this.list.join(';');
      this.showDlg = false;
    },
    handleCancel() {
      this.showDlg = false;
    },
    handleClick(item) {
      this.currentItem = item;
    },
  },
};
</script>

<style>
</style>
