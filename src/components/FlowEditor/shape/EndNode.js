import { Shape } from '@antv/x6';
export default class EndNode extends Shape.Rect {
}
EndNode.config({
  width: 80,
  height: 36,
  zIndex: 100,
  label: '结 束',
  attrs: {
    body: {
      strokeWidth: 1,
      fill: '#ffffb1',
      // fill: {
      //   type: "linearGradient",
      //   stops: [
      //     { offset: 0, color: "#cccc13" },
      //     { offset: 1, color: "#ffffb1" },
      //   ],
      //   attrs: {
      //     StartPoint: [0, 1],
      //     EndPoint: [0, 0],
      //   },
      // },
      stroke: '#7F7F7F',
      rx: 20,
      ry: 20,
    },
    label: {
      fill: '#000',
      fontSize: 12,
      textAnchor: 'middle',
      textVerticalAnchor: 'middle',
    },
  },
  data: {
    DBID: '',
  },
  ports: {
    items: [
      { id: 'port_left', group: 'group_left' },
      // { id: "port_bottom", group: 'group_bottom' },
      { id: 'port_right', group: 'group_right' },
      { id: 'port_top', group: 'group_top' },
    ],
    groups: {
      group_left: {
        position: 'left',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5b8ffa',
            strokeWidth: 1,
            fill: '#fff',
          },
        },

      },
      group_bottom: {
        position: 'bottom',

        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5b8ffa',
            strokeWidth: 1,
            fill: '#fff',
          },
        },

      },
      group_right: {
        position: 'right',

        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5b8ffa',
            strokeWidth: 1,
            fill: '#fff',
          },
        },

      },
      group_top: {
        position: 'top',

        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5b8ffa',
            strokeWidth: 1,
            fill: '#fff',
          },
        },

      },
    },
  },
});
