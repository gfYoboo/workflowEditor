<template>
  <div v-loading="loading" class="qyui-cell row qyui-container">
    <div class="qyui-cell bdb" style="height: 60px">
      <div style="padding: 10px 20px">
        <el-button type="primary" @click="handleSave">保存</el-button>
        <el-button type="success" @click="handleWorkFlow">流程属性</el-button>
        <el-button type="success" @click="handleWorkFlowNote">职能部门维护</el-button>
        <el-button type="success" @click="handleUndo">撤销</el-button>
        <el-button type="success" @click="handleRedo">重做</el-button>
        <!-- <div>
          <span>
            <el-icon>
              <refresh-left />
            </el-icon>
          </span>
          <span></span>
        </div>
        <div>
          <span>
            <el-icon>
              <refresh-right />
            </el-icon>
          </span>
          <span></span>
        </div>-->
      </div>
    </div>
    <div class="qyui-cell col">

      <div class="qyui-cell" style="width: 120px">
        <div id="stencilContainer" style="position: relative; height: 100%; width: 100%"></div>
      </div>

      <div class="qyui-cell row" style="background: #88acda;padding: 20px 0;align-items: center;overflow: auto;">
        <div style="background: #ffffff; padding: 20px; border: 1px solid #888888">
          <div id="container"></div>
        </div>
      </div>

      <div class="qyui-cell" style="width: 300px">
        <QuickShowInfo></QuickShowInfo>
      </div>

    </div>

    <WorkFlowInfo v-model="ShowWorkFlowDlg" />
    <NoteSelectList v-model="ShowWorkFlowNoteDlg" />
    <DutyDesInfo />
    <NodeInfo />
    <EdgeInfo />
    <EditExpression />
    <ErrorMsg />
    <WorkFlowNote />
  </div>
</template>

<script setup>

import registerNode from './shape/index.js';
// import registerTool from "./tool/index";

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
import registerEvent from './config/events.js';

import { getQueryString } from '@/utils/index';
import WorkflowManager from './common/WorkflowManager.js';
import QuickShowInfo from './QuickShowInfo.vue';

import createGraph from './config/graph.js';
import { getPointByPort } from './util/index.js';
const graph = ref(null);

const manager = reactive(new WorkflowManager());

provide('graph', graph);
provide('manager', manager);
// const DicWorkFlowNoteList = ref([]);
const loading = ref(true);
const demo = import.meta.env.MODE === 'demo';

watch(() => manager.WorkFlowInfo.Code, (val) => {
  const flowcode = graph.value.getCellById('head_flowcode');
  flowcode.label = '流程编号:' + val || '';
});
watch(() => manager.WorkFlowInfo.Name, (val) => {
  const flowname = graph.value.getCellById('head_flowname');
  flowname.label = '流程名称:' + val || '';
});

onMounted(async () => {
  console.log(import.meta.env.MODE);
  // 注册节点
  registerNode();
  // 初始化画布
  const graphObj = createGraph('container', 'stencilContainer', manager);
  graph.value = graphObj;
  // 注册工具
  // registerTool();
  // 初始化模板
  InitialTemplate(graphObj);
  // 注册画布事件
  registerEvent(graphObj, manager);
  // 加载流程数据
  await init();
});

onBeforeUnmount(() => {
  graph.value.dispose();
});

async function init() {
  // 获取支撑流程图展示的基本信息
  await manager.GetBasic();
  if (demo) {
    // 演示环境使用数据
    await manager.GetWorkFlowInfo(1);
    initWorkFlow(graph.value, manager);
  } else {
    // 判断传入参数
    let WorkFlowId = getQueryString('id');
    if (WorkFlowId === '') {
      WorkFlowId = '0';
    }
    if (WorkFlowId === '0') {
      // 默认空 或是0 为新建流程
      manager.CreateNewWorkFlowInfo();
      initNewWorkFlow(graph.value, manager);
    } else {
      // 根据id获取流程数据
      await manager.GetWorkFlowInfo(WorkFlowId);
      // 初始化流程展示
      initWorkFlow(graph.value, manager);
    }
  }
  graph.value.enableHistory();
  loading.value = false;
};

async function handleSave() {
  // 保存流程
  loading.value = true;
  // 获取画布上的所有 元素
  const cells = graph.value.getCells();
  // 待传输到后台的数据结构
  const WorkFlowNoteList = [];
  const WorkFlowConditionList = [];
  const WorkFlowNodeList = [];
  // 循环处理节点信息
  cells.forEach(cell => {
    // 职能带的处理
    if (cell.shape === 'duty') {
      const data = cell.getData();
      if (data.DBID !== '') {
        // 职能带全部删除 重新创建
        const pos = cell.position();
        WorkFlowNoteList.push({ DBID: data.DBID, DispX: pos.x, DispY: pos.y, NoteName: data.NoteName, NoteName_Xid: data.NoteName_Xid || '', Des: data.Des });
      }
    }
    // 边连接线的处理
    if (cell.shape === 'edge') {
      const data = cell.getData();
      if (data.DBID !== '') {
        // 边全部删除 重新创建
        const sourceId = graph.value.getCellById(cell.source.cell).getData().DBID;
        const targetId = graph.value.getCellById(cell.target.cell).getData().DBID;
        let PointList = getPointByPort(cell.source.port) + ';' + getPointByPort(cell.target.port) + ';';
        if (cell.vertices.length === 0) {
          PointList += '0,0;';
        } else {
          cell.vertices.forEach(item => {
            PointList += (item.x + ',' + item.y + ';');
          });
        }
        // 业务上存储边
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
    // 开始节点 节点 结束节点的处理
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
  manager.WorkFlowNoteList = WorkFlowNoteList;
  // 保存流程 请求后端
  manager.SaveWorkFlow(WorkFlowNodeList, WorkFlowConditionList);
}
const ShowWorkFlowDlg = ref(false);
function handleWorkFlow() {
  // 显示流程属性维护窗口
  ShowWorkFlowDlg.value = true;
}
const ShowWorkFlowNoteDlg = ref(false);
function handleWorkFlowNote() {
  // 显示职能带维护
  ShowWorkFlowNoteDlg.value = true;
}
function handleUndo() {
  // 撤销
  graph.value.undo();
}
function handleRedo() {
  // 回做
  graph.value.redo();
}

</script>
