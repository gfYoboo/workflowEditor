import { Shape } from '@antv/x6';
export default class ShapeImg extends Shape.Image {

}
ShapeImg.config({
  width: 80,
  height: 80,
  zIndex: 100,
  imageUrl: 'ics.png',
  attrs: {
    body: {
      fill: '#ffffff',
      stroke: '#7F7F7F',
      strokeWidth: 1,
    },
  },
  data: {
    _disableMove: true,
  },
});
