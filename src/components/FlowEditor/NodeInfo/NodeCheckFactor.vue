<template>
  <div class="fr">
    <el-button type="success" @click="handleReset">重新设置</el-button>
  </div>
  <el-table :data="CheckFactorList" border height="350" style="width: 100%">
    <el-table-column prop="DispUnit" label="单据字段" show-overflow-tooltip />
    <el-table-column label="是否可修改" width="90" align="center">
      <template #default="scope">
        <el-checkbox v-model="scope.row.CanEdit" true-label="Y" false-label="N" />
      </template>
    </el-table-column>
    <el-table-column label="是否必填" width="70" align="center">
      <template #default="scope">
        <el-checkbox v-model="scope.row.NotNullable" true-label="Y" false-label="N" />
      </template>
    </el-table-column>
    <el-table-column label="是否隐藏" width="70" align="center">
      <template #default="scope">
        <el-checkbox v-model="scope.row.IsHidden" true-label="Y" false-label="N" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { inject } from 'vue';

import { GetCheckFactorList } from '@/api/workflow';
const CurrentNode = inject('CurrentNode');
const manager = inject('manager');

const CheckFactorList = ref([]);

onMounted(() => {
  initCheckFactor();
});

async function initCheckFactor() {
  CheckFactorList.value.length = 0;
  const list = await GetCheckFactorList(manager.CurrentSheetWindowName);
  list.forEach(dispunit => {
    const item = {
      DispUnit: dispunit,
      CanEdit: 'N',
      NotNullable: 'N',
      IsHidden: 'N',
    };
    // 判断是否有定义
    const item2 = CurrentNode.CheckFactorList.find(item => item.DispUnit === dispunit);
    if (item2) {
      item.CanEdit = item2.CanEdit;
      item.NotNullable = item2.NotNullable;
      item.IsHidden = item2.IsHidden;
    }
    CheckFactorList.value.push(item);
  });
}
function handleReset() {
  initCheckFactor();
}

</script>

<style></style>
