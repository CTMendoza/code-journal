
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
  // check if newObject is an edit or a new entry
  if (data.editing === null) {
    newObject.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(newObject);
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
    var $entryDOM = $renderEntry(newObject);
    $ul.prepend($entryDOM);
  } else if (data.editing !== null) {
    // Update the entry form's submit handler function to conditionally add a new entry object or update the existing one.
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        var editNewObject = {};
        editNewObject.title = $journalEntry.elements.title.value;
        editNewObject.photo = $journalEntry.elements.photourl.value;
        editNewObject.notes = $journalEntry.elements.notes.value;
        editNewObject.entryId = data.entries[i].entryId;
        data.entries[i] = editNewObject;
      }
    }
  }

  data.editing = null;

  // Ensure that submitting a new journal entry automatically shows the 'entries' view without reloading the page.

  $entriesView.className = '';
  $formView.className = 'hidden';

  // if data.entries is not an empty array update $divEmptyEntries.className to hidden

  if (data.entries.length > 0) {
    $divEmptyEntries.className = 'hidden';
  }

  $renderCurrentPage('entries');

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
  $list.className = 'entry';
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
  //  Update entry rendering function to include an edit icon for each rendered entry.
  // <div class="row justify-between align-center">
  //   <h3 class="title">Ada LoveLace</h3>
  //   <i class="fa-solid fa-pencil"></i>
  // </div>
  var $divTitleIcon = document.createElement('div');
  $divTitleIcon.className = 'row justify-between align-center';
  $divText.appendChild($divTitleIcon);
  var $icon = document.createElement('i');
  $icon.className = 'fas fa-solid fa-pencil';
  var $titleText = document.createElement('h3');
  $titleText.className = 'title';
  $titleText.textContent = entry.title;
  $divTitleIcon.appendChild($titleText);
  $divTitleIcon.appendChild($icon);
  // $divText.appendChild($titleText);
  var $paragraphText = document.createElement('p');
  $paragraphText.textContent = entry.notes;
  $divText.appendChild($paragraphText);
  // Ensure that each rendered entry is given a data - entry - id attribute indicating which entry it is.
  $list.setAttribute('data-entry-id', entry.entryId);
  return $list;
}

// Use a loop to create a DOM tree for each journal entry in the data model and
//  append it to the page when the 'DOMContentLoaded' event is fired.

var $ul = document.querySelector('ul');
$ul.className = 'entries-container';

function $appendEntry(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var $entryReturn = $renderEntry(data.entries[i]);
    $ul.append($entryReturn);
  }
  if (data.entries.length > 0) {
    $divEmptyEntries.className = 'hidden';
  }
  $renderCurrentPage(data.view);
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
  $renderCurrentPage('entries');
  var $h1 = document.querySelector('h1');
  $h1.textContent = 'New Entry';
}

// When clicking New nav item, user is brought the Form section of web page

var $newAnchor = document.querySelector('.a-new');

$newAnchor.addEventListener('click', switchToFormEntry);

function switchToFormEntry(event) {
  if (event.target.matches('.a-new')) {
    $entriesView.className = 'hidden';
    $formView.className = '';
  }
  $renderCurrentPage('entry-form');
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

// Ensure that refreshing the pages shows the same view as before refreshing.
// you have a function which takes a string as an argument, and shows the view with the matching data - view property
// then you make sure to call that function anytime you want to update the view.
// inside the function, you update the data.view property to match the argument passed in, so that property is always updated with the latest view value
// When the page loads, you call the function in the DOMContentLoaded function and pass it the data.view attribute so it knows which view to show on load

function $renderCurrentPage(string) {
  data.view = string;
  if (data.view === 'entry-form') {
    $formView.className = '';
    $entriesView.className = 'hidden';
  } else if (data.view === 'entries') {
    $formView.className = 'hidden';
    $entriesView.className = '';
  }
}

// Listen for clicks on the parent element of all rendered entries.
$ul.addEventListener('click', $returnToForm);
function $returnToForm(event) {
  // Show the entry form if an edit icon was clicked.
  if (event.target.matches('.fas.fa-solid.fa-pencil')) {
    $formView.className = '';
    $entriesView.className = 'hidden';
  }
  // Find the matching entry object in the data model and assign it to the data model's editing property if an edit icon was clicked.
  var $dataEntryId = event.target.closest('li');
  var $dataEntryIdAttriVal = $dataEntryId.getAttribute('data-entry-id');
  // converting $dataEntryIdAtriVal from a string value to a numerical value;
  var $dataEntryIdConvert = Number($dataEntryIdAttriVal);
  // console.log($dataEntryId);
  // console.log($dataEntryIdAttriVal);
  // console.log($dataEntryIdConvert, typeof $dataEntryIdConvert);
  // console.log('type of: ', typeof $dataEntryIdAttriVal);
  // console.log('data.entries', data.entries);
  for (var i = 0; i < data.entries.length; i++) {
    if ($dataEntryIdConvert === data.entries[i].entryId) {
      data.editing = data.entries[i];
    }
  }
  // Pre - populate the entry form with the clicked entry's values from the object found in the data model.
  $journalEntry.elements.title.value = data.editing.title;
  $journalEntry.elements.photourl.value = data.editing.photo;
  $journalEntry.elements.notes.value = data.editing.notes;

  var $imgSrc = $img.getAttribute('src');
  if ($imgSrc !== data.editing.photo) {
    $img.setAttribute('src', data.editing.photo);
  }
  // change h1 text content when edit icon is clicked
  var $h1 = document.querySelector('h1');
  $h1.textContent = 'Edit Entry';
}
