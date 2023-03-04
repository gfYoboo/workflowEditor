<template>
  <el-col :span="12">
    <el-form-item :label="props.label">
      <el-input :modelValue="showValue" type="textarea" :rows="3" readonly resize="none" style="width: 200px;" />
      <el-button icon="edit" @click="showTransferDialog" />
    </el-form-item>
  </el-col>
</template>

<script setup>
import { inject } from 'vue';
const CurrentNode = inject('CurrentNode');
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  field: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['select']);

const showValue = computed(() => {
  return CurrentNode.value[props.field].replace(/;/gm, '\n');
});
function showTransferDialog() {
  emits('select');
}
</script>

<style></style>
