<template>
  <div class="qyui-cell row qyui-container">
    <template v-if="manager.states.QuickShowType === 'flow'">
      <el-form>
        <el-form-item label="流程名称">{{ manager.quickWorkFlowInfo.Name }}</el-form-item>
        <el-form-item label="单据类型">{{ manager.quickWorkFlowInfo.DocTypeName }}</el-form-item>
      </el-form>
    </template>
    <template v-if="manager.states.QuickShowType === 'node'">
      <el-form>
        <el-form-item label="节点名称">{{ manager.quickNodeInfo.NodeName }}</el-form-item>
        <el-form-item label="审批描述">{{ manager.quickNodeInfo.TitleDescription }}</el-form-item>
        <el-form-item label="允许不同意">{{ manager.quickNodeInfo.AllowUnCheck }}</el-form-item>
        <el-form-item label="是否可取回">{{ manager.quickNodeInfo.CanReverse }}</el-form-item>

        <el-form-item label="审批前">{{ manager.quickNodeInfo.ProcedureName }}</el-form-item>
        <el-form-item label="审批后">{{ manager.quickNodeInfo.ProcedureAfter }}</el-form-item>
        <el-form-item label="退回前">{{ manager.quickNodeInfo.ProcedureBeforeReject }}</el-form-item>
        <el-form-item label="退回后">{{ manager.quickNodeInfo.ProcedureAfterReject }}</el-form-item>
        <el-form-item label="取回前">{{ manager.quickNodeInfo.ProcedureBeforeBack }}</el-form-item>
        <el-form-item label="取回后">{{ manager.quickNodeInfo.ProcedureAfterBack }}</el-form-item>
        <el-form-item label="流转至">{{ manager.quickNodeInfo.ProcedureInNode }}</el-form-item>
        <el-form-item label="退回至">{{ manager.quickNodeInfo.ProcedureBackIn }}</el-form-item>
        <el-form-item label="审批前-客户端">{{ manager.quickNodeInfo.ProcessVoucher }}</el-form-item>
        <el-form-item label="审批后-客户端">{{ manager.quickNodeInfo.ExecutiveAfter }}</el-form-item>
      </el-form>
    </template>
    <template v-if="manager.states.QuickShowType === 'edge'">
      <el-form>
        <el-form-item label="边描述">{{ manager.quickEdgeInfo.Description }}</el-form-item>
        <el-form-item label="ConditionPIM">{{ manager.quickEdgeInfo.ConditionPIM }}</el-form-item>
        <el-form-item label="ConditionPSM">{{ manager.quickEdgeInfo.ConditionPSM }}</el-form-item>
        <!-- <el-form-item label="PointList">{{ manager.CurrentCell.vertices }}</el-form-item> -->

      </el-form>
    </template>
  </div>
</template>

<script setup>
const manager = inject('manager');

</script>

<style></style>
