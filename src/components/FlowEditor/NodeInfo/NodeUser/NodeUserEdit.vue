<template>
  <el-dialog
    v-model="NodeUserDialogVisible"
    title="审批用户编辑"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    width="610px"
    top="10vh"
    @closed="handleNodeUserDialogClosed"
  >
    <el-form v-if="currentNodeUserEdit" label-position="right" label-width="120px">
      <el-form-item label="用户编码">
        <el-input v-model="currentNodeUserEdit.UserCode" class="input-with-select" readonly>
          <template #append>
            <el-button icon="search" @click="showUserListDialog" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="currentNodeUserEdit.UserName" readonly />
      </el-form-item>
      <el-form-item label="科室名称">
        <el-input v-model="currentNodeUserEdit.OrgName" readonly />
      </el-form-item>
      <el-form-item label="单位名称">
        <el-input v-model="currentNodeUserEdit.ComName" readonly />
      </el-form-item>
      <el-form-item label="是否本单位审批">
        <el-switch
          v-model="currentNodeUserEdit.DoesOwnCompany"
          active-color="#13ce66"
          inactive-color="#DCDFE6"
          active-value="Y"
          inactive-value="N"
        />
      </el-form-item>
      <el-form-item label="审批条件">
        <el-input
          v-model="currentNodeUserEdit.ConPIM"
          placeholder="默认为空 即1=1"
          class="input-with-select"
          :readonly="true"
        >
          <template #append>
            <el-button icon="edit" @click="showExpDialog" />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="NodeUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveNodeUser()">确 定</el-button>
      </span>
    </template>
  </el-dialog>

  <popSelectUser ref="popSelectUser" @selected="selectedUser" />
</template>

<script>
import { inject } from 'vue';
import PopSelectUser from './PopSelectUser.vue';
export default {
  components: { PopSelectUser },
  emits: ['save'],
  setup() {
    const manager = inject('manager');
    return {
      manager,
    };
  },
  data() {
    return {

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
    };
  },
  methods: {
    show(row) {
      if (row) {
        this.currentNodeUserEdit = JSON.parse(JSON.stringify(row));
      } else {
        this.currentNodeUserEdit = {
          UserName_xID: '',
          UserCode: '',
          UserName: '',
          OrgName: '',
          ComName: '',
          DoesOwnCompany: 'N',
          ConPIM: '',
          ConPSM: '',
          ConPara: '',
          ID: this.manager.getNextId(),
        };
      }
      this.NodeUserDialogVisible = true;
    },
    // 保存审批用户
    saveNodeUser() {
      this.$emit('save', this.currentNodeUserEdit);
      this.NodeUserDialogVisible = false;
    },
    showExpDialog() {
      this.manager.EditExp({
        Expression: this.currentNodeUserEdit.ConPIM,
        PsmExpression: this.currentNodeUserEdit.ConPSM,
        ParameterXml: this.currentNodeUserEdit.ConPara,
        ResultType: 'Boolean',
        callback: this.callbackExp,
      });
    },
    callbackExp(data) {
      this.currentNodeUserEdit.ConPIM = data.Expression;
      this.currentNodeUserEdit.ConPSM = data.PsmExpression;
      this.currentNodeUserEdit.ConPara = data.ParameterXml;
    },
    // 显示选择用户的列表（并加载数据）
    showUserListDialog() {
      this.$refs.popSelectUser.show();
    },
    // 关闭编辑“审批人”的窗口
    handleNodeUserDialogClosed() {
      this.currentNodeUser = null;
      this.currentNodeUserEdit = null;
    },
    selectedUser(row) {
      this.currentNodeUserEdit.UserName_xID = row.UserID;
      this.currentNodeUserEdit.UserCode = row.UserCode;
      this.currentNodeUserEdit.UserName = row.UserName;
      this.currentNodeUserEdit.OrgName = row.OrgName;
      this.currentNodeUserEdit.ComName = row.Company;
    },
  },
};
</script>
