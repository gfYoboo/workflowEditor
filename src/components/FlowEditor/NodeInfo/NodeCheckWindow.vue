<template>
  <div class="fr">
    <el-button type="success" @click="handleReset">重新设置</el-button>
  </div>
  <el-table :data="CheckWindowFactorList" height="350" border style="width: 100%" :row-class-name="tableRowClassName">
    <el-table-column prop="WindowName" label="单据明细窗口" show-overflow-tooltip />
    <el-table-column label="是否可添加" width="90" align="center">
      <template #default="scope">
        <el-checkbox v-model="scope.row.AddAble" true-label="Y" false-label="N" />
      </template>
    </el-table-column>
    <!-- 是否可编辑由审批要素控制  -->
    <el-table-column label="是否可编辑" width="90" align="center">
      <template #default="scope">
        <el-checkbox v-model="scope.row.EditAble" disabled true-label="Y" false-label="N" />
      </template>
    </el-table-column>
    <el-table-column label="是否可删除" width="90" align="center">
      <template #default="scope">
        <el-checkbox v-model="scope.row.DeleteAble" true-label="Y" false-label="N" />
      </template>
    </el-table-column>
    <el-table-column label="是否必须有数据" width="120" align="center">
      <template #default="scope">
        <el-checkbox v-model="scope.row.MustHaveData" true-label="Y" false-label="N" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { GetCheckOperationPurviewList } from '@/api/workflow';
import { inject } from 'vue';
const CurrentNode = inject('CurrentNode');
const manager = inject('manager');
const CheckWindowFactorList = ref([]);
onMounted(() => {
  initCheckWindowFactor();
});

function tableRowClassName({ row, rowIndex }) {
  // 表单窗口的主表不受操作权限控制，由主表的审批要素决定是否可编辑
  if (rowIndex === 0) {
    return 'qyui-hide';
  } else { return ''; }
}
async function initCheckWindowFactor(reset) {
  CheckWindowFactorList.value.length = 0;
  const list = await GetCheckOperationPurviewList(manager.CurrentSheetWindowName);
  list.forEach(windowName => {
    const item = {
      WindowName: windowName,
      AddAble: 'N',
      DeleteAble: 'N',
      EditAble: 'N',
      MustHaveData: 'N',
    };
    if (CurrentNode.value.NodeType === 'Start') {
      item.AddAble = 'Y';
      item.DeleteAble = 'Y';
      item.EditAble = 'Y';
    }

    if (!reset) {
      // 判断是否有定义
      const item2 = CurrentNode.value.CheckWindowFactorList.find(item => item.WindowName === windowName);
      if (item2) {
        item.AddAble = item2.AddAble;
        item.EditAble = item2.EditAble;
        item.DeleteAble = item2.DeleteAble;
        item.MustHaveData = item2.MustHaveData;
      }
    }
    CheckWindowFactorList.value.push(item);
  });
}
function handleReset() {
  initCheckWindowFactor(true);
}

</script>

<style></style>
