export default class PositionInformation {
  constructor(positionName, salary, officalDocument, requements, hasOwnMap, mapName) {
    this.positionName = positionName;
    this.salary = salary;
    this.officalDocument = officalDocument;
    this.requements = requements;
    this.hasOwnMap = hasOwnMap === undefined ? false : hasOwnMap;
    this.mapName = mapName;
    console.log(mapName);
  }

  updateUi() {
    console.log(this.officalDocument);
    const positionName = document.getElementById('positionName');
    positionName.innerHTML = this.positionName;

    const salary = document.getElementById('salary');
    salary.innerHTML = this.salary;

    const officialDocument = document.getElementById('officialDocument');
    officialDocument.action = this.officalDocument;

    const newMindMap = document.getElementById('newMindMap');
    newMindMap.disabled = !this.hasOwnMap;
    newMindMap.value = this.mapName;

    const ul = document.getElementById('requements');
    ul.innerHTML = '';
    for (var requement of this.requements) {
      const li = document.createElement('li');
      li.innerText = requement;
      ul.appendChild(li);
    }
  }
}
