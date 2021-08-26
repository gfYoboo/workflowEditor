<template>
  <div class="fr">
    <el-button type="success"
               @click="handleReset">重新设置</el-button>
  </div>
  <el-table :data="CheckWindowFactorList"
            height="350"
            border
            style="width: 100%"
            :row-class-name="tableRowClassName">
    <el-table-column prop="WindowName"
                     label="单据明细窗口"
                     show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="是否可添加"
                     width="90"
                     align="center">
      <template #default="scope">
        <el-checkbox v-model="scope.row.AddAble"
                     true-label="Y"
                     false-label="N"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column label="是否可删除"
                     width="90"
                     align="center">
      <template #default="scope">
        <el-checkbox v-model="scope.row.DeleteAble"
                     true-label="Y"
                     false-label="N"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column label="是否必须有数据"
                     width="120"
                     align="center">
      <template #default="scope">
        <el-checkbox v-model="scope.row.MustHaveData"
                     true-label="Y"
                     false-label="N"></el-checkbox>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      CheckWindowFactorList: [],
    };
  },
  computed: mapState({
    node: (state) => state.node.CurrentNode,
    WorkFlowInfo: (state) => state.WorkFlowInfo,
    tableRowClassName() {
      return "";
    },
  }),
  mounted() {
    this.initCheckWindowFactor();
  },
  methods: {
    async initCheckWindowFactor() {
      this.CheckWindowFactorList = [];
      const list = await this.$http({
        url: "/api/WorkFlow/CheckOperationPurviewListByDocType",
        data: { DocType: this.WorkFlowInfo.DocTypeName }
      })
      list.forEach(windiwName => {
        let item = {
          WindowName: windiwName,
          AddAble: "N",
          DeleteAble: "N",
          EditAble: "N",
          MustHaveData: "N"
        }
        //判断是否有定义
        const item2 = this.node.CheckWindowFactorList.find(item => item.WindowName === windiwName);
        if (item2) {
          item.AddAble = item2.AddAble;
          item.EditAble = item2.EditAble;
          item.DeleteAble = item2.DeleteAble;
          item.MustHaveData = item2.MustHaveData;
        }
        this.CheckWindowFactorList.push(item)
      });
    },
    handleReset() {
      this.initCheckWindowFactor();
    }
  }

};
</script>

<style>
</style>