
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

var $formView = document.querySelector('div[data-view="entry-form"]');

var $entriesView = document.querySelector('div[data-view="entries"]');

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
  var $entryDOM = $renderEntry(newObject);
  $ul.prepend($entryDOM);

  // Ensure that submitting a new journal entry automatically shows the 'entries' view without reloading the page.
  $entriesView.className = '';
  $formView.className = 'hidden';
  // if data.entries is not an empty array update $divEmptyEntries.className to hidden

  if (data.entries.length > 0) {
    $divEmptyEntries.className = 'hidden';
  }

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
  for (var i = 0; i < data.entries.length; i++) {
    var $entryReturn = $renderEntry(data.entries[i]);
    $ul.append($entryReturn);
  }
  if (data.entries.length > 0) {
    $divEmptyEntries.className = 'hidden';
  }
}

window.addEventListener('DOMContentLoaded', $appendEntry);

// When clicking Entries nav item, user is brought the Entries section of web page

var $entriesAnchor = document.querySelector('.a-entries');

$entriesAnchor.addEventListener('click', switchToNewEntry);

function switchToNewEntry(event) {
  if (event.target.matches('.a-entries')) {
    $entriesView.className = '';
    $formView.className = 'hidden';
  }
}

// When clicking New nav item, user is brought the Form section of web page

var $newAnchor = document.querySelector('.a-new');

$newAnchor.addEventListener('click', switchToFormEntry);

function switchToFormEntry(event) {
  if (event.target.matches('.a-new')) {
    $entriesView.className = 'hidden';
    $formView.className = '';
  }
}

// create new elements inside div data-view ='entries'. That tell user there are no entries recorded.
/* <div data-view="entries" class="hidden">
    <div class="row3 justify-between">
     <div class="column-half">
      <h1>Entries</h1>
     </div>
     <nav class="a-new-marg">
       <a class="a-new" href="#">New</a>
     </nav>
    </div>

// view when empty
    <div class="row justify-center">
     <p>No entries have been recorded.</p>
    </div>

    <ul>
    </ul>
   </div> */

var $divEntriesView = document.querySelector('#entriesview');
var $divEmptyEntries = document.createElement('div');
$divEmptyEntries.className = 'row justify-center';
$divEntriesView.append($divEmptyEntries);
var $pMessage = document.createElement('p');
$pMessage.textContent = 'No entries have been recorded.';
$divEmptyEntries.append($pMessage);
