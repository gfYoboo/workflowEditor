import { Shape } from "@antv/x6";
export default class DutyOrg extends Shape.Rect {
}
DutyOrg.config({
  width: 260,
  height: 70,
  attrs: {
    body: {
      stroke: "#7F7F7F",
      strokeWidth: 1,
    },
    label: {
      fill: "#000",
      fontSize: 14,
      fontFamily: "微软雅黑",
      textAnchor: "middle",
      textVerticalAnchor: "middle",
    },
  },
  data: {
    _disableMove: true,
  },
});
