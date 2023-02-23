<template>
  <el-dialog
    v-model="showDlg"
    title="错误信息"
    width="500px"
    :close-on-click-modal="false"
    :before-close="BeforeClose"
    destroy-on-close
  >
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

<script>
import { inject } from 'vue';

export default {
  setup() {
    const manager = inject('manager');
    return {
      manager,
    };
  },
  data() {
    return {};
  },
  computed: {
    showDlg: {
      get() {
        return this.manager.states.ShowValidateDlg;
      },
      set(data) {
        this.manager.states.ShowValidateDlg = data;
      },
    },
  },
  methods: {
    BeforeClose(done) {
      if (this.manager.validate.ErrorCollection.length > 0) {
        done();
      } else if (this.manager.validate.WarningCollection.length > 0) {
        this.$msgbox({
          title: '提示',
          message: '是否继续保存当前流程',
          showCancelButton: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        })
          .then((action) => {
            if (action === 'confirm') {
              done();
              this.manager.SaveWorkFlow();
            }
          }).catch((action) => {
            // 选择取消关闭
            if (action === 'cancel') {
              this.showDlg = false;
            }
          });
      } else {
        this.manager.SaveWorkFlow();
      }
    },

  },

};
</script>

<style>
.noheight {
  height: auto !important;
  line-height: auto !important;
}
</style>
