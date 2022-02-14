<template>
  <div v-loading="loading" class="qyui-cell row qyui-container">
    <div class="qyui-cell bdb" style="height: 60px">
      <div style="padding: 10px 20px">
        <el-button type="primary" @click="handleSave">保存</el-button>
        <el-button type="success" @click="handleWorkFlow">流程属性</el-button>
        <el-button type="success" @click="handleWorkFlowNote">职能部门维护</el-button>
        <el-button type="success" @click="handleUndo">撤销</el-button>
        <el-button type="success" @click="handleRedo">重做</el-button>
      </div>
    </div>
    <div class="qyui-cell col">
      <div class="qyui-cell" style="width: 200px">
        <div id="stencilContainer" style="position: relative; height: 100%; width: 100%"></div>
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
    <errorMsg />
    <workFlowNote />
  </div>
</template>

<script>
import registerNode from './shape/index';
// import registerTool from "./tool/index";

import initGraph from './common/graph';
import NoteSelectList from './Duty/DutyNoteSelectList.vue';
import DutyDesInfo from './Duty/DutyDesInfo.vue';

import WorkFlowInfo from './WorkFlowInfo.vue';
import NodeInfo from './NodeInfo/index.vue';
import EdgeInfo from './EdgeInfo.vue';
import WorkFlowNote from './WorkFlowNote.vue';

import EditExpression from './EditExpression.vue';
import ErrorMsg from './ErrorMsg.vue';
import initWorkFlow from './common/initWorkFlow';
import initNewWorkFlow from './common/initNewWorkFlow';
import InitialTemplate from './common/InitialTemplate';
import registerEvent from './common/graphevent.js';

import { computed } from 'vue';
import { getQueryString } from '@/utils/index';
import WorkflowManager from './common/WorkflowManager.js';
export default {
  name: 'FlowEditor',
  components: {
    WorkFlowInfo,
    NoteSelectList,
    DutyDesInfo,
    NodeInfo,
    EdgeInfo,
    EditExpression,
    ErrorMsg,
    WorkFlowNote,
  },
  provide() {
    return {
      graph: computed(() => this.graph),
      manager: computed(() => this.manager),
    };
  },
  data() {
    const manager = new WorkflowManager();
    return {
      manager,
      graph: null,
      DicWorkFlowNoteList: [],
      loading: true,
      demo: import.meta.env.MODE === 'demo',
    };
  },

  watch: {
    'manager.WorkFlowInfo.Code': function (val) {
      const flowcode = this.graph.getCellById('head_flowcode');
      flowcode.label = '流程编号:' + val || '';
    },
    'manager.WorkFlowInfo.Name': function (val) {
      const flowname = this.graph.getCellById('head_flowname');
      flowname.label = '流程名称:' + val || '';
    },
  },
  mounted() {
    console.log(import.meta.env.MODE);
    // 注册节点
    registerNode();

    // 初始化画布
    this.graph = initGraph();
    this.manager.graph = this.graph;
    this.graph.disableHistory();

    // 注册工具
    // registerTool();

    // 初始化模板
    InitialTemplate(this.graph);

    // 注册画布事件
    registerEvent(this.graph, this.manager);
    // 加载流程数据
    this.initWorkFlow();
  },
  beforeUnmount() {
    this.graph.dispose();
  },
  methods: {
    async initWorkFlow() {
      // 获取基本信息
      await this.manager.GetBasic();
      if (this.demo) {
        await this.manager.GetWorkFlowInfo(1);
        initWorkFlow(this.graph, this.manager);
      } else {
        let WorkFlowId = getQueryString('id');
        if (WorkFlowId === '') {
          WorkFlowId = '0';
        }
        if (WorkFlowId === '0') {
          this.manager.CreateNewWorkFlowInfo();
          initNewWorkFlow(this.graph, this.manager);
        } else {
          await this.manager.GetWorkFlowInfo(WorkFlowId);
          initWorkFlow(this.graph, this.manager);
        }
      }
      this.graph.enableHistory();
      this.loading = false;
    },
    getPointByPort(port) {
      switch (port) {
        case 'port_left':
          return '0,0.5';
        case 'port_bottom':
          return '1,0.5';
        case 'port_right':
          return '2,0.5';
        case 'port_top':
          return '3,0.5';
      }
    },
    async handleSave() {
      this.loading = true;
      const cells = this.graph.getCells();
      const WorkFlowNoteList = [];
      const WorkFlowConditionList = [];
      const WorkFlowNodeList = [];
      cells.forEach(cell => {
        if (cell.shape === 'duty') {
          const data = cell.getData();
          if (data.DBID !== '') {
            // 职能带全部删除 重新创建
            const pos = cell.position();
            WorkFlowNoteList.push({ DBID: data.DBID, DispX: pos.x, DispY: pos.y, NoteName: data.NoteName, NoteName_Xid: data.NoteName_Xid || '', Des: data.Des });
          }
        }
        if (cell.shape === 'edge') {
          const data = cell.getData();
          if (data.DBID !== '') {
            // 边全部删除 重新创建
            const sourceId = this.graph.getCellById(cell.source.cell).getData().DBID;
            const targetId = this.graph.getCellById(cell.target.cell).getData().DBID;
            const PointList = this.getPointByPort(cell.source.port) + ';' + this.getPointByPort(cell.target.port) + ';0,0';
            WorkFlowConditionList.push(
              {
                DBID: data.DBID,
                ConditionPIM: data.ConditionPIM,
                ConditionPSM: data.ConditionPSM,
                Description: data.Description,
                NodeFrom_XID: sourceId,
                NodeTo_XID: targetId,
                Parameter: data.Parameter,
                PointList: PointList,
              });
          }
        }
        if (
          cell.shape === 'start' ||
          cell.shape === 'normal' ||
          cell.shape === 'end'
        ) {
          const data = cell.getData();
          const pos = cell.position();

          data.NodeX = pos.x;
          data.NodeY = pos.y;
          WorkFlowNodeList.push(data);
        }
      });
      this.manager.WorkFlowNoteList = WorkFlowNoteList;
      const flag = await this.manager.validate.Validate(WorkFlowNodeList, WorkFlowConditionList);
      if (flag) {
        this.manager.SaveWorkFlow();
        this.loading = false;
      } else {
        this.manager.states.ShowValidateDlg = true;
        this.loading = false;
      }
    },

    handleWorkFlow() {
      this.manager.states.ShowWorkFlowDlg = true;
    },
    handleWorkFlowNote() {
      this.manager.states.ShowWorkFlowNoteDlg = true;
    },
    handleUndo() {
      this.graph.undo();
    },
    handleRedo() {
      this.graph.redo();
    },
  },
};
</script>
