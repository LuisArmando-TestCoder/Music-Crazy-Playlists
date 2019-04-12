(function () {
  const itemEdit = document.getElementById('item-edit');
  const modalCancel = document.getElementById('modal-cancel');
  const modalSubmit = document.getElementById('modal-submit');
  const modal = document.getElementsByClassName('modals__modal')[0];
  const songsContainer = document.querySelector('.songs-container');

  const input = {
    title: document.getElementById('modal-title'),
    ogg: document.getElementById('modal-sources-ogg'),
    wav: document.getElementById('modal-sources-wav'),
    mp3: document.getElementById('modal-sources-mp3'),
    image: document.getElementById('modal-image'),
    starred: document.getElementById('modal-starred'),
    year: document.getElementById('modal-year'),
    album: document.getElementById('modal-album'),
    artist: document.getElementById('modal-artist'),
  };

  let target;

  function hideModal() {
    modal.setAttribute('unavailable', '');
  }

  function openEditModal() {
    const parent = target.parentElement;
    const index = Array.from(parent.children).indexOf(target);

    if (parent == availableSongs) {
      editInputs(singletonSongs.availableSongs[index]);
    } else {
      editInputs(singletonSongs.playlist[index]);
    }

    if (target) modal.removeAttribute('unavailable');
  }

  function setTarget(e) {
    if (e.target.className === 'play-song') target = e.target;
  }

  function editObject(obj) {
    obj.title = input.title.value;
    obj.image = input.image.value;
    obj.starred = input.starred.checked;
    obj.year = input.year.value;
    obj.album = input.album.value;
    obj.artist = input.artist.value;
    obj.sources.ogg = input.ogg.value;
    obj.sources.wav = input.wav.value;
    obj.sources.mp3 = input.mp3.value;
  }

  function editInputs(obj) {
    input.title.value = obj.title;
    input.image.value = obj.image;
    input.starred.checked = obj.starred;
    input.year.value = obj.year;
    input.album.value = obj.album;
    input.artist.value = obj.artist;
    input.ogg.value = obj.sources.ogg;
    input.wav.value = obj.sources.wav;
    input.mp3.value = obj.sources.mp3;
  }

  function editTarget(e) {
    e.preventDefault();
    const parent = target.parentElement;
    const index = Array.from(parent.children).indexOf(target);
    if (parent == availableSongs) {
      editObject(singletonSongs.availableSongs[index]);
      quicker().updateLiSongs(availableSongs, singletonSongs.availableSongs);
      quicker().keepArrayToLocalStorage('songsArray', singletonSongs.availableSongs);
    } else {
      editObject(singletonSongs.playlist[index]);
      quicker().updateLiSongs(playlist, singletonSongs.playlist);
      quicker().keepArrayToLocalStorage('playlistArray', singletonSongs.playlist);
    }
    hideModal();
  }

  modalCancel.addEventListener('click', hideModal);

  modalSubmit.addEventListener('click', editTarget);

  songsContainer.addEventListener('click', setTarget);

  itemEdit.addEventListener('click', openEditModal);
}());
