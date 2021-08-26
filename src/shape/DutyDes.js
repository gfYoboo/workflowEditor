import { Shape } from '@antv/x6'
export default class DutyOrg extends Shape.Rect {
}
DutyOrg.config({
    width: 280,
    height: 70,
    attrs: {
        body: {
            stroke: '#7F7F7F',
            strokeWidth: 1,
        },
        label: {
            fill: "#000",
            fontSize: 14,
            fontFamily: "微软雅黑",
            textAnchor: "middle",
            textVerticalAnchor: 'middle',
        },
        text: {
            textWrap: {
                width: -10, // 宽度减少 10px
            }
        }
    },
    data: {
        _disableMove: true,
    }
})
