import MindMap from './mindMap';
import implementationCoordinator from '../data/implementationCoordinator.json';
import entryLevelImplementationCoordinator from '../data/entryLevelImplementationCoordinator.json';

window.mindMap = createMap('#svg', 1000, 950, implementationCoordinator);

window.onClick = function () {
  window.mindMap.remove();
  const mapName = document.getElementById('newMindMap').value;
  if (mapName === 'entryLevelImplementationCoordinator') {
    window.mindMap = createMap('#svg', 1000, 950, implementationCoordinator);
  } else {
    window.mindMap = createMap('#svg', 1000, 950, entryLevelImplementationCoordinator);
  }
};

function createMap(element, height, width, data) {
  const mindMap = new MindMap(element, height, width);
  mindMap.draw(data);
  return mindMap;
}
