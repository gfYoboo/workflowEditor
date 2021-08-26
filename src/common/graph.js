import { Graph } from "@antv/x6";

export default () => {
    const graph = new Graph({
        container: document.getElementById("container"),
        width: 911,
        height: 1401,
        background: {
            color: "#ffffff", // 设置画布背景颜色
        },
        snapline: {
            enabled: true, //	对齐线
            sharp: true,
        },
        grid: {
            size: 10,
            visible: true,
            type: "doubleMesh",
            args: [
                {
                    color: "#aaaaaa",
                    thickness: 0.5,
                },
                {
                    color: "#888888",
                    thickness: 1,
                    factor: 5,
                },
            ],
        },
        // 键盘快捷键 Keyboard
        // https://antv-x6.gitee.io/zh/docs/tutorial/basic/keyboard/#gatsby-focus-wrapper
        keyboard: {
            enabled: true,
            global: true,
        },
        interacting: {
            nodeMovable: function (cellView) {
                if (cellView.cell.getData()?._disableMove) {
                    return false;
                }
            }
        },
        connecting: {
            anchor: 'center',
            connectionPoint: 'anchor',
            // 自动吸附
            snap: {
                radius: 20
            },
            // 不允许连接到画布空白位置的点
            allowBlank: false,
            //是否允许在相同的起始节点和终止之间创建多条边
            allowMulti: false,
            //是否允许创建循环连线
            allowLoop: false,
            //是否允许边链接到节点
            allowNode: false,
            //是否允许边链接到另一个边
            allowEdge: false,
            // 高亮显示所有可用的连接桩或节点
            highlight: true,
            // 路由将边的路径点 vertices 做进一步转换处理，并在必要时添加额外的点，然后返回处理后的点，默认值为 normal。
            router: {
                name: 'manhattan',
                args: {
                    step: 3,
                    excludeShapes: ["duty", "dutyorg", "dutydes"]
                }
            },
            connector: { name: 'rounded' },
        },
        highlighting: {
            // 当链接桩可以被链接时，在链接桩外围渲染一个 2px 宽的红色矩形框
            magnetAvailable: {
                name: "stroke",
                args: {
                    padding: 4,
                    attrs: {
                        "stroke-width": 4,
                        stroke: "skyblue",
                    },
                },
            },
            // 连线过程中，自动吸附到链接桩时被使用
            magnetAdsorbed: {
                name: "stroke",
                args: {
                    padding: 4,
                    attrs: {
                        "stroke-width": 8,
                        stroke: "skyblue",
                    },
                },
            },
        },
        //返回是否响应框选事件。
        allowRubberband: false,
        selecting: {
            enabled: true,
            movable: true,
            //是否显示节点的选择框
            showNodeSelectionBox: false,
            //是否显示边的选择框
            showEdgeSelectionBox: false,
            filter: ["shapeimg", "shapetext", "duty"]
        },
        // connecting: { 
        //   createEdge() {
        //     return new Shape.Edge({
        //       attrs: {
        //         line: {
        //           stroke: '#000',
        //           strokeWidth: 1,
        //           targetMarker: {
        //             name: 'block',
        //             width: 12,
        //             height: 8,
        //           },
        //         },
        //       },
        //       zIndex: 0,
        //     })
        //   },
        //   validateConnection({ targetMagnet }) {
        //     return !!targetMagnet
        //   },
        // }, 
    });
   

    // graph.addEdge({
    //     source,
    //     target,
    //     router: {
    //         name: 'orth',
    //         args: {

    //         },
    //     },
    // })

    return graph

}