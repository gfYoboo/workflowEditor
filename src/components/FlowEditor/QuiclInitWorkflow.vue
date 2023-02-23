
<template>
  <div class="qyui-cell row qyui-container pd4" style="padding:100px 200px;align-items:center">
    <div class="qyui-cell bdb" style="height:40px;">
      <div>
        <el-button type="primary" @click="handleAdd">增加</el-button>
        <el-button type="primary" @click="handleInit">初始化流程</el-button>
      </div>
    </div>
    <div class="qyui-cell row">
      <el-form inline>
        <template v-for="item in nodeList" :key="item.name">
          <el-row>
            <el-form-item label="部门">
              <el-select v-model="item.NoteName" clearable filterable>
                <el-option
                  v-for="opt in NoteList"
                  :key="opt.ID"
                  :value="opt.ID"
                  :label="opt.NoteName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="节点名称">
              <el-input v-model="item.NodeName" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="handleRemove(item)">移除</el-button>
            </el-form-item>
          </el-row>
        </template>
      </el-form>
    </div>
  </div>
</template>

<script>
// 快速初始化新建流程的职能带节点
import { mapState } from 'vuex';

export default {
  emits: ['init'],
  data() {
    return {
      nodeList: [],
    };
  },
  computed: {
    ...mapState({
      NoteList: (state) => state.NoteList,
    }),
  },
  methods: {
    handleAdd() {
      this.nodeList.push({ NoteName: '', NodeName: '新节点_' + Math.floor((Math.random() * 1000) + 1) });
    },
    handleRemove(item) {
      const index = this.nodeList.findIndex(a => a.NodeName === item.NodeName);
      if (index > -1) {
        this.nodeList.splice(index, 1);
      }
    },
    handleInit() {
      this.$emit('init', this.nodeList);
    },
  },
};
</script>

<style>
</style>
