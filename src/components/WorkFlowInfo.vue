<template>
  <el-dialog v-model="showDlg"
             width="500px"
             title="流程属性"
             :close-on-click-modal="false"
             @open="openDlg"
             destroy-on-close>
    <el-form label-width="100px">
      <el-form-item label="流程编号">
        <el-input v-model="flow.Code"
                  placeholder="流程编号自动生成"
                  :disabled="true" />
      </el-form-item>
      <el-form-item label="流程名称">
        <el-input v-model="flow.Name"
                  placeholder="请输入流程名称" />
      </el-form-item>
      <el-form-item label="单据类型">
        <el-select v-model="flow.DocTypeName"
                   placeholder="请选择单据类型">
          <el-option v-for="item in DocTypeList"
                     :key="item"
                     :label="item"
                     :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单位名称">
        <el-select v-model="flow.Organization_xID"
                   placeholder="请选择单位名称">
          <el-option v-for="item in CompanyList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否启用">
        <el-switch v-model="flow.IsActive"
                   active-value="Y"
                   inactive-value="N">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否标准流程">
        <el-switch v-model="flow.IsStandard"
                   active-value="Y"
                   inactive-value="N">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否子流程">
        <el-switch v-model="flow.IsSubWorkFlow"
                   active-value="Y"
                   inactive-value="N">
        </el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary"
                 @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { inject } from "vue";
import { mapState } from "vuex";

export default {
  setup() {
    const graph = inject("graph");
    return {
      graph,
    };
  },
  data() {
    return {
      flow: {
        Code: "",
        Name: "",
        DocTypeName: "",
        IsActive: "Y",
        IsStandard: "Y",
        IsSubWorkFlow: "N",
        Organization_xID: ""
      },
      DocTypeList: [],

    }
  },
  computed: {
    ...mapState({
      showFlowDlg: (state) => state.flow.showFlowDlg,
      WorkFlowInfo: (state) => state.WorkFlowInfo,
      DocTypeAndWindowList: (state) => state.DocTypeAndWindowList,
      CompanyList: (state) => state.CompanyList,
    }),
    showDlg: {
      get() {
        return this.showFlowDlg
      },
      set(data) {
        this.$store.commit("flow/setFlowDlgState", data)
      },
    },
  },
  methods: {
    openDlg() {
      this.flow = JSON.parse(JSON.stringify(this.WorkFlowInfo))
      this.DocTypeAndWindowList.forEach(element => {
        this.DocTypeList.push(element.doctype);
      });
    },
    handleConfirm() {
      this.$store.commit("updateFlow", this.flow)

      this.showDlg = false;
    },
    handleCancel() {
      this.showDlg = false;
    },
    handleEdit() {


    }
  }
}
</script>

<style>
</style>