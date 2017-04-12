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
    if (this.svgElements === undefined) {
      this.svgElements = [];
    }

    this.appendMapGroup({
      elementToAppend: this.svg,
      name: parentMap.name,
      x: parentMap.x,
      y: parentMap.y,
      radious: parentMap.radious,
      fillColor: parentMap.fillColor,
      isParent: true
    });

    this.appendAdvancement(parentMap);
  }

  appendAdvancement(parentMap) {
    parentMap.advancement.advancements.forEach(function (item, index) {
      const advancementMap = {
        elementToAppend: this.svg,
        name: item.name,
        x: parentMap.x,
        y: parentMap.y,
        radious: parentMap.radious,
        fillColor: item.fillColor,
        translateX: -120 + (index * 220),
        translateY: -90,
        isParent: false
      };
      this.appendMapGroup(advancementMap);
    }.bind(this));
  }

  appendMapGroup(map) {
    const groupMapAndLine = this.svg.append('g');
    const groupMap = map.isParent ? groupMapAndLine : groupMapAndLine.append('g');

    if (!map.isParent) {
      groupMap.attr('transform', `translate(${map.translateX},${map.translateY})`);
    }

    this.appendMap(groupMap, map);

    if (!map.isParent) {
      this.appendLine({
        elementToAppend: groupMapAndLine,
        startX: map.x,
        startY: map.y,
        endX: map.translateX,
        endY: map.translateY
      });
    }
  }

  appendMap(group, map) {
    const startX = map.x;
    const startY = map.y;
    const x = startX;
    const y = startY - map.radious - 5;

    this.appendText({
      elementToAppend: group,
      text: map.name,
      x: x,
      y: y
    });
    this.appendCircle({
      elementToAppend: group,
      x: map.x,
      y: map.y,
      radious: map.radious,
      fillColor: map.fillColor
    });
  }

  appendCircle(map) {
    map.elementToAppend.append('circle')
      .attr('cx', map.x)
      .attr('cy', map.y)
      .attr('r', map.radious)
      .attr('fill', map.fillColor);
  }

  appendText(map) {
    map.elementToAppend.append('text')
      .text(map.text)
      .attr('x', map.x)
      .attr('y', map.y);
  }

  appendLine(map) {
    console.dir(map);
    map.elementToAppend.append('line')
      .attr('stroke', 'black')
      .attr('x1', map.startX)
      .attr('y1', map.tartY)
      .attr('x2', map.endX)
      .attr('y2', map.endY);
  }
}
