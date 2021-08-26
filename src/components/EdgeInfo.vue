<template>
  <el-dialog v-model="showDlg"
             width="500px"
             title="边属性"
             :close-on-click-modal="false"
             @open="openDlg"
             destroy-on-close>
    <el-form label-position="top"
             label-width="85px">
      <el-form-item label="描述">
        <el-input type="textarea"
                  v-model="CurrentEdge.Description"
                  :rows="2"
                  resize="none"></el-input>
      </el-form-item>
      <el-form-item label="逻辑表达式">
        <el-input v-model="CurrentEdge.ConditionPIM"
                  :readonly="true"
                  type="textarea"
                  :rows="3"
                  resize="none"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleEdit">编辑表达式</el-button>

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
      CurrentEdge: {
        Description: "",
        ConditionPIM: "",
        ConditionPSM: "",
        Parameter: "",
        ConditionPIM: "",
        DBID: "",
        NodeFrom_XID: "",
        NodeTo_XID: "",
        PointList: "",
      }
    }
  },
  computed: {
    ...mapState({
      edge: (state) => state.edge.CurrentEdge,
      showEdgeDlg: (state) => state.edge.showEdgeDlg,
    }),
    showDlg: {
      get() {
        return this.showEdgeDlg
      },
      set(data) {
        this.$store.commit("edge/setEdgeDlgState", data)
      },
    },
  },
  methods: {
    openDlg() {
       this.CurrentEdge = JSON.parse(JSON.stringify(this.edge));
    },
    handleConfirm() {
      this.showDlg = false;
      this.$store.dispatch("edge/updateEdge", this.CurrentEdge)
    },
    handleCancel() {
      this.showDlg = false;
    },
    handleEdit() {
      this.$store.dispatch("expression/editExp",
        {
          Expression: this.CurrentEdge.ConditionPIM,
          PsmExpression: this.CurrentEdge.ConditionPSM,
          ParameterXml: this.CurrentEdge.Parameter,
          ResultType: "Boolean",
          callback: this.callbackExp
        })
    },
    callbackExp(data) {
       this.CurrentEdge.ConditionPIM = data.Expression;
      this.CurrentEdge.ConditionPSM = data.PsmExpression;
      this.CurrentEdge.Parameter = data.ParameterXml;
    }
  }
}
</script>

<style>
</style>