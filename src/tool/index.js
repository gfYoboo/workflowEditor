import { Graph } from "@antv/x6";
import NodeProperty from "./NodeProperty";

export default () => {
  Graph.registerNodeTool("node-property", NodeProperty, true);
};
