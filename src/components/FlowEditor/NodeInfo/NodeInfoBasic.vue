<template>
  <div class="block-container">
    <el-form label-width="70px" inline>
      <el-row>
        <el-col :span="12">
          <el-form-item label="节点名称">
            <el-input v-model="CurrentNode.NodeName" clearable />
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
        <el-col :span="12">
          <el-form-item label="通过策略">
            <el-select v-model="CurrentNode.TicketQty">
              <el-option label="全部审批通过则单据流转" value="0" />
              <el-option label="一人审批通过则单据流转" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item style="width:100%" label="岗位职责">
            <el-input v-model="CurrentNode.DutyDes" clearable type="textarea" :rows="2" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="超时时间">
          <el-input v-model="CurrentNode.MaxStayTime" clearable>
            <template #append>天</template>
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-checkbox v-model="CurrentNode.AllowUnCheck" true-label="Y" false-label="N">是否允许不同意</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="CurrentNode.IsNeedCA" true-label="Y" false-label="N">是否需要CA认证</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="CurrentNode.CanReverse" true-label="Y" false-label="N">是否可取回单据</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="CurrentNode.IsAssign" true-label="Y" false-label="N">是否指定审批人</el-checkbox>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-checkbox v-model="CurrentNode.CanAutoCheck" true-label="Y" false-label="N">二次审批自动通过</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="CurrentNode.AutoCheckOwnDoc" true-label="Y" false-label="N">自身单据自动通过</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="CurrentNode.AllowEditDocument" true-label="Y" false-label="N">是否允许编辑文档</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="CurrentNode.AllowPrintDocument" true-label="Y" false-label="N">是否允许打印文档</el-checkbox>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item>
          <el-checkbox v-model="CurrentNode.CanSelectBackToNode" true-label="Y" false-label="N">是否可选择退回节点</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="CurrentNode.CanBackIn" true-label="Y" false-label="N">是否退回节点</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="CurrentNode.IsAutoNode" true-label="Y" false-label="N">是否自动流转节点</el-checkbox>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item>
          <el-checkbox v-model="CurrentNode.MustHaveAttachment" true-label="Y" false-label="N">是否必须有附件</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="CurrentNode.EditAttacher" true-label="Y" false-label="N">是否可修改附件</el-checkbox>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { inject } from 'vue';
const CurrentNode = inject('CurrentNode');

</script>
