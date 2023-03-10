export function getPointByPort(port) {
  // 记录连接点和方向。现在只用了4个方向的中心点位置  所以都是0.5
  // 比如 0,0.5：代表左边中心桩点
  // 比如 1,0.5：代表底边中心桩点
  // 比如 2,0.5：代表右边中心桩点
  // 比如 3,0.5：代表顶边中心桩点
  // 例如0,0.5;3,0.5;0,0 代表起始点左侧，终点的顶部，0，0代表无路径点 前代表x轴值 后代表Y轴值
  // 如果有转折点，也就是路径点 vertices 0,0.5;3,0.5;100,100;200,200代表中间经过x:100,y:100,x:200,y:200这2个点
  switch (port) {
    case 'port_left':
      return '0,0.5';
    case 'port_bottom':
      return '1,0.5';
    case 'port_right':
      return '2,0.5';
    case 'port_top':
      return '3,0.5';
  }
}
