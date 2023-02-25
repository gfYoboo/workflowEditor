<template>
  <el-form label-width="110px">
    <el-row v-if="CurrentNode.NodeType !== 'End'">
      <nodeExtInput label="服务端处理功能(流转前)" field="ProcedureName" @select="PopSelect('ProcedureName')" />
      <nodeExtInput label="服务端处理功能(流转后)" field="ProcedureAfter" @select="PopSelect('ProcedureAfter')" />
    </el-row>
    <el-row>
      <nodeExtInput v-if="CurrentNode.NodeType === 'Normal'" label="服务端处理功能(退回前)" field="ProcedureBeforeReject"
        @select="PopSelect('ProcedureBeforeReject')" />
      <nodeExtInput v-if="CurrentNode.NodeType === 'Normal'" label="服务端处理功能(退回后)" field="ProcedureAfterReject"
        @select="PopSelect('ProcedureAfterReject')" />
    </el-row>
    <el-row>
      <nodeExtInput v-if="CurrentNode.NodeType !== 'Start'" label="服务端处理功能(流转至)" field="ProcedureInNode"
        @select="PopSelect('ProcedureInNode')" />
      <nodeExtInput v-if="CurrentNode.NodeType !== 'End'" label="服务端处理功能(退回至)" field="ProcedureBackIn"
        @select="PopSelect('ProcedureBackIn')" />
    </el-row>
    <el-row v-if="CurrentNode.NodeType !== 'End'">
      <nodeExtInput label="服务端处理功能(取回前)" field="ProcedureBeforeBack" @select="PopSelect('ProcedureBeforeBack')" />
      <nodeExtInput label="服务端处理功能(取回后)" field="ProcedureAfterBack" @select="PopSelect('ProcedureAfterBack')" />
    </el-row>
    <el-row v-if="CurrentNode.NodeType !== 'End'">
      <nodeExtInput label="客户端处理功能(提交、审批前)" field="ProcessVoucher" @select="PopSelectClient('ProcessVoucher')" />
      <nodeExtInput label="客户端处理功能(提交、审批后)" field="ExecutiveAfter" @select="PopSelectClient('ExecutiveAfter')" />
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

<script setup>
import { inject, reactive } from 'vue';

import NodeExtInput from './NodeExtInput.vue';
import { ElMessage } from 'element-plus';

const CurrentNode = inject('CurrentNode');
const manager = inject('manager');
const data = reactive({
  showDlg: false,
  treeList: [],
  currentTreeRow: {},
  list: [],
  currentFieldName: '',
  currentItem: '',

});

function PopSelect(fieldName) {
  data.currentFieldName = fieldName;
  data.showDlg = true;
  data.treeList = [];
  for (const el in manager.ServerFunctionList) {
    const item = { label: el, isFunc: false, children: [] };
    for (let i = 0; i < manager.ServerFunctionList[el].length; i++) {
      item.children.push({ label: manager.ServerFunctionList[el][i], isFunc: true });
    }
    data.treeList.push(item);
  }
  if (CurrentNode[fieldName]) {
    data.list = CurrentNode[fieldName].split(';');
  } else {
    data.list = [];
  }
}
function PopSelectClient(fieldName) {
  data.currentFieldName = fieldName;
  data.showDlg = true;
  data.treeList = [];
  for (const el in manager.ClientFunctionList) {
    const item = { label: el, isFunc: false, children: [] };
    for (let i = 0; i < manager.ClientFunctionList[el].length; i++) {
      item.children.push({ label: manager.ClientFunctionList[el][i], isFunc: true });
    }
    data.treeList.push(item);
  }
  if (CurrentNode[fieldName]) {
    data.list = CurrentNode[fieldName].split(';');
  } else {
    data.list = [];
  }
}
function currentTreeChange(row) {
  data.currentTreeRow = row;
}
function handleAdd() {
  if (data.currentTreeRow.isFunc) {
    data.list.push(data.currentTreeRow.label);
  } else {
    ElMessage.error({ message: '无法选择目录' });
  }
}
function handleDelete() {
  if (data.currentItem) {
    const index = data.list.findIndex(item => item === data.currentItem);
    data.list.splice(index, 1);
  }
}
function handleConfirm() {
  CurrentNode[data.currentFieldName] = data.list.join(';');
  data.showDlg = false;
}
function handleCancel() {
  data.showDlg = false;
}
function handleClick(item) {
  data.currentItem = item;
}

</script>

<style></style>
