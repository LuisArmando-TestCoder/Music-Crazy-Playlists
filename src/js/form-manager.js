(function () {
  const input = {
    title: document.getElementById('song-title'),
    ogg: document.getElementById('sources-ogg'),
    wav: document.getElementById('sources-wav'),
    mp3: document.getElementById('sources-mp3'),
    image: document.getElementById('song-image'),
    starred: document.getElementById('song-starred'),
    year: document.getElementById('song-year'),
    album: document.getElementById('song-album'),
    artist: document.getElementById('song-artist'),
  };
  const button = {
    reset: document.getElementById('song-reset'),
    submit: document.getElementById('song-submit'),
  };

  function submitForm(e) {
    e.preventDefault();
    let objValues = { sources: {} };
    for (let elem in input) {
      if (input[elem].getAttribute('type') !== 'checkbox') {
        if (elem === 'ogg'
        || elem === 'wav'
        || elem === 'mp3') {
          objValues.sources[elem] = input[elem].value;
        } else {
          objValues[elem] = input[elem].value;
        }
      } else {
        objValues[elem] = input[elem].checked;
      }
    }
    quicker().manage(tabBtns, tabs).tabs(0);
    singletonSongs.availableSongs.push(objValues);
    quicker().updateLiSongs(availableSongs, singletonSongs.availableSongs);
    singletonSongs.createDragDrop('class', 'songs-container__songs-wrapper');
    quicker().keepArrayToLocalStorage('songsArray', availableSongs);
  }

  function resetForm() {
    for(let elem in input) {
      input[elem].value = '';
    }
  }

  button.reset.addEventListener('click', resetForm);
  button.submit.addEventListener('click', submitForm, false);
}());
