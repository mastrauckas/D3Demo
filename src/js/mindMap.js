import * as D3 from 'd3';
import PositionInformation from './positionInformation';

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

    if (parentMap.advancement.advancements !== undefined) {
      this.appendChildren({
        parentMap,
        childrenMaps: parentMap.advancement.advancements,
        lineName: parentMap.advancement.name,
        translateX: parentMap.advancement.translateX,
        translateY: parentMap.advancement.translateY,
        translateIndex: parentMap.advancement.translateIndex,
      });
    }

    if (parentMap.stepDown.stepDowns !== undefined) {
      this.appendChildren({
        parentMap,
        childrenMaps: parentMap.stepDown.stepDowns,
        lineName: parentMap.stepDown.name,
        translateX: parentMap.stepDown.translateX,
        translateY: parentMap.stepDown.translateY,
        translateIndex: parentMap.stepDown.translateIndex
      });
    }

    if (parentMap.lateral.laterals !== undefined) {
      this.appendChildren({
        parentMap,
        childrenMaps: parentMap.lateral.laterals,
        lineName: parentMap.lateral.name,
        translateX: parentMap.lateral.translateX,
        translateY: parentMap.lateral.translateY,
        translateIndex: parentMap.lateral.translateIndex
      });
    }

    const positionInformation = new PositionInformation(parentMap.name,
      parentMap.positionInformation.salary,
      parentMap.positionInformation.officialDocument,
      parentMap.positionInformation.requirements,
      parentMap.hasOwnMap);

    positionInformation.updateUi();

    this.appendMapGroup({
      elementToAppend: this.svg,
      name: parentMap.name,
      x: parentMap.x,
      y: parentMap.y,
      radious: parentMap.radious,
      fillColor: parentMap.fillColor,
      strokeColor: parentMap.strokeColor,
      strokeWidth: parentMap.strokeWidth,
      positionInformation,
      isParent: true
    });
  }

  appendChildren(map) {
    map.childrenMaps.forEach((item, index) => {

      this.appendMapGroup({
        elementToAppend: this.svg,
        name: item.name,
        x: map.parentMap.x,
        y: map.parentMap.y,
        radious: item.radious,
        fillColor: item.fillColor,
        strokeColor: item.strokeColor,
        strokeWidth: item.strokeWidth,
        lineName: map.lineName,
        translateX: map.translateX + (index * map.translateIndex),
        translateY: map.translateY,
        positionInformation: new PositionInformation(item.name,
          item.positionInformation.salary,
          item.positionInformation.officialDocument,
          item.positionInformation.requirements,
          item.hasOwnMap,
          item.mapName),
        isParent: false
      });
    });
  }

  appendMapGroup(map) {
    const groupMapAndLine = this.svg.append('g');
    let groupMap = null;

    if (!map.isParent) {
      this.appendLine({
        elementToAppend: groupMapAndLine,
        startX: map.x,
        startY: map.y,
        endX: map.x + map.translateX,
        endY: map.y + map.translateY
      });

      this.appendText({
        elementToAppend: groupMapAndLine,
        text: map.lineName,
        x: (map.x + map.translateX + map.x) / 2,
        y: (map.y + map.translateY + map.y) / 2
      });

      groupMap = groupMapAndLine.append('g');
      groupMap.attr('transform', `translate(${map.translateX},${map.translateY})`);
    } else {
      groupMap = groupMapAndLine;
    }

    this.appendMap(groupMap, map);
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
      fillColor: map.fillColor,
      strokeColor: map.strokeColor,
      strokeWidth: map.strokeWidth,
      positionInformation: map.positionInformation,
    });
  }

  appendCircle(map) {
    map.elementToAppend.append('circle')
      .attr('cx', map.x)
      .attr('cy', map.y)
      .attr('r', map.radious)
      .attr('fill', map.fillColor)
      .attr('stroke', map.strokeColor)
      .attr('stroke-width', map.strokeWidth)
      .on('click', () => {
        map.positionInformation.updateUi();
      });
  }

  appendText(map) {
    map.elementToAppend.append('text')
      .text(map.text)
      .attr('x', map.x)
      .attr('y', map.y);
  }

  appendLine(map) {
    map.elementToAppend.append('line')
      .attr('stroke', 'rgba(20,20,20,0.2)')
      .attr('fill', 'none')
      .attr('stroke-width', '1')
      .attr('opacity', '1')
      .attr('x1', map.startX)
      .attr('y1', map.startY)
      .attr('x2', map.endX)
      .attr('y2', map.endY);
  }

  remove() {
    this.svg.remove();
  }
}
