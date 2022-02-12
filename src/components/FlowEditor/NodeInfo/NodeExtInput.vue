<template>
  <el-col :span="12">
    <el-form-item :label="label">
      <el-input
        :value="showValue"
        type="textarea"
        :rows="3"
        readonly
        resize="none"
        style="width: 200px;"
      />
      <el-button icon="edit" @click="showTransferDialog" />
    </el-form-item>
  </el-col>
</template>

<script>
import { inject } from 'vue';
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    field: {
      type: String,
      default: '',
    },
  },
  emits: ['select'],
  setup() {
    const CurrentNode = inject('CurrentNode');
    return {
      CurrentNode,
    };
  },
  data() {
    return {

    };
  },
  computed: {

    showValue() {
      return this.CurrentNode[this.field].replace(/;/gm, '\n');
    },
  },
  methods: {
    showTransferDialog() {
      this.$emit('select');
    },
  },
};
</script>

<style>
</style>
