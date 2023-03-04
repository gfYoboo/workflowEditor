<template>
  <el-dialog v-model="data.NodeUserDialogVisible" title="审批用户编辑" :close-on-click-modal="false"
    :close-on-press-escape="false" destroy-on-close width="610px" top="10vh" @closed="handleNodeUserDialogClosed">
    <el-form v-if="data.currentNodeUserEdit" label-position="right" label-width="120px">
      <el-form-item label="用户编码">
        <el-input v-model="data.currentNodeUserEdit.UserCode" class="input-with-select" readonly>
          <template #append>
            <el-button icon="search" @click="showUserListDialog" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="data.currentNodeUserEdit.UserName" readonly />
      </el-form-item>
      <el-form-item label="科室名称">
        <el-input v-model="data.currentNodeUserEdit.OrgName" readonly />
      </el-form-item>
      <el-form-item label="单位名称">
        <el-input v-model="data.currentNodeUserEdit.ComName" readonly />
      </el-form-item>
      <el-form-item label="是否本单位审批">
        <el-switch v-model="currentNodeUserEdit.DoesOwnCompany" active-color="#13ce66" inactive-color="#DCDFE6"
          active-value="Y" inactive-value="N" />
      </el-form-item>
      <el-form-item label="审批条件">
        <el-input v-model="data.currentNodeUserEdit.ConPIM" placeholder="默认为空 即1=1" class="input-with-select"
          :readonly="true">
          <template #append>
            <el-button icon="edit" @click="showExpDialog" />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="data.NodeUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveNodeUser()">确 定</el-button>
      </span>
    </template>
  </el-dialog>

  <PopSelectUser ref="popSelectUser" @selected="selectedUser" />
</template>

<script setup>
import { inject, reactive } from 'vue';
import PopSelectUser from './PopSelectUser.vue';
const emits = defineEmits(['save']);
const manager = inject('manager');
const popSelectUser = ref();
const data = reactive({
  NodeUserDialogVisible: false,
  currentNodeUserEdit: {
    UserName_xID: '',
    UserCode: '',
    UserName: '',
    OrgName: '',
    ComName: '',
    DoesOwnCompany: 'N',
    ConPIM: '',
    ConPSM: '',
    ConPara: '',
    ID: '',
  },
});

function show(row) {
  if (row) {
    data.currentNodeUserEdit = JSON.parse(JSON.stringify(row));
  } else {
    data.currentNodeUserEdit = {
      UserName_xID: '',
      UserCode: '',
      UserName: '',
      OrgName: '',
      ComName: '',
      DoesOwnCompany: 'N',
      ConPIM: '',
      ConPSM: '',
      ConPara: '',
      ID: manager.getNextId(),
    };
  }
  data.NodeUserDialogVisible = true;
}
// 保存审批用户
function saveNodeUser() {
  emits('save', data.currentNodeUserEdit);
  data.NodeUserDialogVisible = false;
}
function showExpDialog() {
  manager.EditExp({
    Expression: data.currentNodeUserEdit.ConPIM,
    PsmExpression: data.currentNodeUserEdit.ConPSM,
    ParameterXml: data.currentNodeUserEdit.ConPara,
    ResultType: 'Boolean',
    callback: data.callbackExp,
  });
}
function callbackExp(d) {
  data.currentNodeUserEdit.ConPIM = d.Expression;
  data.currentNodeUserEdit.ConPSM = d.PsmExpression;
  data.currentNodeUserEdit.ConPara = d.ParameterXml;
}
// 显示选择用户的列表（并加载数据）
function showUserListDialog() {
  popSelectUser.value.show();
}
// 关闭编辑“审批人”的窗口
function handleNodeUserDialogClosed() {
  data.currentNodeUser = null;
  data.currentNodeUserEdit = null;
}
function selectedUser(row) {
  data.currentNodeUserEdit.UserName_xID = row.UserID;
  data.currentNodeUserEdit.UserCode = row.UserCode;
  data.currentNodeUserEdit.UserName = row.UserName;
  data.currentNodeUserEdit.OrgName = row.OrgName;
  data.currentNodeUserEdit.ComName = row.Company;
}

</script>
