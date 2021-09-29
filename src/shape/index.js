import { Graph } from "@antv/x6";

// 开始节点
import StartNode from "./StartNode";
import EndNode from "./EndNode";
import NormalNode from "./NormalNode";
import ShapeImg from "./ShapeImg";
import ShapeText from "./ShapeText";
import Duty from "./Duty";
import DutyOrg from "./DutyOrg";
import DutyDes from "./DutyDes";

export default () => {
  Graph.registerNode("start", StartNode, true);
  Graph.registerNode("end", EndNode, true);
  Graph.registerNode("normal", NormalNode, true);
  Graph.registerNode("shapeimg", ShapeImg, true);
  Graph.registerNode("shapetext", ShapeText, true);
  Graph.registerNode("duty", Duty, true);
  Graph.registerNode("dutyorg", DutyOrg, true);
  Graph.registerNode("dutydes", DutyDes, true);
};
