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
      <el-button icon="el-icon-edit" @click="showTransferDialog" />
    </el-form-item>
  </el-col>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    field: {
      type: String,
      default: "",
    },
  },
  emits: ["select"],
  data() {
    return {

    };
  },
  computed: {
    ...mapState({
      node: (state) => state.node.CurrentNode,
    }),
    showValue() {
      return this.node[this.field].replace(/;/gm, "\n");
    },
  },
  methods: {
    showTransferDialog() {
      this.$emit("select");
    },
  },
};
</script>

<style>
</style>
