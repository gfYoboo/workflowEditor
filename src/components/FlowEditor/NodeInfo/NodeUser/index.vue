<template>
  <el-form label-width="150px">
    <el-form-item label="审批用户描述">
      <el-select
        v-model="CurrentNode.TitleDescription"
        clearable
        placeholder="报表获取审批签名使用"
        filterable
      >
        <template v-for="(item, index) in manager.NodeUserDesList" :key="index">
          <el-option :value="item" />
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="岗位角色">
      <el-select v-model="CurrentNode.AppointUserID" clearable placeholder="角色岗位选择" filterable>
        <template v-for="item in manager.RelationList" :key="item.id">
          <el-option :label="item.name" :value="item.id" />
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="部门负责人审批">
      <el-switch
        v-model="CurrentNode.OnlyDepartmentManager"
        inline-prompt
        active-text="是"
        inactive-text="否"
        active-value="Y"
        inactive-value="N"
      ></el-switch>
      <el-alert
        style="display:inline"
        type="warning"
        title="预删除功能,尽量选否，然后统一使用岗位角色定义部门负责人"
        :closable="false"
      ></el-alert>
    </el-form-item>
    <el-form-item label="审批人表达式">
      <el-input v-model="CurrentNode.AppointCheckerExpression" readonly>
        <template #append>
          <el-button icon="edit" @click="showExpDialog" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="审批人列表">
      <el-button type="success" plian icon="plus" @click="showNodeUserDialog()">新增</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="CurrentNode.NodeUserList" height="200" border style="width: 100%">
    <el-table-column fixed prop="UserCode" label="用户编码" width="80" />
    <el-table-column fixed prop="UserName" label="用户名称" width="70" />
    <el-table-column prop="OrgName" label="科室名称" width="90" :show-overflow-tooltip="true" />
    <el-table-column prop="ComName" label="单位名称" width="90" :show-overflow-tooltip="true" />
    <el-table-column label="是否本单位审批" width="120">
      <template #default="scope">
        <span v-if="scope.row.DoesOwnCompany === 'Y'">是</span>
        <span v-else>否</span>
      </template>
    </el-table-column>

    <!--              fixed="right"-->
    <el-table-column prop="ConPIM" label="审批条件" width="70" :show-overflow-tooltip="true" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          type="primary"
          icon="edit"
          circle
          size="small"
          @click="showNodeUserDialog(scope.row)"
        />
        <el-button type="danger" icon="delete" circle size="small" @click="delNodeUser(scope.row)" />
      </template>
    </el-table-column>
  </el-table>

  <nodeUserEdit ref="nodeUserEdit" @save="saveNodeUser" />
</template>

<script>
import { inject } from 'vue';

import NodeUserEdit from './NodeUserEdit.vue';
export default {
  components: { NodeUserEdit },
  setup() {
    const manager = inject('manager');
    const CurrentNode = inject('CurrentNode');

    return {
      manager,
      CurrentNode,
    };
  },
  data() {
    return {};
  },
  methods: {
    // 打开编辑“审批人”的窗口
    showNodeUserDialog(obj) {
      this.$refs.nodeUserEdit.show(obj);
    },
    // handleAppointUserChange(val) {
    //   // TODO 平台3.9版本删除此特殊定义
    //   const index = this.manager.RelationList.findIndex((a) => a.id === val);
    //   if (this.manager.RelationList[index].name === "部门负责人") {
    //     this.CurrentNode.OnlyDepartmentManager = "Y";
    //   } else {
    //     this.CurrentNode.OnlyDepartmentManager = "N";
    //   }
    // },
    // 删除当前审批人
    delNodeUser(obj) {
      this.$confirm(
        `此操作无法撤销, 确认要删除【${obj.UserName}(${obj.UserCode})】吗?`,
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      ).then(() => {
        const index = this.CurrentNode.NodeUserList.findIndex(
          (u) => u.UserCode === obj.UserCode,
        );
        this.CurrentNode.NodeUserList.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      }).catch(() => {
        // console.log('已取消删除');
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },
    saveNodeUser(data) {
      // 判断是编辑还是新增
      // 根据ID去找 记录
      const index = this.CurrentNode.NodeUserList.findIndex(
        (d) => d.ID === data.ID,
      );
      if (index > -1) {
        this.CurrentNode.NodeUserList[index] = data;
      } else {
        // 再判断是否已经存在
        const index2 = this.CurrentNode.NodeUserList.findIndex(
          (d) => d.UserCode === data.UserCode,
        );
        if (index2 > -1) {
          this.$message.error(`已存在【${data.UserName}】，不可重复添加！`);
        } else {
          this.CurrentNode.NodeUserList.push(data);
        }
      }
    },
    showExpDialog() {
      this.manager.EditExp({
        Expression: this.CurrentNode.AppointCheckerExpression,
        PsmExpression: '',
        ParameterXml: '',
        ResultType: 'String',
        callback: this.callbackExp,
      });
    },
    callbackExp(data) {
      this.CurrentNode.AppointCheckerExpression = data.Expression;
    },
  },
};
</script>

<style>
</style>
