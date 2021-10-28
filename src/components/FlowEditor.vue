<template>
  <div v-loading="loading" class="qyui-cell row qyui-container">
    <div class="qyui-cell bdb" style="height: 60px">
      <div style="padding: 10px 20px">
        <el-button type="primary" @click="handleSave">保存</el-button>
        <el-button type="success" @click="handleWorkFlow">流程属性</el-button>
      </div>
    </div>
    <div class="qyui-cell col">
      <div class="qyui-cell" style="width: 200px">
        <div
          id="stencilContainer"
          style="position: relative; height: 100%; width: 100%"
        ></div>
      </div>
      <div
        class="qyui-cell row"
        style="background: #88acda;padding: 20px 0;align-items: center;overflow: auto;"
      >
        <div style="background: #ffffff; padding: 20px; border: 1px solid #888888">
          <div id="container"></div>
        </div>
      </div>
    </div>
    <workFlowInfo />
    <noteSelectList />
    <dutyDesInfo />
    <nodeInfo />
    <edgeInfo />
    <editExpression />
    <errorMsg @dosave="handleSaveWorkFlow" />
  </div>
</template>

<script>
import registerNode from "../shape/index";
// import registerTool from "../tool/index";

import initGraph from "../common/graph";
import NoteSelectList from "./Duty/DutyNoteSelectList.vue";
import DutyDesInfo from "./Duty/DutyDesInfo.vue";

import WorkFlowInfo from "./WorkFlowInfo.vue";
import NodeInfo from "./NodeInfo/index.vue";
import EdgeInfo from "./EdgeInfo.vue";

import EditExpression from "./EditExpression.vue";
import ErrorMsg from "./ErrorMsg.vue";
import initWorkFlow from "../common/initWorkFlow";
import initNewWorkFlow from "../common/initNewWorkFlow";
import stencil from "@/common/stencil";
import registerEvent from "@/event/index";
import InitialTemplate from "@/common/InitialTemplate";

import { computed } from "vue";
import { mapState } from "vuex";
import { validate } from "@/common/validate";
import { SaveWorkFlow } from "@/api/workflow";
export default {
  components: {
    WorkFlowInfo,
    NoteSelectList,
    DutyDesInfo,
    NodeInfo,
    EdgeInfo,
    EditExpression,
    ErrorMsg,
  },
  provide() {
    return {
      graph: computed(() => this.graph),
    };
  },
  data() {
    return {
      graph: null,
      DicWorkFlowNoteList: [],
      loading: true,
    };
  },
  computed: {
    ...mapState({
      WorkFlowInfo: (state) => state.WorkFlowInfo,
      WorkFlowNoteList: (state) => state.WorkFlowNoteList,
      NodeList: (state) => state.NodeList,
      ConditionList: (state) => state.ConditionList,
      ErrorCollection: (state) => state.validate.ErrorCollection,
      WarningCollection: (state) => state.validate.WarningCollection,
    }),
  },
  watch: {
    "WorkFlowInfo.Code": function(val) {
      const flowcode = this.graph.getCellById("temp_flowcode");
      flowcode.label = "流程编号:" + val || "";
    },
    "WorkFlowInfo.Name": function(val) {
      const flowname = this.graph.getCellById("temp_flowname");
      flowname.label = "流程名称:" + val || "";
    },
  },
  mounted() {
    console.log(import.meta.env.MODE);
    // 初始化画布
    this.graph = initGraph();
    // 注册工具
    // registerTool();
    // 注册节点
    registerNode();
    // 初始化图例
    stencil(this.graph);

    // 初始化模板
    InitialTemplate(this.graph);

    // 注册画布事件
    registerEvent(this.graph);
    this.init();
  },
  beforeUnmount() {
    this.graph.dispose();
  },
  methods: {
    async init() {
      this.$store.dispatch("GetBasic");
      let WorkFlowId = this.getQueryString("id");
      if (WorkFlowId === "") {
        WorkFlowId = "0";
      }
      if (WorkFlowId === "0") {
        this.$store.dispatch("createNewWorkFlowInfo").then(() => {
          initNewWorkFlow(this.graph);
          this.loading = false;
        });
      } else {
        this.$store.dispatch("GetBasic");
        this.$store.dispatch("GetWorkFlowInfo", WorkFlowId).then(() => {
          initWorkFlow(this.graph);
          this.loading = false;
        });
      }
    },
    getQueryString(key) {
      const re = new RegExp("[&,?]" + key + "=([^\\&]*)", "i");
      const a = re.exec(document.location.search);
      if (a == null) return "";
      return a[1];
    },
    handleSave() {
      this.loading = true;
      // 梳理下节点上的nodex和nodeY
      const nodes = this.graph.getNodes();
      nodes.forEach((node) => {
        if (
          node.shape === "start" ||
          node.shape === "normal" ||
          node.shape === "end"
        ) {
          const index = this.NodeList.findIndex(
            (flownode) => flownode.DBID === node.getData().DBID,
          );
          this.NodeList[index].NodeX = node.position().x;
          this.NodeList[index].NodeY = node.position().y;
        }
        if (
          node.shape === "duty"
        ) {
          const index = this.WorkFlowNoteList.findIndex(
            (note) => note.DBID === node.getData().DBID,
          );
          if (index > -1) {
            this.WorkFlowNoteList[index].DispX = node.position().x;
            this.WorkFlowNoteList[index].DispY = node.position().y;
          }
        }
      });
      validate().then((flag) => {
        if (flag) {
          this.handleSaveWorkFlow();
        } else {
          this.loading = false;
        }
      });
    },
    handleSaveWorkFlow() {
      // 重新计算
      SaveWorkFlow(
        {
          WorkFlowInfo: this.WorkFlowInfo,
          NodeList: this.NodeList,
          ConditionList: this.ConditionList,
          WorkFlowNoteList: this.WorkFlowNoteList,

        }).then(res => {
        if (res) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        }
        this.loading = false;
      });
    },
    handleWorkFlow() {
      this.$store.commit("flow/setFlowDlgState", true);
    },
  },
};
</script>

<style>
</style>
