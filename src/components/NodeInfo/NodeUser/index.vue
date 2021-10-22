<template>
  <el-form label-width="100px">
    <el-form-item label="审批用户描述">
      <el-select v-model="node.TitleDescription" clearable placeholder>
        <template v-for="(item,index) in NodeUserDesList" :key="index">
          <el-option :value="item" />
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="选择审批用户">
      <el-select v-model="node.AppointUserID" clearable placeholder>
        <template v-for="item in RelationList" :key="item.value">
          <el-option :label="item.label" :value="item.value" />
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="审批人表达式">
      <el-input v-model="node.AppointCheckerExpression" readonly>
        <template #append>
          <el-button icon="el-icon-edit" @click="showExpDialog" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="审批人列表">
      <el-button
        type="success"
        plain
        size="mini"
        plian
        icon="el-icon-plus"
        @click="showNodeUserDialog()"
      >新增</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="node.NodeUserList" height="200" border style="width: 100%">
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
          icon="el-icon-edit"
          circle
          size="mini"
          @click="showNodeUserDialog(scope.row)"
        />
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          @click="delNodeUser(scope.row)"
        />
      </template>
    </el-table-column>
  </el-table>

  <nodeUserEdit ref="nodeUserEdit" @save="saveNodeUser" />
</template>

<script>
import { mapState } from "vuex";
import NodeUserEdit from "./NodeUserEdit.vue";
export default {
  components: { NodeUserEdit },
  data() {
    return {

    };
  },
  computed: mapState({
    node: (state) => state.node.CurrentNode,
    NodeUserDesList: (state) => state.NodeUserDesList,
    RelationList: (state) => state.RelationList,
  }),
  methods: {
    // 打开编辑“审批人”的窗口
    showNodeUserDialog(obj) {
      this.$refs.nodeUserEdit.show(obj);
    },
    // 删除当前审批人
    delNodeUser(obj) {
      this.$confirm(
        `此操作无法撤销, 确认要删除【${obj.UserName}(${obj.UserCode})】吗?`,
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        },
      )
        .then(() => {
          this.node.NodeUserList.splice(this.node.NodeUserList.findIndex((u) => u.UserCode === obj.UserCode), 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          // console.log('已取消删除');
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    saveNodeUser(data) {
      // 判断是编辑还是新增
      if (data.ID < 0) {
        // 新增
        if (this.node.NodeUserList.findIndex(d => d.UserCode === data.UserCode) > -1) {
          this.$message.error(`已存在【${data.UserName}】，不可重复添加！`);
        } else {
          this.node.NodeUserList.push(data);
        }
      } else {
        const index = this.node.NodeUserList.findIndex(d => d.UserCode === data.UserCode);
        this.node.NodeUserList[index] = data;
      }
    },
    showExpDialog() {
      this.$store.dispatch("expression/editExp",
        {
          Expression: this.node.AppointCheckerExpression,
          PsmExpression: "",
          ParameterXml: "",
          ResultType: "String",
          callback: this.callbackExp,
        });
    },
    callbackExp(data) {
      this.node.AppointCheckerExpression = data.Expression;
    },

  },
};
</script>

<style>
</style>
