import MindMap from './mindMap';
import mindMaps from '../data/mindMaps.json';

const mindMap = new MindMap('div', 1000, 1000);
mindMap.draw(mindMaps);
