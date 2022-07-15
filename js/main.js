
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

// Define a function that takes a single journal entry object and
// returns a DOM tree that matches one of the example entries in the HTML.

/* <li>
    <div class="row li-marg-bot">
     <div class="column-half column">
      <img src="https://masterwp.com/wp-content/uploads/2022/03/ava-lovelace.png" alt="">
     </div>
     <div class="column-half">
      <h3 class="title">Ada LoveLace</h3>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id quasi corporis ipsam corrupti minima, commodi ipsa possimus aut exercitationem error quisquam perspiciatis voluptas, quia alias voluptate provident doloribus necessitatibus consequuntur?</p>
     </div>
    </div>
   </li> */

// entry parameter should reflect data.entries[i]
function $renderEntry(entry) {
  var $list = document.createElement('li');
  var $divEntry = document.createElement('div');
  $divEntry.className = 'row li-marg-bot';
  $list.appendChild($divEntry);
  var $divImg = document.createElement('div');
  $divImg.className = 'column-half column';
  $divEntry.appendChild($divImg);
  var $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.photo);
  $divImg.appendChild($entryImg);
  var $divText = document.createElement('div');
  $divText.className = 'column-half';
  $divEntry.appendChild($divText);
  var $titleText = document.createElement('h3');
  $titleText.className = 'title';
  $titleText.textContent = entry.title;
  $divText.appendChild($titleText);
  var $paragraphText = document.createElement('p');
  $paragraphText.textContent = entry.notes;
  $divText.appendChild($paragraphText);
  return $list;
}

// Use a loop to create a DOM tree for each journal entry in the data model and
//  append it to the page when the 'DOMContentLoaded' event is fired.

var $ul = document.querySelector('ul');

function $appendEntry(event) {
  for (var i = data.entries.length - 1; i >= 0; i--) {
    var $entryReturn = $renderEntry(data.entries[i]);
    $ul.prepend($entryReturn);
  }
}

window.addEventListener('DOMContentLoaded', $appendEntry);
