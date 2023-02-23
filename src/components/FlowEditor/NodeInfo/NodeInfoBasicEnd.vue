<template>
  <div class="block-container">
    <el-form label-width="70px" inline>
      <el-row>
        <el-col :span="12">
          <el-form-item label="节点名称">
            <el-input v-model="CurrentNode.NodeName" clearable readonly />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="单据状态">
            <el-input v-model="CurrentNode.DocStatus" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  setup() {
    const CurrentNode = inject('CurrentNode');
    return {
      CurrentNode,
    };
  },
  data() {
    return {};
  },
  methods: {

  },
};
</script>
