import * as D3 from 'd3';

export default class MindMap {
  constructor(element, height, width) {
    this.svg = D3.select(element)
      .append('svg')
      .attr('height', height)
      .attr('width', width)
      .append('g');
  }

  draw(parentMap) {
    if(this.svgElements == undefined) {
      this.svgElements = [];
    }

    this.appendMapGroup(this.svg, parentMap);
  }

  appendMapGroup(elementToAppend, map, parentX, parentY) {
    const group = this.svg.append('g');
    const startX = parentY === undefined ? map.x : parentX;
    const startY = parentY === undefined ? map.y : parentY;
    const x = startX - (map.name.length * 3.3);
    const y =  startY - map.radious - 5;

    this.appendText(group, x, y, map.name);
    this.appendCircle(group, map);
  }

  appendCircle(elementToAppend, map) {
    elementToAppend.append('circle')
      .attr('cx', map.x)
      .attr('cy', map.y)
      .attr('r', map.radious)
      .attr('fill', map.fillColor);
  }

  appendText(elementToAppend, x, y, text) {
    elementToAppend.append('text')
    .text(text)
    .attr('x', x)
    .attr('y', y);
  }
}
