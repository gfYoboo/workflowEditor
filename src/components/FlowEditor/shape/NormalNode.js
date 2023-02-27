
export default {
  inherit: 'rect',
  width: 80,
  height: 34,
  zIndex: 100,
  label: '节 点',
  attrs: {
    body: {
      strokeWidth: 1,
      fill: '#b9cce4',
      stroke: '#7F7F7F',
    },
    label: {
      fill: '#000',
      fontSize: 12,
      textAnchor: 'middle',
      textVerticalAnchor: 'middle',
      textWrap: {
        ellipsis: true,
        width: -5,
        height: '125%',
      },
    },
  },
  data: {
    DBID: '',
  },
  ports: {
    items: [
      { id: 'port_left', group: 'group_left' },
      { id: 'port_bottom', group: 'group_bottom' },
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
            // style: {
            //     visibility: 'hidden',
            // },
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
            // style: {
            //     visibility: 'hidden',
            // },
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
            // style: {
            //     visibility: 'hidden',
            // },
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
            // style: {
            //     visibility: 'hidden',
            // },
          },
        },
      },
    },
  },
};
