
// Listening for the $photoUrl input element in order to change the src attribute of the img element

var $photoUrl = document.querySelector('#photo-url');
var $img = document.querySelector('img');

$photoUrl.addEventListener('input', handleInput);

function handleInput(event) {
  var $targetUrl = event.target.value;
  var $imgSrc = $img.getAttribute('src');
  if ($imgSrc !== $targetUrl) {
    $img.setAttribute('src', $targetUrl);
  }
}

// Listening for 'submit' events on the #journal-entry form element

var $journalEntry = document.querySelector('#journal-entry');

function handleSubmit(event) {
  var newObject = {};
  event.preventDefault();
  var $title = $journalEntry.elements.title.value;
  var $photo = $journalEntry.elements.photourl.value;
  var $notes = $journalEntry.elements.notes.value;
  Object.assign(newObject, { title: $title, photo: $photo, notes: $notes });
  newObject.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(newObject);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $journalEntry.reset();
}

$journalEntry.addEventListener('submit', handleSubmit);
