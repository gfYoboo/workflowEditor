<template>
  <div class="block-container">
    <el-form label-width="70px" inline>
      <el-row>
        <el-col :span="12">
          <el-form-item label="节点名称">
            <el-input v-model="CurrentNode.NodeName" readonly />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="单据状态">
            <el-input v-model="CurrentNode.DocStatus" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="按钮名称">
            <el-input v-model="CurrentNode.ProcessName" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分组">
            <el-input v-model="CurrentNode.GroupIndex" clearable style="width:100%" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item>
          <el-checkbox v-model="CurrentNode.CanReverse" true-label="Y" false-label="N">是否可取回单据</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="CurrentNode.IsAssign" true-label="Y" false-label="N">是否指定审批人</el-checkbox>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-checkbox v-model="CurrentNode.MustHaveAttachment" true-label="Y" false-label="N">是否必须有附件</el-checkbox>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { inject } from 'vue';
const CurrentNode = inject('CurrentNode');

</script>
