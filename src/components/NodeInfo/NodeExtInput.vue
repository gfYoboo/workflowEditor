<template>
  <el-col :span="12">
    <el-form-item :label="label">
      <el-input v-model="node[field]"
                type="textarea"
                :rows="3"
                readonly
                resize="none"
                style="width: 200px;">
      </el-input>
      <el-button icon="el-icon-edit"
                 @click="showTransferDialog"></el-button>
    </el-form-item>
  </el-col>
</template>

<script>
import { mapState } from "vuex";

export default {
  emits: ["select"],
  data() {
    return {

    }
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    field: {
      type: String,
      default: ""
    },
  },
  computed: mapState({
    node: (state) => state.node.CurrentNode,
  }),
  methods: {
    showTransferDialog() {
      this.$emit("select")
    }
  }
}
</script>

<style>
</style>