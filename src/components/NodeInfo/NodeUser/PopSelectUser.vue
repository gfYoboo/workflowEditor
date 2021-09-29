<template>
  <!--    选择用户-->
  <el-dialog
    v-model="UserListDialogVisible"
    title="选择用户"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="UserListDialog"
    destroy-on-close
    width="610px"
    @opened="loadUserList"
    @closed="handleCloseUserListDialog"
  >
    <el-alert
      v-if="currentSelectedUser && currentSelectedUser.UserCode"
      v-model="currentSelectedUser"
      style="margin: 10px 0"
      :closable="false"
      type="info"
    >
      <template #title>
        <span>
          当前选择：{{ currentSelectedUser.UserName }}({{
            currentSelectedUser.OrgName
          }},{{ currentSelectedUser.UserCode }})
        </span>
      </template>
    </el-alert>
    <el-alert v-else type="info" title="当前没有选择任何人" :closable="false" style="margin: 10px 0" />
    <el-input
      v-model="UserListSearchKey"
      size="mini"
      placeholder="输入“用户名称”关键字搜索"
      clearable
      @input="SearchChange"
    />
    <el-table
      highlight-current-row
      height="355"
      :data="UserTableData"
      @current-change="handleUserListCurrentChange"
    >
      <el-table-column property="UserCode" label="用户编号" fixed />
      <el-table-column property="UserName" label="用户名称" />
      <el-table-column property="Company" label="单位名称" />
      <el-table-column property="OrgName" label="科室名称" />
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      :total="total"
      :page-size="20"
      background
      layout="prev, pager, next"
      @current-change="currentChange"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="UserListDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="!currentSelectedUser || !currentSelectedUser.UserCode"
          @click="handleChangeUser"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { GetUserList } from "@/api/workflow";
export default {
  emits: ["selected"],
  data() {
    return {
      UserListDialogVisible: false,
      currentSelectedUser: {},
      UserListSearchKey: "",
      UserTableData: [],
      total: 0,
      currentPage: 1,
    };
  },
  methods: {
    show() {
      this.currentPage = 1;
      this.UserListSearchKey = "";
      this.UserListDialogVisible = true;
    },
    // 用户列表切换单选
    handleUserListCurrentChange(currentRow, oldRow) {
      this.currentSelectedUser = currentRow;
    },
    // 选择用户窗口，点击确定后的触发
    handleChangeUser() {
      this.$emit("selected", this.currentSelectedUser);
      this.UserListDialogVisible = false;
    },
    // 弹窗之后，在opened里加载数据
    async loadUserList() {
      const res = await GetUserList(this.currentPage, this.UserListSearchKey);
      this.UserTableData = res.list;
      this.total = res.total;
    },

    // 弹窗关闭之后，清理table
    handleCloseUserListDialog() {
      this.currentSelectedUser = {};
    },
    currentChange() {
      this.loadUserList();
    },
    SearchChange() {
      this.loadUserList();
    },
  },
};
</script>

<style>
</style>
