import MindMap from './mindMap';
import mindMaps from '../data/mindMaps.json';

const mindMap = new MindMap('#svg', 1000, 950);
mindMap.draw(mindMaps);
