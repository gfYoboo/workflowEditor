<template>
  <el-dialog title="错误信息"
             v-model="showDlg"
             width="500px"
             :close-on-click-modal="false"
             :before-close="BeforeClose"
             destroy-on-close>
    <ul class="qyui-ul">
      <template v-for="(item) in ErrorCollection"
                :key="item">
        <li class="noheight">错误:{{item}}</li>
      </template>
      <template v-for="(item) in WarningCollection"
                :key="item">
        <li class="noheight">警告:{{item}}</li>
      </template>
    </ul>

  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      ShowValidateDlg: (state) => state.validate.ShowValidateDlg,
      ErrorCollection: (state) => state.validate.ErrorCollection,
      WarningCollection: (state) => state.validate.WarningCollection,
    }),
    showDlg: {
      get() {
        return this.ShowValidateDlg;
      },
      set(data) {
        this.$store.commit('validate/setValidateDlgState', data)
      }
    },
  },
  methods: {
    BeforeClose(done) {
      if (this.ErrorCollection.length > 0) {
        done();
      }
      else if (this.WarningCollection.length > 0) {
        this.$msgbox({
          title: '提示',
          message: '是否继续保存当前流程',
          showCancelButton: true,
          confirmButtonText: 'confirm',
          cancelButtonText: 'cancel',

        }).then(action => {
          if (action === "confirm") {
            this.$store.dispatch("validate/SaveWorkFlow")
          }
        });
      }
      else {
        this.$store.dispatch("validate/SaveWorkFlow")
      }
    },

  },

}
</script>

<style>
.noheight {
  height: auto !important;
  line-height: auto !important;
}
</style>