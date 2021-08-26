<template>
  <el-form label-width="110px">
    <el-row v-if="node.NodeType!=='End'">
      <nodeExtInput label="服务端处理功能(流转前)"
                    field="ProcedureName"
                    @select="PopSelect('ProcedureName')"></nodeExtInput>
      <nodeExtInput label="服务端处理功能(流转后)"
                    field="ProcedureAfter"
                    @select="PopSelect('ProcedureAfter')"></nodeExtInput>
    </el-row>
    <el-row v-if="node.NodeType!=='End'">
      <nodeExtInput label="服务端处理功能(退回前)"
                    field="ProcedureBeforeReject"
                    @select="PopSelect('ProcedureBeforeReject')"></nodeExtInput>
      <nodeExtInput label="服务端处理功能(退回后)"
                    field="ProcedureAfterReject"
                    @select="PopSelect('ProcedureAfterReject')"></nodeExtInput>

    </el-row>
    <el-row>
      <nodeExtInput v-if="node.NodeType!=='Start'"
                    label="服务端处理功能(流转至)"
                    field="ProcedureInNode"
                    @select="PopSelect('ProcedureInNode')"></nodeExtInput>
      <nodeExtInput v-if="node.NodeType!=='End'"
                    label="服务端处理功能(退回至)"
                    field="ProcedureBackIn"
                    @select="PopSelect('ProcedureBackIn')"></nodeExtInput>
    </el-row>
    <el-row v-if="node.NodeType!=='End'">
      <nodeExtInput label="服务端处理功能(取回前)"
                    field="ProcedureBeforeBack"
                    @select="PopSelect('ProcedureBeforeBack')"></nodeExtInput>
      <nodeExtInput label="服务端处理功能(取回后)"
                    field="ProcedureAfterBack"
                    @select="PopSelect('ProcedureAfterBack')"></nodeExtInput>
    </el-row>
    <el-row v-if="node.NodeType!=='End'">
      <nodeExtInput label="客户端处理功能(流转前)"
                    field="ProcessVoucher"
                    @select="PopSelectClient('ProcessVoucher')"></nodeExtInput>
      <nodeExtInput label="客户端处理功能(流转后)"
                    field="ExecutiveAfter"
                    @select="PopSelectClient('ExecutiveAfter')"></nodeExtInput>
    </el-row>
  </el-form>
  <el-dialog title="处理功能"
             v-model="showDlg">
    <div class="qyui-cell col qyui-container"
         style="height:500px">
      <div class="qyui-cell row bdr"
           style="overflow: auto;">
        <el-tree :data="treeList"
                 @currentChange="currentTreeChange"
                 highlight-current
                 accordion></el-tree>
      </div>
      <div class="qyui-cell"
           style="width:80px">
        <div class="qyui-cell row">
          <div>
            <el-button @click="handleAdd">增加</el-button>
            <el-button @click="handleDelete">删除</el-button>
          </div>
        </div>
      </div>
      <div class="qyui-cell row bdl">
        <ul class="qyui-ul">
          <template v-for="item in list"
                    :key="item">
            <li :class="{ active: item === currentItem }"
                @click="handleClick(item)">{{item}}</li>
          </template>
        </ul>

      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary"
                   @click="handleConfirm">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import NodeExtInput from "./NodeExtInput.vue"
export default {
  components: { NodeExtInput },
  data() {
    return {
      showDlg: false,
      treeList: [],
      currentTreeRow: {},
      list: [],
      currentFieldName: "",
      currentItem: ""

    };
  },
  computed: mapState({
    node: (state) => state.node.CurrentNode,
    ServerFunctionList: (state) => state.ServerFunctionList,
  }),
  methods: {
    PopSelect(fieldName) {
      this.currentFieldName = fieldName;
      this.showDlg = true;
      this.treeList = [];
      for (let el in this.ServerFunctionList) {
        let item = { label: el, isFunc: false, children: [] }
        for (let i = 0; i < this.ServerFunctionList[el].length; i++) {
          item.children.push({ label: this.ServerFunctionList[el][i], isFunc: true })
        }

        this.treeList.push(item)
      };
      if (this.node[fieldName]) {
        this.list = this.node[fieldName].split("\n");
      }
      else {
        this.list = [];
      }
    },
    PopSelectClient(fieldName) {
      this.showDlg = true;
    },
    currentTreeChange(row) {
      this.currentTreeRow = row;
    },
    handleAdd() {
      if (this.currentTreeRow.isFunc) {
        this.list.push(this.currentTreeRow.label)
      }
      else {
        this.$message({ message: "无法选择目录" })
      }
    },
    handleDelete() {
      if (this.currentItem) {
        let index = this.list.findIndex(item => item === this.currentItem);
        this.list.splice(index, 1)
      }
    },
    handleConfirm() {
      this.node[this.currentFieldName] = this.list.join("\n")
      this.showDlg = false;
    },
    handleCancel() {
      this.showDlg = false;
    },
    handleClick(item) {
      this.currentItem = item;
    }
  },
};
</script>

<style>
</style>