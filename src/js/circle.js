import * as D3 from 'd3';

export default class Circle {
  constructor(element, height, width) {
    this.svg = D3.select(element)
      .append('svg')
      .attr('height', height)
      .attr('width', width);
  }

  draw(x, y, radious) {
    this.svg.append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', radious)
      .attr('fill', 'orange');
  }
}
