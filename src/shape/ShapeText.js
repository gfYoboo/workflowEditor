
import { Shape } from "@antv/x6";
export default class ShapeText extends Shape.Rect {
}
ShapeText.config({
  width: 80,
  height: 40,
  zIndex: 100,
  label: "",
  attrs: {
    body: {
      fill: "#ffffff",
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
