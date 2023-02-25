<template>
  <el-dialog v-model="showDlg" title="错误信息" width="500px" :close-on-click-modal="false" :before-close="BeforeClose"
    destroy-on-close>
    <ul class="qyui-ul">
      <template v-for="item in manager.validate.ErrorCollection" :key="item">
        <li class="noheight">错误:{{ item }}</li>
      </template>
      <template v-for="item in manager.validate.WarningCollection" :key="item">
        <li class="noheight">警告:{{ item }}</li>
      </template>
    </ul>
  </el-dialog>
</template>

<script setup>
import { ElMessageBox } from 'element-plus';
import { inject } from 'vue';
const manager = inject('manager');

let showDlg = computed({
  get() {
    return manager.states.ShowValidateDlg;
  },
  set(data) {
    manager.states.ShowValidateDlg = data;
  },
});

function BeforeClose(done) {
  if (manager.validate.ErrorCollection.length > 0) {
    done();
  } else if (manager.validate.WarningCollection.length > 0) {
    ElMessageBox.confirm({
      title: '提示',
      message: '是否继续保存当前流程',
      showCancelButton: true,
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    })
      .then((action) => {
        if (action === 'confirm') {
          done();
          manager.SaveWorkFlow();
        }
      }).catch((action) => {
        // 选择取消关闭
        if (action === 'cancel') {
          showDlg.value = false;
        }
      });
  } else {
    manager.SaveWorkFlow();
  }
};
</script>

<style scoped>
.noheight {
  height: auto !important;
  line-height: auto !important;
}
</style>
