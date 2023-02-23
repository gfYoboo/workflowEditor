<template>
  <el-dialog
    v-model="showDlg"
    title="节点用户描述维护"
    width="700px"
    :close-on-click-modal="false"
    destroy-on-close
  >
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
                <li
                  :class="{ current: item.ID === currentItem.ID }"
                  @click="handleSelect(item)"
                >{{ item.Name }}</li>
              </template>
            </ul>
          </div>
          <div class="qyui-cell row pd4">
            <el-form :model="formData" label-position="top">
              <el-form-item label="编码" prop="Code" :rules="[{ required: true, message: '请输入编码' }]">
                <el-input v-model="formData.Code" clearable placeholder="请输入编码"></el-input>
              </el-form-item>
              <el-form-item label="名称" prop="Name" :rules="[{ required: true, message: '请输入名称' }]">
                <el-input v-model="formData.Name" clearable placeholder="请输入名称"></el-input>
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
<script>
import { SaveNodeUserDes, RemoveNodeUserDes } from '@/api/workflow';
import { inject } from 'vue';
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
  computed: {

    showDlg: {
      get() {
        return this.manager.states.ShowNodeUserDesDlg;
      },
      set(data) {
        this.manager.states.ShowNodeUserDesDlg = data;
      },
    },
  },
  methods: {
    handleSelect(item) {
      this.currentItem = item;
      this.formData = JSON.parse(JSON.stringify(item));
    },
    handleAdd() {
      this.formData = {
        ID: '',
        Code: '',
        Name: '',
      };
    },
    handleSave() {
      SaveNodeUserDes(this.formData).then(res => {
        this.$message({ type: 'success', message: '保存成功' });
        this.manager.SetNodeUserDes(res.Result);
      });
    },
    handleDelete() {
      if (this.formData.ID) {
        RemoveNodeUserDes({ ID: this.formData.ID }).then(res => {
          this.$message({ type: 'success', message: '删除成功' });
          this.manager.SetNodeUserDes(res.Result);

          this.formData = {
            ID: '',
            Code: '',
            Name: '',
          };
        });
      }
    },
  },
};
</script>
