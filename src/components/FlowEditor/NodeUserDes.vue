<template>
  <el-dialog v-model="showDlg" title="节点用户描述维护" width="700px" :close-on-click-modal="false" destroy-on-close>
    <div style="height:400px">
      <div class="qyui-cell row qyui-container">
        <div class="qyui-cell" style="height:40px">
          <div>
            <el-button type="primary" @click="handleAdd">新增</el-button>
            <el-button type="danger" @click="handleDelete">删除</el-button>
          </div>
        </div>
        <div class="qyui-cell col">
          <div class="qyui-cell row">
            <ul class="qyui-ul bd">
              <template v-for="item in manager.NodeUserDesList" :key="item.ID">
                <li :class="{ current: item.ID === data.currentItem.ID }" @click="handleSelect(item)">{{ item.Name }}</li>
              </template>
            </ul>
          </div>
          <div class="qyui-cell row pd4">
            <el-form :model="data.formData" label-position="top">
              <el-form-item label="编码" prop="Code" :rules="[{ required: true, message: '请输入编码' }]">
                <el-input v-model="data.formData.Code" clearable placeholder="请输入编码"></el-input>
              </el-form-item>
              <el-form-item label="名称" prop="Name" :rules="[{ required: true, message: '请输入名称' }]">
                <el-input v-model="data.formData.Name" clearable placeholder="请输入名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="handleSave">保存</el-button>
              </el-form-item>
            </el-form>
            <div class="qyui-cell" style="height:40px">
              <div>
                <!-- <el-button type="primary" @click="handleConfirm">确认</el-button>
              <el-button @click="handleCancel">取消</el-button>
                <el-button type="warning" @click="handleNull">空值</el-button>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import { SaveNodeUserDes, RemoveNodeUserDes } from '@/api/workflow';
import { ElMessage } from 'element-plus';
import { inject } from 'vue';
const manager = inject('manager');
const data = reactive({
  currentItem: {},
  formData: {
    ID: '',
    NoteCode: '',
    NoteName: '',
  },
});
let showDlg = computed({
  set(val) {
    manager.states.ShowNodeUserDesDlg = val;
  },
  get() {
    return manager.states.ShowNodeUserDesDlg;
  },
});

function handleSelect(item) {
  data.currentItem = item;
  data.formData = JSON.parse(JSON.stringify(item));
}
function handleAdd() {
  data.formData = {
    ID: '',
    Code: '',
    Name: '',
  };
}
function handleSave() {
  SaveNodeUserDes(data.formData).then(res => {
    ElMessage({ type: 'success', message: '保存成功' });
    manager.SetNodeUserDes(res.Result);
  });
}
function handleDelete() {
  if (data.formData.ID) {
    RemoveNodeUserDes({ ID: data.formData.ID }).then(res => {
      ElMessage({ type: 'success', message: '删除成功' });
      manager.SetNodeUserDes(res.Result);

      data.formData = {
        ID: '',
        Code: '',
        Name: '',
      };
    });
  }
}
</script>
