<template>
  <el-dialog
    title="职能带维护"
    width="700px"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <div style="height:400px">
      <div class="qyui-cell col qyui-container">
        <div class="qyui-cell row">
          <ul class="qyui-ul bd">
            <template v-for="item in manager.NoteList" :key="item.ID">
              <li
                :class="{ current: item.ID === currentItem.ID }"
                @click="handleSelect(item)"
              >{{ item.NoteName }}</li>
            </template>
          </ul>
        </div>
        <div class="qyui-cell row pd4">
          <el-form :model="formData" label-position="top">
            <el-form-item
              label="职能带编码"
              prop="NoteCode"
              :rules="[{ required: true, message: '请输入职能带编码' }]"
            >
              <el-input v-model="formData.NoteCode" clearable placeholder="请输入职能带编码"></el-input>
            </el-form-item>
            <el-form-item
              label="职能带名称"
              prop="NoteName"
              :rules="[{ required: true, message: '请输入职能带名称' }]"
            >
              <el-input v-model="formData.NoteName" clearable placeholder="请输入职能带名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleAdd">新增</el-button>
              <el-button type="success" @click="handleSave">保存</el-button>
              <el-button type="danger" @click="handleDelete">删除</el-button>
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
    <!-- <el-table :data="NoteList" height="400px">
      <el-table-column label="编号" width="200px" prop="NoteCode"></el-table-column>
      <el-table-column label="名称" width="200px" prop="NoteName"></el-table-column>
      <el-table-column label="操作" width="200px">
        <template #default="{row}">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>-->
  </el-dialog>
</template>
<script>
import { inject } from 'vue';
import { SaveWorkFlowNote, RemoveWorkFlowNote } from '@/api/workflow';
export default {
  setup() {
    const manager = inject('manager');
    return {
      manager,
    };
  },
  data() {
    return {
      currentItem: {},
      formData: {
        ID: '',
        NoteCode: '',
        NoteName: '',
      },
    };
  },

  methods: {
    handleSelect(item) {
      this.currentItem = item;
      this.formData = JSON.parse(JSON.stringify(item));
    },
    handleAdd() {
      this.formData = {
        ID: '',
        NoteCode: '',
        NoteName: '',
      };
    },
    handleSave() {
      SaveWorkFlowNote(this.formData).then(res => {
        this.$message({ type: 'success', message: '保存成功' });
        this.manager.SetWorkFlowNote(res.Result);
      });
    },
    handleDelete() {
      if (this.formData.ID) {
        RemoveWorkFlowNote({ ID: this.formData.ID }).then(res => {
          this.$message({ type: 'success', message: '删除成功' });
          this.manager.SetWorkFlowNote(res.Result);
          this.formData = {
            ID: '',
            NoteCode: '',
            NoteName: '',
          };
        });
      }
    },
  },
};
</script>

<style>
</style>
