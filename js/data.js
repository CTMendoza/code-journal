/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('data-local-storage');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function $stringifyData(event) {
  var $dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', $dataJSON);
}

window.addEventListener('beforeunload', $stringifyData);
