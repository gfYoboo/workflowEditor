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

<script>
import { inject } from 'vue';

import { GetCheckFactorList } from '@/api/workflow';
export default {
  setup() {
    const CurrentNode = inject('CurrentNode');
    const manager = inject('manager');

    return {
      CurrentNode,
      manager,
    };
  },
  data() {
    return {
      CheckFactorList: [],
    };
  },

  mounted() {
    this.initCheckFactor();
  },
  methods: {
    async initCheckFactor() {
      this.CheckFactorList = [];
      const list = await GetCheckFactorList(this.manager.CurrentSheetWindowName);
      list.forEach(dispunit => {
        const item = {
          DispUnit: dispunit,
          CanEdit: 'N',
          NotNullable: 'N',
          IsHidden: 'N',
        };
        // 判断是否有定义
        const item2 = this.CurrentNode.CheckFactorList.find(item => item.DispUnit === dispunit);
        if (item2) {
          item.CanEdit = item2.CanEdit;
          item.NotNullable = item2.NotNullable;
          item.IsHidden = item2.IsHidden;
        }
        this.CheckFactorList.push(item);
      });
    },
    handleReset() {
      this.initCheckFactor();
    },
  },
};
</script>

<style>
</style>
