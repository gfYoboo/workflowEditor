<template>
  <div class="block-container">
    <el-form label-width="70px" inline>
      <el-row>
        <el-col :span="12">
          <el-form-item label="节点名称">
            <el-input v-model="node.NodeName" readonly />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="单据状态">
            <el-input v-model="node.DocStatus" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="按钮名称">
            <el-input v-model="node.ProcessName" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分组">
            <el-input v-model="node.GroupIndex" clearable style="width:100%" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item>
          <el-checkbox v-model="node.CanReverse" true-label="Y" false-label="N">是否可取回单据</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="node.IsAssign" true-label="Y" false-label="N">是否指定审批人</el-checkbox>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-checkbox v-model="node.MustHaveAttachment" true-label="Y" false-label="N">是否必须有附件</el-checkbox>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: mapState({
    node: (state) => state.node.CurrentNode,
  }),
};
</script>
